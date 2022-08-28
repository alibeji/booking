export type SignUpData = {
  email: string;
  password: string;
  name: string;
};

const postSignUp = async (data: SignUpData) => {
  const response = await fetch(`https://be-roan.vercel.app/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export default postSignUp;
