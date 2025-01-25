import Image from "next/image";
import { LogInIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const loginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto: flex h-full max-w-[550px] flex-col justify-center p-8">
        <div className="flex flex-row items-center">
          <Image
            src="/login.png"
            width={100}
            height={50}
            alt="login"
            className="mb-8"
          />
          <p className="ml-2 text-lg">Faça o seu login</p>
        </div>

        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão de financeira que utiliza IA
          para monitorar suas movimentações{" "}
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/* DIREITA */}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default loginPage;
