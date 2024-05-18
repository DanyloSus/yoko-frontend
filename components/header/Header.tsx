// hooks needs CSR
"use client";

// external imports
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// internal imports
import useAuthedReplace from "@/modules/auth/hooks/useAuthedReplace";
import useUserAuthed from "@/modules/auth/hooks/useUserAuthed";
import useScrollBlock from "@/modules/hooks/useScrollBlock";
import { Link, usePathname } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import { MobileMenuTexts, UserMenuTexts } from "@/modules/types/texts";
import { AnimatePresence } from "framer-motion";
import NavLink from "../../ui/NavLink";
import StyledButton from "../../ui/mui/Button";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

// header texts
type Texts = {
  logo: string;
  logoAdmin: string;
  store: string;
  collections: string;
  login: string;
  register: string;
  ai: string;
};

type HeaderProps = {
  locale: string;
  texts: Texts & MobileMenuTexts & UserMenuTexts;
};

const Header = ({ texts, ...props }: HeaderProps) => {
  // state for checking is user authed
  const [signed, setSigned] = useState(false);
  // state for checking is modal open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // get function for blocking scroll
  const [blockScroll, allowScroll] = useScrollBlock();

  // use effect which check if modal open then block scroll
  // else allow
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

  // get pathname
  const pathname = usePathname();

  // get function to check is user authed
  const { checkUser: checkAuth } = useAuthedReplace({
    page: user.isAdmin
      ? "/admin/collections"
      : user.token
      ? "/authed/collections"
      : "/authentification/login",
    setIsLoading: (val: boolean) => {},
    user: user,
    replacePageIfUserAuthed: false,
    replacePageIfUserIsNotAdmin: true,
  });

  // call check function on start and when user is updating
  useEffect(() => {
    // console.log(user);

    checkUser();
    // if page isn't landing then check is user authed
    if (pathname !== "/") {
      checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  // state for element which will be anchor
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // value for checking is element exists
  const open = Boolean(anchorEl);

  return (
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 dark:bg-black dark:border-b-dark-grey text-blue-marguerite-50 bg-blue-marguerite-500 flex px-phone md:px-tablet lg:px-pc items-center justify-between fixed z-50">
      <h3 className="text-h3 whitespace-nowrap">
        {isAdminPage ? texts.logoAdmin : texts.logo}
      </h3>
      <nav className="relative flex items-center gap-4">
        <AnimatePresence>
          {isModalOpen ? (
            <MobileMenu
              locale={props.locale}
              handleClose={() => setIsModalOpen(false)}
              texts={{
                mmAdmCollections: texts.mmAdmCollections,
                mmAdmRequests: texts.mmAdmRequests,
                mmAdmUsers: texts.mmAdmUsers,
                mmAdmWords: texts.mmAdmWords,
                mmExit: texts.mmExit,
                mmUserCollections: texts.mmUserCollections,
                mmUserLang: texts.mmUserLang,
                mmUserLangEn: texts.mmUserLangEn,
                mmUserLangUk: texts.mmUserLangUk,
                mmUserStore: texts.mmUserStore,
                mmUserTheme: texts.mmUserTheme,
                mmUserThemeDark: texts.mmUserThemeDark,
                mmUserThemeLight: texts.mmUserThemeLight,
              }}
            />
          ) : null}
        </AnimatePresence>
        {signed ? (
          // if user signed
          <>
            {/* button for mobile menu */}
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
            {isAdminPage ? null : (
              // if page isn't admins'
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
                      <StyledButton>{texts.ai}</StyledButton>
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
                  <li></li>
                </ul>
              </>
            )}
            {/* show user's icon and user's menu */}
            <div className={isAdminPage ? "max-md:hidden" : "max-sm:hidden"}>
              <StyledButton
                sx={{
                  width: "48px",
                  height: "48px",
                }}
                className="p-0 max-sm:hidden"
                onClick={(e) => setAnchorEl(e.currentTarget)}
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
                handleClose={() => setAnchorEl(null)}
                open={open}
                texts={{
                  umAdmin: texts.umAdmin,
                  umLang: texts.umLang,
                  umLangUk: texts.umLangUk,
                  umLangEn: texts.umLangEn,
                  umLogout: texts.umLogout,
                  umSettings: texts.umSettings,
                  umTheme: texts.umTheme,
                  umThemeDark: texts.umThemeDark,
                  umThemeLight: texts.umThemeLight,
                  umThemeSystem: texts.umThemeSystem,
                }}
              />
            </div>
          </>
        ) : (
          // if user isn't signed
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
