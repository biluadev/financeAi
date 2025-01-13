import Image from "next/image";

const loginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      {/* DIREITA */}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          width={100}
          height={100}
          alt="login"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default loginPage;
