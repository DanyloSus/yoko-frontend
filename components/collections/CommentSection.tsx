// hooks need CSR
"use client";

// external imports
import axios from "axios";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

// internal imports
import { Store } from "@/modules/redux/store";
import { Comment as CommentType } from "@/modules/types/elements";
import { CommentResponse } from "@/modules/types/responses";
import {
  CommentSectionErrors,
  CommentSectionTexts,
} from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import StyledTextField from "@/ui/mui/TextField";
import Comment from "./Comment";

type SectionProps = {
  comments?: CommentType[];
  fetchCollection: () => Promise<void>;
  addComment: (comment: CommentType) => void;
  userId: string;
  collectionId: string;
  texts: CommentSectionTexts;
  errors: CommentSectionErrors;
};

const CommentSection = ({ texts, errors, ...props }: SectionProps) => {
  // get user's info
  const user = useSelector((state: Store) => state.user);

  // formik for better form control
  const formik = useFormik({
    // initial values
    initialValues: {
      comment: "",
    },
    // validation
    validationSchema: Yup.object({
      comment: Yup.string().required(errors.required).min(8, errors.minLen),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      try {
        // send comment
        const res: CommentResponse = await axios.post(
          `/api/collection/${props.collectionId}/comment`,
          {
            content: value.comment,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // add comment to state to avoid extra requests
        props.addComment(res.data.data);

        // clear form
        formik.setValues({ comment: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex flex-col items-center mt-[40px]">
      <h2 className="text-h3 sm:text-h2">{texts.comments}</h2>
      <hr className="border-light-grey w-full border-t-2" />
      <div className="px-phone md:px-tablet lg:px-pc flex flex-col items-center gap-[16px] my-[16px] w-full max-w-[573px]">
        <form
          className="flex flex-col gap-[10px] items-end w-full"
          onSubmit={formik.handleSubmit}
        >
          <StyledTextField
            multiline
            minRows={3}
            label={texts.addComment}
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
            {texts.submit}
          </StyledButton>
        </form>
        {props.comments?.map((comment) => (
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
