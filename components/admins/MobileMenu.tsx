"use client";

import React from "react";
import Portal from "../wrappers/Portal";
import { motion } from "framer-motion";
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import MenuTitle from "./MenuTitle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/modules/redux/user/userSlice";
import UserElement from "../users/UserElement";
import { Store } from "@/modules/redux/store";
import { Divider } from "@mui/material";
import { changeTheme } from "@/modules/redux/darkTheme/darkThemeSlice";
import axios from "axios";

const MobileMenu = ({
  locale,
  ...props
}: {
  locale: string;
  handleClose: () => void;
}) => {
  const pathname = usePathname();

  const dispatch = useDispatch();

  const router = useRouter();

  const user = useSelector((state: Store) => state.user);
  const theme = useSelector((state: Store) => state.theme);

  return (
    <Portal>
      {user.name || user.isAdmin ? (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ ease: "easeInOut" }}
          key={"Modal"}
          className={
            "fixed top-0 left-0 w-screen h-screen bg-blue-marguerite-500 dark:bg-black z-30 text-white flex flex-col items-stretch pt-[70px] text-center " +
            (pathname.includes("admin") ? "md:hidden" : "sm:hidden")
          }
        >
          {pathname.includes("admin") ? (
            <>
              <MenuTitle
                link="/admin/users"
                text="Users"
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/admin/collections"
                text="Collections"
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/admin/words"
                text="Words"
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/admin/requests"
                text="Requests"
                handleClose={props.handleClose}
              />
            </>
          ) : (
            <>
              <UserElement user={user} />
              <Divider />
              <MenuTitle
                link="/authed/store"
                text="Store"
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/authed/collections"
                text="Collections"
                handleClose={props.handleClose}
              />
              <MenuTitle
                onClick={() =>
                  theme === "dark"
                    ? dispatch(changeTheme("light"))
                    : dispatch(changeTheme("dark"))
                }
                text={`Theme: ${theme}`}
              />
              <MenuTitle
                onClick={() =>
                  locale === "en"
                    ? router.replace(pathname, { locale: "uk" })
                    : router.replace(pathname, { locale: "en" })
                }
                text={`Language: ${locale}`}
              />
            </>
          )}
          <MenuTitle
            onClick={async () => {
              await axios.post("/api/logout", {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
              dispatch(logout());
              props.handleClose();
              if (pathname === "/") {
                router.refresh();
              } else {
                router.push("/");
              }
            }}
            text="Exit"
          />
        </motion.div>
      ) : null}
    </Portal>
  );
};

export default MobileMenu;
