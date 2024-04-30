import { UserInfo } from "@/modules/redux/user/userSlice";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CircularProgress } from "@mui/material";
import React from "react";

const UserElement = ({ user }: { user: UserInfo }) => {
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
          color="primary"
          suppressHydrationWarning={true}
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
