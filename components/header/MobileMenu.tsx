// hooks need CSR
"use client";

// external imports
import { Divider } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

// internal imports
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { changeTheme } from "@/modules/redux/darkTheme/darkThemeSlice";
import { Store } from "@/modules/redux/store";
import { logout } from "@/modules/redux/user/userSlice";
import { MobileMenuTexts } from "@/modules/types/texts";
import MenuTitle from "../../ui/MenuTitle";
import UserElement from "../users/UserElement";
import Portal from "../wrappers/Portal";

type MobileMenuProps = {
  locale: string;
  handleClose: () => void;
  texts: MobileMenuTexts;
};

const MobileMenu = ({ texts, ...props }: MobileMenuProps) => {
  // get pathname
  const pathname = usePathname();
  // router for changing page by code
  const router = useRouter();

  // dispatch for using redux actions
  const dispatch = useDispatch();
  // get user's info
  const user = useSelector((state: Store) => state.user);
  // get user's theme
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
                text={texts.mmAdmUsers}
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/admin/collections"
                text={texts.mmAdmCollections}
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/admin/words"
                text={texts.mmAdmWords}
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/admin/requests"
                text={texts.mmAdmRequests}
                handleClose={props.handleClose}
              />
            </>
          ) : (
            <>
              <UserElement user={user} />
              <Divider />
              <MenuTitle
                link="/authed/store"
                text={texts.mmUserStore}
                handleClose={props.handleClose}
              />
              <MenuTitle
                link="/authed/collections"
                text={texts.mmUserCollections}
                handleClose={props.handleClose}
              />
              <MenuTitle
                onClick={() =>
                  theme === "dark"
                    ? dispatch(changeTheme("light"))
                    : dispatch(changeTheme("dark"))
                }
                text={`${texts.mmUserTheme} ${
                  theme === "dark"
                    ? texts.mmUserThemeDark
                    : texts.mmUserThemeLight
                }`}
              />
              <MenuTitle
                onClick={() =>
                  props.locale === "en"
                    ? router.replace(pathname, { locale: "uk" })
                    : router.replace(pathname, { locale: "en" })
                }
                text={`${texts.mmUserLang} ${
                  props.locale === "en"
                    ? texts.mmUserLangEn
                    : texts.mmUserLangUk
                }`}
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
            text={texts.mmExit}
          />
        </motion.div>
      ) : null}
    </Portal>
  );
};

export default MobileMenu;
