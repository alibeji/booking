import type { NextPage } from "next";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import Guests from "../components/Guests/Guests";
import Menu from "../components/Menu/Menu";
import { step as atomStep } from "../stores/steps";
import NavigationModule from "../components/Navigation/Navigation";
import { useQuery } from "react-query";
import fetchRestaurantData from "../utils/api/fetchRestaurantData";
import Calendar from "../components/Calendar/Calendar";
import Conditions from "../components/Conditions/Conditions";
import Confirmation from "../components/Confirmation/Confirmation";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const step = useRecoilValue(atomStep);
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(`restaurant-${id}`, () =>
    fetchRestaurantData(typeof id === "string" ? id : "")
  );

  return (
    <div className="container">
      <Head>
        <title>Reservation at {data?.name}</title>
      </Head>
      {step !== "final" && <NavigationModule />}
      {step === "guests" && <Guests />}
      {step === "menu" && <Menu restaurantMenu={data?.menu} />}
      {step === "date" && <Calendar />}
      {data && (step === "conditions" || step === "final") && (
        <Conditions restaurantName={data.name} />
      )}
      {step === "confirm" && <Confirmation />}
    </div>
  );
};

export default Home;
