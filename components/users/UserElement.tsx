// external imports
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CircularProgress } from "@mui/material";

// internal imports
import { UserInfo } from "@/modules/redux/user/userSlice";

const UserElement = ({ user }: { user: UserInfo }) => {
  // if user fetched then we show his name
  // else we show loading circle
  return user.name ? (
    <div
      className="flex flex-col items-center justify-center"
      suppressHydrationWarning={true}
    >
      <div
        className="w-[128px] h-[128px] flex items-center justify-center"
        suppressHydrationWarning={true}
      >
        <AccountCircleOutlinedIcon
          sx={{
            width: "106.67px",
            height: "106.67px",
          }}
          suppressHydrationWarning={true}
          className="dark:text-blue-marguerite-500 text-black"
        />
      </div>
      <h3 className="text-h3 text-center" suppressHydrationWarning={true}>
        {user.name ?? ""} {user.surname ?? ""}
      </h3>
    </div>
  ) : (
    <div className="mx-auto my-[24px]" suppressHydrationWarning={true}>
      <CircularProgress />
    </div>
  );
};

export default UserElement;
