import React from "react";
import NavLink from "../NavLink";

type TitleProps = {
  link: string;
  text: string;
};

const MenuTitle = (props: TitleProps) => {
  return (
    <NavLink link={props.link}>
      <div className="menu-thing pl-pc w-full py-[5px] border-b-2 border-blue-marguerite-700">
        <h4 className="text-h4">{props.text}</h4>
      </div>
    </NavLink>
  );
};

export default MenuTitle;
