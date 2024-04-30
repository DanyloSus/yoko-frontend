"use client";

import React, { useEffect, useState } from "react";
import StyledButton from "../ui/Button";
import NavLink from "./NavLink";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/auth/redux/store";

type HeaderProps = {
  state?: "signed" | "admin";
};

const Header = (props: HeaderProps) => {
  const [signed, setSigned] = useState(false);

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    if (user.token !== null) {
      setSigned(true);
      return;
    }

    async function fetchCookies() {
      const res = await axios.get("/api/cookies");

      const session = res.data.message;

      if (session !== null) setSigned(true);
    }

    fetchCookies();
  }, [user]);

  return (
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 text-blue-marguerite-50 bg-blue-marguerite-500 flex px-pc items-center justify-between fixed z-50">
      <h3 className="text-h3">Yolo</h3>
      <nav>
        <ul className="flex gap-[16px] items-center">
          {signed ? (
            <>
              <li>
                <NavLink link="/auth/store">
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
                <NavLink link="/auth/collections">
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
                <NavLink link="/auth/user">
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
          ) : (
            <>
              <li>
                <NavLink link="/login">
                  <StyledButton
                    variant="contained"
                    sx={{
                      width: "80px",
                    }}
                  >
                    Login
                  </StyledButton>
                </NavLink>
              </li>
              <li>
                <NavLink link="/register">
                  <StyledButton
                    variant="contained"
                    sx={{
                      width: "102px",
                    }}
                  >
                    Register
                  </StyledButton>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
