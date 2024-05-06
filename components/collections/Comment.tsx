import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

type CommentProps = {
  image?: string;
  name: string;
  content: string;
};

const Comment = (props: CommentProps) => {
  return (
    <div className="max-w-[573px] flex flex-col p-[8px] w-full shadow-md border-2 border-light-grey">
      <div className="flex items-center gap-[4px]">
        <AccountCircleOutlinedIcon />
        <h6 className="text-h6">{props.name}</h6>
      </div>
      <p>{props.content}</p>
    </div>
  );
};

export default Comment;
