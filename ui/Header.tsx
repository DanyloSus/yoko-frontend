"use client";

import React from "react";
import StyledButton from "./Button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 text-blue-marguerite-50 bg-blue-marguerite-500 flex px-pc items-center justify-between fixed">
      <h3 className="text-h3">Yolo</h3>
      <nav>
        <ul className="flex gap-4">
          <li>
            <StyledButton
              variant="contained"
              sx={{
                width: "80px",
              }}
              onClick={() => router.push("login")}
            >
              Login
            </StyledButton>
          </li>
          <li>
            <StyledButton
              variant="contained"
              sx={{
                width: "102px",
              }}
              onClick={() => router.push("register")}
            >
              Register
            </StyledButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
