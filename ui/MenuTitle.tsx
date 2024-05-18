// internal imports
import NavLink from "./NavLink";

// props for Menu Title
type TitleProps = {
  link?: string;
  text: string;
  onClick?: () => void;
  handleClose?: () => void;
};

const MenuTitle = (props: TitleProps) => {
  const content = (
    <div
      className="menu-thing  md:pl-tablet lg:pl-pc w-full py-[5px] border-b-2 border-blue-marguerite-700 dark:border-dark-grey"
      onClick={props.handleClose}
    >
      <h4 className="text-h4">{props.text}</h4>
    </div>
  );

  return props.link ? (
    <NavLink link={props.link}>{content}</NavLink>
  ) : props.onClick ? (
    <div onClick={props.onClick} className="cursor-pointer">
      {content}
    </div>
  ) : (
    <>{content}</>
  );
};

export default MenuTitle;
