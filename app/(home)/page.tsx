import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SummaryCard from "./_components/summary-cards";
import Navbar from "../_components/navbar";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

interface HomeProps {
  searchParams: { mouth: string };
}

const Home = async ({ searchParams: { mouth } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }

  const monthIsValid = !mouth || !isMatch(mouth, "MM");
  if (monthIsValid) {
    redirect("?mouth=01");
  }
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCard mouth={mouth} />
      </div>
    </>
  );
};

export default Home;
