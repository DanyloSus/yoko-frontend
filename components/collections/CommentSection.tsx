"use client";

import React from "react";
import Comment from "./Comment";
import StyledTextField from "@/ui/TextField";
import StyledButton from "@/ui/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";

type Comment = {
  id: number;
  content: string;
  user: {
    name: string;
  };
};

type SectionProps = {
  comments?: Comment[];
  fetchCollection: () => Promise<void>;
  addComment: (comment: Comment) => void;
  userId: string;
  collectionId: string;
};

const CommentSection = (props: SectionProps) => {
  const user = useSelector((state: Store) => state.user);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required().min(8),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      try {
        const res = await axios.post(
          `http://18.212.227.5:8876/api/v1/collections/${props.collectionId}/comment`,
          {
            content: value.comment,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        props.addComment(res.data.data);
        formik.setValues({ comment: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex flex-col items-center mt-[40px]">
      <h2 className="text-h3 sm:text-h2">Comments</h2>
      <hr className="border-light-grey w-full border-t-2" />
      <div className="px-phone md:px-tablet lg:px-pc flex flex-col items-center gap-[16px] my-[16px] w-full max-w-[573px]">
        <form
          className="flex flex-col gap-[10px] items-end w-full"
          onSubmit={formik.handleSubmit}
        >
          <StyledTextField
            multiline
            minRows={3}
            label="Add Comment"
            className="w-full"
            type="text"
            name="comment"
            sx={{
              "& .MuiInputBase-root": {
                padding: "8px",
              },
            }}
            error={
              Boolean(formik.errors.comment) || formik.errors.comment === ""
            }
            helperText={formik.errors.comment ? formik.errors.comment : ""}
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          <StyledButton variant="contained" type="submit">
            Sumbit
          </StyledButton>
        </form>
        {props.comments?.reverse().map((comment) => (
          <Comment
            content={comment.content}
            name={comment.user.name}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
