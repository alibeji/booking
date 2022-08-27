import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "react-query";
import postLogin, { LoginData } from "../../../utils/api/postLogin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const loginSchema = object().shape({
  email: string().email().required(),
  password: string().required("Enter your password"),
});

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const { mutate } = useMutation(postLogin);

  const callback = (data: LoginData) => {
    mutate(data);
  };

  return (
    <div className="container">
      <Head>
        <title>Login</title>
      </Head>
      <h2 className="title">
        Please <span>Login</span>
      </h2>
      <div>
        <form className="form" onSubmit={handleSubmit(callback)}>
          <TextField
            {...register("email")}
            variant="standard"
            label="Email"
            error={errors.password ? true : false}
            helperText={errors?.email?.message}
          />
          <TextField
            {...register("password")}
            variant="standard"
            label="Password"
            type="password"
            error={errors.password ? true : false}
            helperText={errors?.password?.message}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
