import React from "react";
import MovingText from "./MovingText";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

const Footer = () => {
  return (
    <footer className="min-h-[213px] md:min-h-[298px] flex flex-col items-start justify-center bg-blue-marguerite-500 dark:bg-black relative text-white px-phone md:px-tablet lg:px-pc overflow-hidden gap-[35px]">
      <div className="flex items-center gap-[15px] relative z-10">
        <MailOutlinedIcon sx={{ width: "24px", height: "24px" }} />
        <p>yoko@ukr.eng</p>
      </div>
      <div className="flex items-center gap-[15px] relative z-10">
        <CallOutlinedIcon sx={{ width: "24px", height: "24px" }} />
        <p>+38-555-058-47-93</p>
      </div>
      <MovingText />
    </footer>
  );
};

export default Footer;
