import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "../config/cookie";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./SignIn.module.css";
import {
  Visibility,
  VisibilityOff,
  Diversity1,
  Public,
} from "@mui/icons-material";
import AuthAPI from "../api/AuthAPI";
import UserAPI from "../api/UserAPI";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState("password");
  const schema = yup
    .object({
      employeeid: yup.string().required("Chưa nhập tài khoản!!!"),
      password: yup.string().required("Chưa nhập mật khẩu!!!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const handleSignIn = await AuthAPI.signin({
        employid: data.employeeid,
        password: data.password,
      });
      if (handleSignIn.data) {
        const result = await UserAPI.profile(handleSignIn.data.token);
        if (result.data && result.data.isAdmin === true) {
          Cookies.set("token", JSON.stringify(handleSignIn.data.token), {
            path: "/",
            days: 0,
          });
          localStorage.setItem("ok", JSON.stringify(handleSignIn.data.token));
          Cookies.set(
            "refreshToken",
            JSON.stringify(handleSignIn.data.refreshToken),
            {
              path: "/",
              days: 0,
            }
          );
        }
      }
      if (Cookies.get("token")) {
        window.location.reload(false);
      }
    } catch (error) {
      console.log(0);
    }
  };
  const handleClickShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    }
    if (showPassword === "text") {
      setShowPassword("password");
    }
  };
  return (
    <div className={styles.cont}>
      <div className={styles.tie}>
        <Public sx={{ fontSize: "170px", marginRight: "30px" }} />
        <div>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            KMESS
          </Typography>
          <Typography variant="h6">Nền tảng liên lạc trực tuyến</Typography>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Diversity1
          sx={{ fontSize: "150px", marginBottom: "50px", color: "#3949ab" }}
        />
        <TextField
          error={errors.employeeid?.message ? true : false}
          label="Tài khoản"
          id="outlined-basic"
          helperText={
            errors.employeeid?.message ? errors.employeeid?.message : null
          }
          {...register("employeeid")}
          className={styles.inputsignin}
        />
        <FormControl
          error={errors.password?.message ? true : false}
          sx={{
            marginBottom: "10px",
          }}
          className={styles.inputsignin}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Mật khẩu
          </InputLabel>
          <OutlinedInput
            {...register("password")}
            id="outlined-adornment-password"
            type={showPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword === "text" ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mật khẩu"
          />
          <FormHelperText>
            {errors.password?.message ? errors.password?.message : null}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginBottom: "20px",
            width: "350px",
          }}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};
export default SignIn;
