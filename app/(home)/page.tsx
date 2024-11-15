import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import TransactionsPieChart from "./_components/transactions-pie-chart";
import ExpensesPerCategory from "./_components/expenses-per-category";
import SummaryCard from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import Navbar from "../_components/navbar";

import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";

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

  const dashboard = await getDashboard(mouth);
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCard mouth={mouth} {...dashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
