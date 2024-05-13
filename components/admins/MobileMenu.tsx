"use client";

import React from "react";
import Portal from "../wrappers/Portal";
import { motion, startOptimizedAppearAnimation } from "framer-motion";
import {
  Link,
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

const MobileMenu = () => {
  const pathname = usePathname();

  const dispatch = useDispatch();

  const router = useRouter();

  const user = useSelector((state: Store) => state.user);
  const theme = useSelector((state: Store) => state.theme);

  return (
    <Portal>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut" }}
        key={"Modal"}
        className="fixed w-screen h-screen bg-blue-marguerite-500 dark:bg-black z-20 text-white flex flex-col items-stretch pt-[70px] text-center max-vsm:hidden sm:hidden"
      >
        {pathname.includes("admin") ? (
          <>
            <MenuTitle link="/admin/users" text="Users" />
            <MenuTitle link="/admin/collections" text="Collections" />
            <MenuTitle link="/admin/words" text="Words" />
            <MenuTitle link="/admin/requests" text="Requests" />
          </>
        ) : (
          <>
            <UserElement user={user} />
            <Divider />
            <MenuTitle link="/authed/store" text="Store" />
            <MenuTitle link="/authed/collections" text="Collections" />
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
                theme === "dark"
                  ? router.replace(pathname, { locale: "uk" })
                  : router.replace(pathname, { locale: "en" })
              }
              text={`Language: ${theme}`}
            />
          </>
        )}
        <MenuTitle
          onClick={() => {
            dispatch(logout());
            router.push("/");
          }}
          text="Exit"
        />
      </motion.div>
    </Portal>
  );
};

export default MobileMenu;
