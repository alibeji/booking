import { NextPage } from "next";
import { userToken } from "../../../stores/token";
import { useUserInfo } from "../../../utils/user/user";

const Create: NextPage = () => {
  const userInfo = useUserInfo(userToken);

  console.log(userInfo);

  return <div>create</div>;
};

export default Create;
