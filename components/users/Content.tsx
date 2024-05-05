// hooks need CSR
"use client";

// external imports
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

// internal imports
import { logout } from "@/modules/redux/user/userSlice";
import { Store } from "@/modules/redux/store";
import StyledButton from "@/ui/Button";
import { Link, useRouter } from "@/modules/internationalization/navigation";

type Texts = {
  texts: {
    collections: string;
    settings: string;
    admin: string;
    exit: string;
  };
};

// to avoid Hydration error
const UserElement = dynamic(() => import("@/components/users/UserElement"), {
  ssr: false,
});

const UserContent = ({ texts }: Texts) => {
  // router for changing page by code
  const router = useRouter();

  // dispatch for slices' actions
  const dispatch = useDispatch();
  // get current user's values
  const user = useSelector((state: Store) => state.user);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[360px] w-full flex flex-col items-stretch  gap-[16px]"
      suppressHydrationWarning={true}
    >
      {
        // if user is admin then he doesn't have name and we shouldn't show it him
        user.isAdmin ? null : <UserElement user={user} />
      }
      <StyledButton variant="outlined">{texts.collections}</StyledButton>
      <Link href="/auth/user/settings" className="w-full">
        <StyledButton variant="outlined" className="w-full">
          {texts.settings}
        </StyledButton>
      </Link>
      {user.isAdmin ? (
        <Link href="/admin/users" className="w-full">
          <StyledButton variant="outlined" className="w-full">
            {texts.admin}
          </StyledButton>
        </Link>
      ) : null}
      <StyledButton
        variant="outlined"
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
        {texts.exit}
      </StyledButton>
    </div>
  );
};

export default UserContent;
