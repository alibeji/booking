export type LoginData = {
  email: string;
  password: string;
};

const postLogin = async (data: LoginData) => {
  const response = await fetch(`https://be-roan.vercel.app/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export default postLogin;
