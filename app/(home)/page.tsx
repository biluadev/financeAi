import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { dark } from "@clerk/themes";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <SummaryCards />
    </>
  );
};

export default Home;
