import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useMutation } from "react-query";
import postLogin, { LoginData } from "../../../utils/api/postLogin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSetRecoilState } from "recoil";
import { userToken } from "../../../stores/token";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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

  const { push } = useRouter();
  const setToken = useSetRecoilState(userToken);

  const { mutate } = useMutation(postLogin, {
    onSuccess: (data: { cod?: number; message?: string; token?: string }) => {
      if (data.cod !== 400 && data.token) {
        setToken(data?.token);
        push("/admin/create");
      } else {
        toast.error(data?.message);
      }
    },
  });

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
            error={errors.password ? true : false}
            helperText={errors?.password?.message}
            variant="standard"
            label="Password"
            type="password"
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
