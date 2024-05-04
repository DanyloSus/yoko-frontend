"use client";

import StyledButton from "@/ui/Button";
import StyledTextField from "@/ui/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import axios from "axios";
import { login } from "@/modules/redux/user/userSlice";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SettingsForm = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useSelector((state: Store) => state.user);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    formik.setValues({
      name: user.name ? user.name : "",
      surname: user.surname ? user.surname : "",
      new_password: "",
      password_confirmation: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      new_password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required()
        .test(
          "latin",
          "Must be latin characters",
          (val) => !/^[a-zA-Z]$/.test(val)
        )
        .test(
          "len",
          "Must be from 1 to 20 characters",
          (val) => val.length >= 1 && val.length <= 20
        ),
      surname: Yup.string()
        .required()
        .test(
          "latin",
          "Must be latin characters",
          (val) => !/^[a-zA-Z]$/.test(val)
        )
        .test(
          "len",
          "Must be from 1 to 20 characters",
          (val) => val.length >= 1 && val.length <= 20
        ),
      new_password: Yup.string()
        .test("latin", "Must be latin characters", (val) => {
          if (val) return !/^[a-zA-Z]$/.test(val);
          return true;
        })
        .test("len", "Must be from 8 to 20 characters", (val) => {
          if (val) return val.length >= 8 && val.length <= 20;
          return true;
        }),
      password_confirmation: Yup.string()
        .test("latin", "Must be latin characters", (val) => {
          if (val) return !/^[a-zA-Z]$/.test(val);
          return true;
        })
        .test("len", "Must be from 8 to 20 characters", (val) => {
          if (val) return val.length >= 8 && val.length <= 20;
          return true;
        }),
    }),
    validateOnChange: false,
    onSubmit: async (value) => {
      setIsLoading(true);
      if (value.new_password.length && !value.password_confirmation.length) {
        formik.setErrors({
          new_password: "",
          password_confirmation: "Write password confirmation",
        });
        setIsLoading(false);
        return;
      } else if (
        value.password_confirmation.length &&
        !value.new_password.length
      ) {
        formik.setErrors({
          new_password: "Write new password",
          password_confirmation: "",
        });
        setIsLoading(false);
        return;
      } else if (value.new_password !== value.password_confirmation) {
        formik.setErrors({
          new_password: "",
          password_confirmation: "Passwords don't match",
        });
        setIsLoading(false);
        return;
      }

      let data: {
        name: string;
        surname: string;
        password?: string;
      } = {
        name: value.name,
        surname: value.surname,
      };

      if (value.new_password) {
        data = {
          ...data,
          password: value.new_password,
        };
      }

      try {
        const res = await axios.patch(
          `http://localhost:8876/api/v1/users/${user.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(res);

        const updatedData = res.data.data;

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

        router.push("/auth/user");
      } catch (error) {
        console.log(error);
        formik.setErrors({
          name: "",
          surname: "",
          new_password: "",
          password_confirmation: "Something went wrong",
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
              label="Name"
              type="text"
              name="name"
              error={Boolean(formik.errors.name) || formik.errors.name === ""}
              helperText={formik.errors.name ? formik.errors.name : ""}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <StyledTextField
              disabled={isLoading}
              label="Surname"
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
            label="New Password"
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
            label="Confirm Password"
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
            onClick={handleOpen}
            color="error"
            disabled={isLoading}
          >
            Delete
          </StyledButton>
          <DeleteDialog open={open} handleClose={handleClose} />
          <StyledButton
            sx={{ width: "101px" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            Confirm
          </StyledButton>
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
