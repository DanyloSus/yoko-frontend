// hooks needs CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// internal imports
import NavLink from "../NavLink";
import StyledButton from "../../ui/Button";
import {
  Link,
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import useUserAuthed from "@/modules/auth/hooks/useUserAuthed";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "../admins/MobileMenu";
import useScrollBlock from "@/modules/hooks/useScrollBlock";
import UserMenu from "./UserMenu";

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

const Header = ({ texts, locale }: Texts & { locale: string }) => {
  // state for checking is user authed
  const [signed, setSigned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isModalOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

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
    console.log(user);

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  return (
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 dark:bg-black dark:border-b-dark-grey text-blue-marguerite-50 bg-blue-marguerite-500 flex px-phone md:px-tablet lg:px-pc items-center justify-between fixed z-50">
      <h3 className="text-h3 whitespace-nowrap">
        {isAdminPage ? texts.logoAdmin : texts.logo}
      </h3>
      <nav className="relative">
        <AnimatePresence>
          {isModalOpen ? (
            <MobileMenu
              locale={locale}
              handleClose={() => setIsModalOpen(false)}
            />
          ) : null}
        </AnimatePresence>
        {signed ? (
          isAdminPage ? (
            <>
              <div className="md:hidden cursor-pointer  bg-blue-marguerite-500 dark:bg-black absolute top-0 -translate-y-1/2 right-0">
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
              <div className="max-md:hidden">
                <StyledButton
                  sx={{
                    width: "48px",
                    height: "48px",
                  }}
                  className="p-0 max-sm:hidden"
                  onClick={handleClick}
                >
                  <AccountCircleOutlinedIcon
                    sx={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </StyledButton>
                <UserMenu
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  open={open}
                />
              </div>
            </>
          ) : (
            <>
              <div className="sm:hidden cursor-pointer  bg-blue-marguerite-500 dark:bg-black absolute top-0 -translate-y-1/2 right-0">
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
              <ul className="flex gap-4 items-center max-sm:hidden">
                <li>
                  <NavLink link="/authed/dialog">
                    <StyledButton>AI Talk</StyledButton>
                  </NavLink>
                </li>
                <li>
                  <NavLink link="/authed/store">
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
                  <NavLink link="/authed/collections">
                    <StyledButton>{texts.collections}</StyledButton>
                  </NavLink>
                </li>
                <li>
                  <StyledButton
                    sx={{
                      width: "48px",
                      height: "48px",
                    }}
                    className="p-0 max-sm:hidden"
                    onClick={handleClick}
                  >
                    <AccountCircleOutlinedIcon
                      sx={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  </StyledButton>
                  <UserMenu
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    open={open}
                  />
                </li>
              </ul>
            </>
          )
        ) : (
          <ul className="flex gap-4 items-center max-sm:hidden">
            <li>
              <Link href="/authentification/login">
                <StyledButton>{texts.login}</StyledButton>
              </Link>
            </li>
            <li>
              <Link href="/authentification/register">
                <StyledButton>{texts.register}</StyledButton>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
