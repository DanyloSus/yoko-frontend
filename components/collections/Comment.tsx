// external imports
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Image from "next/image";

type CommentProps = {
  image?: string;
  name: string;
  content: string;
  className?: string;
};

const Comment = (props: CommentProps) => {
  return (
    <div
      className={
        (props.className ? props.className : "") +
        " flex flex-col p-[8px] w-full shadow-md border-2 border-light-grey rounded-[8px]"
      }
    >
      <div className="flex items-center gap-[4px]">
        {props.image ? (
          <Image
            src={props.image}
            width={48}
            height={48}
            alt={props.name}
            className="rounded-full object-center w-[48px] h-[48px] object-cover"
          />
        ) : (
          <AccountCircleOutlinedIcon
            sx={{
              width: "48px",
              height: "48px",
            }}
          />
        )}
        <h6 className="text-h6">{props.name}</h6>
      </div>
      <p>{props.content}</p>
    </div>
  );
};

export default Comment;
