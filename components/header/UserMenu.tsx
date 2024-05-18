// external imports
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
import { Divider, Menu } from "@mui/material";
import axios from "axios";
import { IconMenuItem, NestedMenuItem } from "mui-nested-menu";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";

// internal imports
import {
  usePathname,
  useRouter,
} from "@/modules/internationalization/navigation";
import { changeTheme } from "@/modules/redux/darkTheme/darkThemeSlice";
import { Store } from "@/modules/redux/store";
import { logout } from "@/modules/redux/user/userSlice";
import { UserMenuTexts } from "@/modules/types/texts";

type MenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  open: boolean;
  texts: UserMenuTexts;
};

const UserMenu = ({ texts, ...props }: MenuProps) => {
  // router for changing page by code
  const router = useRouter();
  // get pathname
  const pathname = usePathname();

  // dispatch for using redux actions
  const dispatch = useDispatch();
  // get user's info
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
