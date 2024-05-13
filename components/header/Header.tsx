// hooks needs CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Divider from "@mui/material/Divider";
import { IconMenuItem, NestedMenuItem } from "mui-nested-menu";

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
import { ListItemIcon, Menu, MenuItem, Switch } from "@mui/material";
import { changeTheme } from "@/modules/redux/darkTheme/darkThemeSlice";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { logout } from "@/modules/redux/user/userSlice";

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

const Header = ({ texts }: Texts) => {
  // state for checking is user authed
  const [signed, setSigned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const for checking is it an admin page
  const isAdminPage = usePathname().split("/")[1] === "admin";

  // get current user's values
  const user = useSelector((state: Store) => state.user);

  const dispatch = useDispatch();

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
  const pathname = usePathname();

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
            <StyledButton onClick={() => dispatch(changeTheme("system"))}>
              System
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={() => dispatch(changeTheme("light"))}>
              Light
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={() => dispatch(changeTheme("dark"))}>
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
                </>
              )}

              <li>
                <StyledButton
                  sx={{
                    width: "48px",
                    height: "48px",
                  }}
                  className="p-0"
                  onClick={handleClick}
                >
                  <AccountCircleOutlinedIcon
                    sx={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </StyledButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/authed/user">
                      <ListItemIcon>
                        <AccountCircleOutlinedIcon />
                      </ListItemIcon>
                      {user.name}
                    </Link>
                  </MenuItem>
                  <Divider />
                  <NestedMenuItem
                    leftIcon={<AccountCircleOutlinedIcon />}
                    label="Theme"
                    parentMenuOpen={open}
                    rightIcon={<></>}
                  >
                    <IconMenuItem
                      leftIcon={<AccountCircleOutlinedIcon />}
                      onClick={() => dispatch(changeTheme("dark"))}
                      label="Dark"
                    />
                    <IconMenuItem
                      leftIcon={<AccountCircleOutlinedIcon />}
                      onClick={() => dispatch(changeTheme("light"))}
                      label="Light"
                    />
                    <IconMenuItem
                      leftIcon={<AccountCircleOutlinedIcon />}
                      onClick={() => dispatch(changeTheme("system"))}
                      label="System"
                    />
                  </NestedMenuItem>
                  <NestedMenuItem
                    leftIcon={<AccountCircleOutlinedIcon />}
                    label="Language"
                    parentMenuOpen={open}
                    rightIcon={<></>}
                  >
                    <IconMenuItem
                      leftIcon={<AccountCircleOutlinedIcon />}
                      onClick={() => router.replace(pathname, { locale: "uk" })}
                      label="Ukrainian"
                    />
                    <IconMenuItem
                      leftIcon={<AccountCircleOutlinedIcon />}
                      onClick={() => router.replace(pathname, { locale: "en" })}
                      label="English"
                    />
                  </NestedMenuItem>
                  <Divider />
                  <MenuItem>
                    <Link href="/authed/user/settings">
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={async () => {
                      await axios.post("/api/logout", {
                        headers: {
                          Authorization: `Bearer ${user.token}`,
                        },
                      });
                      dispatch(logout());
                      router.replace("/");
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/authentification/login">
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
                <Link href="/authentification/register">
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
