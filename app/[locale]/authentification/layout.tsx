import React, { ReactNode } from "react";

const AuthentificationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-blue-marguerite-500 dark:bg-black px-phone md:px-tablet lg:px-pc">
      {children}
    </main>
  );
};

export default AuthentificationLayout;
