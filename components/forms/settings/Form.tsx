// hooks need CSR
"use client";

// external imports
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

// internal imports
import { useRouter } from "@/modules/internationalization/navigation";
import { Store } from "@/modules/redux/store";
import { login } from "@/modules/redux/user/userSlice";
import { DeleteDialogTexts } from "@/modules/types/texts";
import StyledButton from "@/ui/mui/Button";
import StyledTextField from "@/ui/mui/TextField";
import DeleteDialog from "./DeleteDialog";

type FormTexts = {
  texts: {
    name: string;
    surname: string;
    newPassword: string;
    passwordConfirm: string;
    confirm: string;
  } & DeleteDialogTexts;
  errors: {
    nameRequired: string;
    nameLen: string;
    nameLat: string;
    surnameRequired: string;
    surnameLen: string;
    surnameLat: string;
    newPasswordLen: string;
    newPasswordLat: string;
    passwordConfirmationsLen: string;
    passwordConfirmationsLat: string;
    writeNew: string;
    writeConfirmation: string;
    dontMatch: string;
    serverError: string;
  };
};

const SettingsForm = ({ texts, errors }: FormTexts) => {
  const [open, setOpen] = useState(false); // state for checking is delete modal open
  const [isLoading, setIsLoading] = useState(false); // state for checking is form loading

  // router for changing page by code
  const router = useRouter();

  // dispatch for slices' actions
  const dispatch = useDispatch();
  // get current user's values
  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    // if user exists then we show his data else we show nothing
    formik.setValues({
      name: user.name ? user.name : "",
      surname: user.surname ? user.surname : "",
      new_password: "",
      password_confirmation: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // formik for better form control
  const formik = useFormik({
    // initial values
    initialValues: {
      name: "",
      surname: "",
      new_password: "",
      password_confirmation: "",
    },
    // validation
    validationSchema: Yup.object({
      name: Yup.string()
        .required(errors.nameRequired)
        .test("latin", errors.nameLat, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          errors.nameLen,
          (val) => val.length >= 1 && val.length <= 20
        ),
      surname: Yup.string()
        .required(errors.surnameRequired)
        .test("latin", errors.surnameLat, (val) => !/^[a-zA-Z]$/.test(val))
        .test(
          "len",
          errors.surnameLen,
          (val) => val.length >= 1 && val.length <= 20
        ),
      new_password: Yup.string()
        .test("latin", errors.newPasswordLat, (val) => {
          if (val) return !/^[a-zA-Z]$/.test(val);
          return true;
        })
        .test("len", errors.newPasswordLen, (val) => {
          if (val) return val.length >= 8 && val.length <= 20;
          return true;
        }),
      password_confirmation: Yup.string()
        .test("latin", errors.passwordConfirmationsLat, (val) => {
          if (val) return !/^[a-zA-Z]$/.test(val);
          return true;
        })
        .test("len", errors.passwordConfirmationsLen, (val) => {
          if (val) return val.length >= 8 && val.length <= 20;
          return true;
        }),
    }),
    validateOnChange: false,
    // on submit function
    onSubmit: async (value) => {
      setIsLoading(true);

      // validation if user wrote something in
      // password fields but didn't wrote to another
      if (value.new_password.length && !value.password_confirmation.length) {
        formik.setErrors({
          new_password: "",
          password_confirmation: errors.writeConfirmation,
        });
        setIsLoading(false);
        return;
      } else if (
        value.password_confirmation.length &&
        !value.new_password.length
      ) {
        formik.setErrors({
          new_password: errors.writeNew,
          password_confirmation: "",
        });
        setIsLoading(false);
        return;
      }

      // data which will be sent to server
      let data: {
        name: string;
        surname: string;
        password?: string;
      } = {
        name: value.name,
        surname: value.surname,
      };

      // if values include passwords than we add its to data
      if (value.new_password) {
        data = {
          ...data,
          password: value.new_password,
        };
      }

      try {
        // request to patch our data
        const res = await axios.patch(
          `http://18.212.227.5:8876/api/v1/users/${user.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // updated data
        const updatedData = res.data.data.user;

        // write updated data
        dispatch(
          login({
            id: updatedData.id,
            email: updatedData.email,
            name: updatedData.name,
            surname: updatedData.surname,
            isAdmin: user.isAdmin,
            token: user.token,
          })
        );

        router.push("/authed/user");
      } catch (error) {
        console.log(error);
        formik.setErrors({
          name: "",
          surname: "",
          new_password: "",
          password_confirmation: errors.serverError,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form className="space-y-[24px] w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-[20px] justify-stretch w-full relative">
          {isLoading ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <CircularProgress color="primary" />
            </div>
          ) : null}
          <div className="flex gap-[20px] w-full">
            <StyledTextField
              disabled={isLoading}
              label={texts.name}
              type="text"
              name="name"
              className="w-full"
              error={Boolean(formik.errors.name) || formik.errors.name === ""}
              helperText={formik.errors.name ? formik.errors.name : ""}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <StyledTextField
              disabled={isLoading}
              label={texts.surname}
              className="w-full"
              type="text"
              name="surname"
              error={
                Boolean(formik.errors.surname) || formik.errors.surname === ""
              }
              helperText={formik.errors.surname ? formik.errors.surname : ""}
              onChange={formik.handleChange}
              value={formik.values.surname}
            />
          </div>

          <StyledTextField
            disabled={isLoading}
            label={texts.newPassword}
            type="password"
            name="new_password"
            error={
              Boolean(formik.errors.new_password) ||
              formik.errors.new_password === ""
            }
            helperText={
              formik.errors.new_password ? formik.errors.new_password : ""
            }
            onChange={formik.handleChange}
            value={formik.values.new_password}
          />
          <StyledTextField
            disabled={isLoading}
            label={texts.passwordConfirm}
            type="password"
            name="password_confirmation"
            error={
              Boolean(formik.errors.password_confirmation) ||
              formik.errors.password_confirmation === ""
            }
            helperText={
              formik.errors.password_confirmation
                ? formik.errors.password_confirmation
                : ""
            }
            onChange={formik.handleChange}
            value={formik.values.password_confirmation}
          />
        </div>
        <div className="flex justify-between w-full">
          <StyledButton
            sx={{ width: "90px" }}
            variant="contained"
            onClick={() => setOpen(true)}
            color="error"
            disabled={isLoading}
          >
            {texts.delete}
          </StyledButton>
          <DeleteDialog
            open={open}
            handleClose={() => setOpen(false)}
            texts={{
              cancel: texts.cancel,
              delete: texts.delete,
              dialogContent: texts.dialogContent,
              dialogHeading: texts.dialogHeading,
            }}
          />
          <StyledButton
            sx={{ width: "101px" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {texts.confirm}
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
