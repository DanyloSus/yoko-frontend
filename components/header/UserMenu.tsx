import { Divider, Menu } from "@mui/material";
import { IconMenuItem, NestedMenuItem } from "mui-nested-menu";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import { changeTheme } from "@/modules/redux/darkTheme/darkThemeSlice";
import { logout } from "@/modules/redux/user/userSlice";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import Flag from "react-world-flags";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";

type MenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  open: boolean;
  texts: UserMenuTexts;
};

export type UserMenuTexts = {
  umAdmin: string;
  umTheme: string;
  umThemeDark: string;
  umThemeLight: string;
  umThemeSystem: string;
  umLang: string;
  umLangUk: string;
  umLangEn: string;
  umSettings: string;
  umLogout: string;
};

const UserMenu = ({ texts, ...props }: MenuProps) => {
  console.log(texts);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: Store) => state.user);

  return (
    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      className="max-sm:hidden"
    >
      <IconMenuItem
        leftIcon={<AccountCircleOutlinedIcon />}
        onClick={() => {
          router.push(user.isAdmin ? "/admin/collections" : "/authed/user");
        }}
        label={user.isAdmin ? texts.umAdmin : user.name}
      />
      <Divider />
      <NestedMenuItem
        leftIcon={<ContrastOutlinedIcon />}
        label={texts.umTheme}
        parentMenuOpen={props.open}
        rightIcon={<></>}
      >
        <IconMenuItem
          leftIcon={<DarkModeOutlinedIcon />}
          onClick={() => dispatch(changeTheme("dark"))}
          label={texts.umThemeDark}
        />
        <IconMenuItem
          leftIcon={<LightModeOutlinedIcon />}
          onClick={() => dispatch(changeTheme("light"))}
          label={texts.umThemeLight}
        />
        <IconMenuItem
          leftIcon={<DesktopWindowsOutlinedIcon />}
          onClick={() => dispatch(changeTheme("system"))}
          label={texts.umThemeSystem}
        />
      </NestedMenuItem>
      <NestedMenuItem
        leftIcon={<OutlinedFlagSharpIcon />}
        label={texts.umLang}
        parentMenuOpen={props.open}
        rightIcon={<></>}
      >
        <IconMenuItem
          leftIcon={<Flag code="uk" />}
          onClick={() => router.replace(pathname, { locale: "uk" })}
          label={texts.umLangUk}
        />
        <IconMenuItem
          leftIcon={<Flag code="en" />}
          onClick={() => router.replace(pathname, { locale: "en" })}
          label={texts.umLangEn}
        />
      </NestedMenuItem>
      <Divider />
      {user.isAdmin ? null : (
        <IconMenuItem
          leftIcon={<AccountCircleOutlinedIcon />}
          onClick={() => {
            router.push("/authed/user/settings");
          }}
          label={texts.umSettings}
        />
      )}
      <IconMenuItem
        leftIcon={<LogoutOutlinedIcon />}
        onClick={async () => {
          await axios.post("/api/logout", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          dispatch(logout());
          router.replace("/");
        }}
        label={texts.umLogout}
      />
    </Menu>
  );
};

export default UserMenu;
