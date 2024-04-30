"use client";

import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StyledButton from "@/ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const User = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const res = await axios.get("/api/cookies");

      const token = res.data.message.token;

      setToken(token);

      const { data } = await axios.get("http://localhost:8876/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsername(`${data.name} ${data.surname}`);
    }

    getUser();
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[360px] w-full flex flex-col items-stretch  gap-[16px]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[128px] h-[128px] flex items-center justify-center">
          <AccountCircleOutlinedIcon
            sx={{
              width: "106.67px",
              height: "106.67px",
            }}
            color="primary"
          />
        </div>
        <h3 className="text-h3 text-center">{username}</h3>
      </div>
      <StyledButton variant="outlined">Your Collections</StyledButton>
      <StyledButton variant="outlined">Settings</StyledButton>
      <StyledButton variant="outlined">Etc.</StyledButton>
      <StyledButton
        variant="outlined"
        onClick={async () => {
          await axios.post("/api/logout", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          router.push("/");
        }}
      >
        Exit
      </StyledButton>
    </div>
  );
};

export default User;
