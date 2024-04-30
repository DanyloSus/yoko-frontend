"use client";

import React, { useEffect, useState } from "react";
import StyledButton from "@/ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Store } from "@/modules/auth/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/modules/auth/redux/user/userSlice";
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
      <UserElement user={user} />
      <StyledButton variant="outlined">Your Collections</StyledButton>
      <Link href="/auth/user/settings" className="w-full">
        <StyledButton variant="outlined" className="w-full">
          Settings
        </StyledButton>
      </Link>
      <StyledButton variant="outlined">Etc.</StyledButton>
      <StyledButton
        variant="outlined"
        onClick={async () => {
          await axios.post("/api/logout", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          dispatch(logout());
          router.push("/login");
        }}
      >
        Exit
      </StyledButton>
    </div>
  );
};

export default User;
