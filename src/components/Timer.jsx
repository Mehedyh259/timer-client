"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
 
import { useState, useEffect } from "react";

export default function Timer() {
  const [focusTimeLeft, setFocusTimeLeft] = useState(20 * 60);
  const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalFocus, setTotalFocus] = useState(0);
  const [totalBreak, setTotalBreak] = useState(0);
  const [lastStartTime, setLastStartTime] = useState(null);
const session = useSession();

 

  const handleComplete = async () => {
        const data = {
            duration: 1200- focusTimeLeft
        }
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }

          };

        const res = await axios.post("https://devtask-indol.vercel.app/focus-session",data,config);
        const res2 = await axios.get("https://devtask-indol.vercel.app/focus-metrics",config);
        console.log(res)
        console.log(res2)
        resetTimer()
  }

  const toggleTimer = () => {
    if (isRunning) {
      const elapsedSeconds = lastStartTime
        ? Math.floor((Date.now() - lastStartTime) / 1000)
        : 0;
      if (isBreak) {
        setTotalBreak((prev) => prev + elapsedSeconds);
      } else {
        setTotalFocus((prev) => prev + elapsedSeconds);
      }
    } else {
      setLastStartTime(Date.now());
    }

    setIsRunning((prev) => !prev);
  };

  const switchMode = (mode) => {
    if (isRunning) toggleTimer();

    setIsBreak(mode === "break");
    setIsRunning(false);
    setLastStartTime(null);
  };

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = window.setInterval(() => {
        if (isBreak) {
          setBreakTimeLeft((prev) => Math.max(prev - 1, 0));
        } else {
          setFocusTimeLeft((prev) => Math.max(prev - 1, 0));
        }
      }, 1000);
    }

    return () => {
      if (timer !== null) clearInterval(timer);
    };
  }, [isRunning, isBreak]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setBreakTimeLeft(5 * 60);
    setFocusTimeLeft(20 * 60);
    isRunning(false);
    isBreak(false);
  };

  return (
    <div className="min-h-[calc(100vh-75px)] w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-5">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          Productive Timers
        </h1>

        {/* Mode Selection */}
        <div className="flex gap-4">
          <button
            onClick={() => switchMode("focus")}
            className={`px-4 py-2 rounded-lg font-semibold text-white shadow ${
              !isBreak
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => switchMode("break")}
            className={`px-4 py-2 rounded-lg font-semibold text-white shadow ${
              isBreak
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-5xl font-bold text-gray-800">
          {isBreak ? formatTime(breakTimeLeft) : formatTime(focusTimeLeft)}
        </div>

        {/* Start/Pause Button */}
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-lg font-semibold w-full text-white transition-transform ${
            isRunning
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className={`px-6 py-3 rounded-lg font-semibold w-full text-white transition-transform  bg-red-600 hover:bg-red-700`}
        >
          Reset
        </button>
        <button
          onClick={handleComplete}
          className={`px-6 py-3 rounded-lg font-semibold w-full text-white transition-transform  bg-blue-600 hover:bg-blue-700`}
        >
          Complete
        </button>

        {/* Time Summary */}
        <div className="w-full bg-gray-100 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Time Summary</h2>
          <ul className="text-gray-700 mt-2 text-sm space-y-1">
            <li>
              <strong>Total Focus Time:</strong> {formatTime(totalFocus)}
            </li>
            <li>
              <strong>Total Break Time:</strong> {formatTime(totalBreak)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
