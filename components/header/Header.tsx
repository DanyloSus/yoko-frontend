// hooks needs CSR
"use client";

// external imports
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// internal imports
import NavLink from "../NavLink";
import StyledButton from "../../ui/Button";
import { Link, usePathname } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import useUserAuthed from "@/modules/auth/hooks/useUserAuthed";

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
    <header className="w-screen h-[70px] border-b-2 border-b-blue-marguerite-700 text-blue-marguerite-50 bg-blue-marguerite-500 flex px-phone sm:px-tablet md:px-pc items-center justify-between fixed z-50">
      <h3 className="text-h3">{isAdminPage ? texts.logoAdmin : texts.logo}</h3>
      <nav>
        <ul className="flex gap-[16px] items-center max-sm:hidden">
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
                        {texts.store}
                      </StyledButton>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink link="/auth/collections">
                      <StyledButton variant="contained">
                        {texts.collections}
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
                    {texts.login}
                  </StyledButton>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <StyledButton variant="contained">
                    {texts.register}
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
