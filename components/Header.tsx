"use client";

import React from "react";
import StyledButton from "../ui/Button";
import { useRouter } from "next/navigation";
import NavLink from "./NavLink";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

type HeaderProps = {
  state?: "signed" | "admin";
};

const Header = (props: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 text-blue-marguerite-50 bg-blue-marguerite-500 flex px-pc items-center justify-between fixed">
      <h3 className="text-h3">Yolo</h3>
      <nav>
        <ul className="flex gap-[16px] items-center">
          {props.state === null ? (
            <>
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
            </>
          ) : (
            props.state === "signed" && (
              <>
                <li>
                  <NavLink link="store">
                    <StyledButton
                      variant="contained"
                      sx={{
                        width: "80px",
                      }}
                    >
                      Store
                    </StyledButton>
                  </NavLink>
                </li>
                <li>
                  <NavLink link="collections">
                    <StyledButton
                      variant="contained"
                      sx={{
                        width: "102px",
                      }}
                    >
                      Collections
                    </StyledButton>
                  </NavLink>
                </li>
                <li>
                  <NavLink link="user">
                    <StyledButton
                      variant="contained"
                      sx={{ width: "48px", height: "48px" }}
                    >
                      <AccountCircleOutlinedIcon
                        sx={{
                          width: "40px",
                          height: "40px",
                        }}
                      />
                    </StyledButton>
                  </NavLink>
                </li>
              </>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
