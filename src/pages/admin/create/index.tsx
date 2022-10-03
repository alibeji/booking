import { NextPage } from "next";
import RestaurantForm from "../../../components/RestaurantForm/RestaurantForm";

const Create: NextPage = () => {
  return (
    <div className="container">
      <h2 className="title">
        Create <span>Restaurant</span>
      </h2>
      <RestaurantForm />
    </div>
  );
};

export default Create;
