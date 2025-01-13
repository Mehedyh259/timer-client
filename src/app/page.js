
import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import Timer from "@/components/Timer";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth();
  
    if (!session?.user) redirect("/login");
  return (
    <div className="flex flex-col justify-center items-center ">

      <Timer />
    </div>
  );
}
