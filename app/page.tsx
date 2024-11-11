import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Navbar from "./_components/navbar";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-red h-3 w-4 bg-red-500 px-5 py-5">Hello world!</h1>

        <div className="flex w-full items-center">
          <UserButton showName />
        </div>
      </div>
    </>
  );
};

export default Home;
