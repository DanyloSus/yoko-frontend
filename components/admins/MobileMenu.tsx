import React from "react";
import Portal from "../wrappers/Portal";
import { motion } from "framer-motion";
import { Link } from "@/modules/internationalization/navigation";
import MenuTitle from "./MenuTitle";

const MobileMenu = () => {
  return (
    <Portal>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut" }}
        key={"Modal"}
        className="fixed w-screen h-screen bg-blue-marguerite-500 z-10 text-white flex flex-col items-stretch pt-[70px] text-center max-vsm:hidden sm:hidden"
      >
        <MenuTitle link="/admin/users" text="Users" />
        <MenuTitle link="/admin/collections" text="Collections" />
        <MenuTitle link="/admin/words" text="Words" />
      </motion.div>
    </Portal>
  );
};

export default MobileMenu;
