"use client";

import React from "react";
import StyledButton from "@/ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Store } from "@/modules/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/modules/redux/user/userSlice";

import dynamic from "next/dynamic";

type UserTexts = {
  texts: {
    collections: string;
    settings: string;
    admin: string;
    exit: string;
  };
};

const UserElement = dynamic(() => import("@/components/users/UserElement"), {
  ssr: false,
});

const UserContent = ({ texts }: UserTexts) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state: Store) => state.user);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[360px] w-full flex flex-col items-stretch  gap-[16px]"
      suppressHydrationWarning={true}
    >
      {user.isAdmin ? null : <UserElement user={user} />}
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
