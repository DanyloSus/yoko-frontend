"use client";

import React, { useEffect, useState } from "react";
import StyledButton from "../ui/Button";
import NavLink from "./NavLink";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import { login, userLoad } from "@/modules/redux/user/userSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [signed, setSigned] = useState(false);

  const isAdminPage = usePathname().split("/")[1] === "admin";

  const dispatch = useDispatch();
  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    console.log("Signed state:", signed);
  }, [signed]);

  useEffect(() => {
    if (user.token !== null) {
      console.log("I'm gay 1");
      setSigned(true);
      return;
    }

    if (localStorage.getItem("user")) {
      dispatch(userLoad());
      setSigned(true);
      return;
    }

    async function fetchCookies() {
      try {
        const res = await axios.get("/api/cookies");

        let token;

        if (res.data.message.token !== null) {
          token = res.data.message.token;
        } else {
          token = null;
        }

        if (token !== null) {
          const { data } = await axios.get("http://localhost:8876/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          dispatch(
            login({
              id: data.id,
              email: data.email,
              name: data.name,
              surname: data.surname,
              token,
              isAdmin: false,
            })
          );

          console.log("I'm gay 2");
          setSigned(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  return (
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 text-blue-marguerite-50 bg-blue-marguerite-500 flex px-phone md:px-pc items-center justify-between fixed z-50">
      <h3 className="text-h3">{isAdminPage ? "Yolo admin" : "Yolo"}</h3>
      <nav>
        <ul className="flex gap-[16px] items-center max-md:hidden">
          {signed ? (
            <>
              {isAdminPage ? null : (
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
                </>
              )}

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
                <Link href="/login">
                  <StyledButton
                    variant="contained"
                    sx={{
                      width: "80px",
                    }}
                  >
                    Login
                  </StyledButton>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <StyledButton
                    variant="contained"
                    sx={{
                      width: "102px",
                    }}
                  >
                    Register
                  </StyledButton>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
