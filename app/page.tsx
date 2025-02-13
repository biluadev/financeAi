import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { dark } from "@clerk/themes";
import NavBar from "./_components/navbar";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div className="flex h-full items-center justify-center">
        <UserButton
          showName
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    </>
  );
};

export default Home;
