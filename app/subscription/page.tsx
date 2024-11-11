import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";

const Subscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return (
    <>
      <Navbar />
      <div>
        <h1>Subscription</h1>
      </div>
    </>
  );
};

export default Subscription;
