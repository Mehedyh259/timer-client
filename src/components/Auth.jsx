"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Auth = () => {
  const session = useSession();
  console.log("session", session);
//   const API_BASE_URL =  process.env.API_BASE_URL;
  const API_BASE_URL =  "https://devtask-indol.vercel.app";
console.log(API_BASE_URL);
  useEffect(() => {
    if (session?.data?.user?.email) {
      const data = {
        email: session?.data?.user?.email,
        name: session?.data?.user?.name,
      };
      axios.post(API_BASE_URL + "/user", data).then((res) => {
        const token = res.data?.token;
        localStorage.setItem("token", token);
      });
    }
  }, [session?.data?.user?.email]);

  return <div></div>;
};

export default Auth;
