"use client";

import React, { useEffect, useState } from "react";
import StyledButton from "@/ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Store } from "@/modules/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/modules/redux/user/userSlice";
import { CircularProgress } from "@mui/material";

import dynamic from "next/dynamic";

const UserElement = dynamic(() => import("@/app/auth/user/UserElement"), {
  ssr: false,
});

const User = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state: Store) => state.user);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[360px] w-full flex flex-col items-stretch  gap-[16px]"
      suppressHydrationWarning={true}
    >
      {user.isAdmin ? null : <UserElement user={user} />}
      <StyledButton variant="outlined">Your Collections</StyledButton>
      <Link href="/auth/user/settings" className="w-full">
        <StyledButton variant="outlined" className="w-full">
          Settings
        </StyledButton>
      </Link>
      {user.isAdmin ? (
        <Link href="/admin/users" className="w-full">
          <StyledButton variant="outlined" className="w-full">
            Etc.
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
        Exit
      </StyledButton>
    </div>
  );
};

export default User;
