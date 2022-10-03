import type { NextPage } from "next";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { object, ref, string } from "yup";
import { useForm } from "react-hook-form";
import postSignUp, { SignUpData } from "../../../utils/api/postSignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type SignupSchema = {
  confirmPassword: string;
} & SignUpData;

const signupSchema = object().shape({
  name: string().required(),
  email: string().email().required(),
  password: string().required("Enter a password").min(6).max(20),
  confirmPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password"), null], "The passwords do not match"),
});

const Signup: NextPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: yupResolver(signupSchema),
  });

  const { push } = useRouter();

  const { mutate } = useMutation(postSignUp, {
    onSuccess: (data: { cod?: number }) => {
      if (data.cod !== 400) {
        push("/admin/login");
      } else {
        toast.error("something went wrong");
      }
    },
  });

  const callback = ({ email, name, password }: SignupSchema) => {
    mutate({
      email,
      name,
      password,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <h2 className="title">
        Create an <span>Account</span>
      </h2>
      <form className="form" onSubmit={handleSubmit(callback)}>
        <TextField
          {...register("name")}
          error={errors.name ? true : false}
          helperText={errors?.name?.message}
          variant="standard"
          label="Name"
        />
        <TextField
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors?.email?.message}
          variant="standard"
          label="Email"
        />
        <TextField
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors?.password?.message}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
          label="Password"
        />
        <TextField
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
          helperText={errors?.confirmPassword?.message}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="standard"
          label="Confirm Password"
        />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
