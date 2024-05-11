// hooks needs CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// internal imports
import NavLink from "../NavLink";
import StyledButton from "../../ui/Button";
import { Link, usePathname } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import useUserAuthed from "@/modules/auth/hooks/useUserAuthed";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "../admins/MobileMenu";
import { Switch } from "@mui/material";

type Texts = {
  texts: {
    logo: string;
    logoAdmin: string;
    store: string;
    collections: string;
    login: string;
    register: string;
  };
};

function changeTheme(themeName?: string) {
  if (themeName === "dark") {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else if (themeName === "light") {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    localStorage.removeItem("theme");
    // if alreay set the value will remove it
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
}

const Header = ({ texts }: Texts) => {
  // state for checking is user authed
  const [signed, setSigned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const for checking is it an admin page
  const isAdminPage = usePathname().split("/")[1] === "admin";

  // get current user's values
  const user = useSelector((state: Store) => state.user);

  // for debugging changes of signed state
  // useEffect(() => {
  //   console.log("Signed state:", signed);
  // }, [signed]);

  // getting function to check is user authed
  const { checkUser } = useUserAuthed({
    setSigned: (val: boolean) => setSigned(val),
    user: user,
  });

  // call check function on start and when user is updating
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  // code for changing language
  // const pathname = usePathname();
  // const router = useRouter();
  // router.replace(pathname, {locale: 'de'});

  return (
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 dark:bg-black dark:border-b-dark-grey text-blue-marguerite-50 bg-blue-marguerite-500 flex px-phone md:px-tablet lg:px-pc items-center justify-between fixed z-50">
      <h3 className="text-h3 whitespace-nowrap">
        {isAdminPage ? texts.logoAdmin : texts.logo}
      </h3>
      <nav>
        {isAdminPage ? (
          <div className="max-vsm:hidden sm:hidden">
            <AnimatePresence>
              {isModalOpen ? <MobileMenu /> : null}
            </AnimatePresence>
            <div className="md:hidden cursor-pointer">
              {isModalOpen ? (
                <CloseOutlinedIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => setIsModalOpen(false)}
                />
              ) : (
                <MenuOutlinedIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          </div>
        ) : null}
        <ul className="flex gap-[16px] items-center max-sm:hidden">
          <li>
            <StyledButton onClick={() => changeTheme("system")}>
              System
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={() => changeTheme("light")}>
              Light
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={() => changeTheme("dark")}>
              Dark
            </StyledButton>
          </li>
          {signed ? (
            <>
              {isAdminPage ? (
                <li className="md:hidden">
                  {isModalOpen ? (
                    <>
                      <CloseOutlinedIcon
                        sx={{
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => setIsModalOpen(false)}
                      />
                    </>
                  ) : (
                    <>
                      <MenuOutlinedIcon
                        sx={{
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={() => setIsModalOpen(true)}
                      />
                    </>
                  )}
                </li>
              ) : (
                <>
                  <li>
                    <NavLink link="/auth/store">
                      <StyledButton
                        sx={{
                          width: "80px",
                        }}
                      >
                        {texts.store}
                      </StyledButton>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink link="/auth/collections">
                      <StyledButton>{texts.collections}</StyledButton>
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink link="/auth/user">
                  <StyledButton sx={{ width: "48px", height: "48px" }}>
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
                    sx={{
                      width: "80px",
                    }}
                  >
                    {texts.login}
                  </StyledButton>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <StyledButton>{texts.register}</StyledButton>
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
