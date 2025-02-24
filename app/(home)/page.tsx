import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransaction from "./_components/last-transactions";
import { ScrollArea } from "../_components/ui/scroll-area";

interface HomeProps {
  searchParams?: { month?: string };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const month = searchParams?.month || String(new Date().getMonth() + 1);

  const dashboard = await getDashboard(month);

  return (
    <>
      <NavBar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboard} />

            <ScrollArea>
              <div className="grid grid-cols-3 grid-rows-1 gap-6">
                <TransactionPieChart {...dashboard} />
                <ExpensesPerCategory
                  expensesPerCategory={dashboard.TotalExpensePerCategory}
                />
              </div>
            </ScrollArea>
          </div>

          <LastTransaction lastTransactions={dashboard.lastTransaction} />
        </div>
      </div>
    </>
  );
};

export default Home;
