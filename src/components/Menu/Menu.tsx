import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import fetchRestaurantData from "../../utils/api/fetchRestaurantData";
import { info as atomInfo } from "../../stores/steps";
import { step } from "../../stores/steps";

const restaurantId = "62c1a011e95e96a91dbfd023";

export default function Menu() {
  const { data } = useQuery("restaurants", () =>
    fetchRestaurantData(restaurantId)
  );

  const setStep = useSetRecoilState(step);
  const [info, setInfo] = useRecoilState(atomInfo);
  const [menu, setMenu] = useState(info.menu ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenu(e.target.value);
  };

  const isError = !menu;

  console.log(menu);

  const handleSubmit = () => {
    setInfo({ ...info, menu });
    setStep("date");
  };

  return (
    <div>
      <h2>Please choose a Menu</h2>
      <FormControl>
        <RadioGroup onChange={handleChange} value={menu}>
          {data?.menu.map((meal) => (
            <FormControlLabel
              value={meal}
              control={<Radio />}
              label={meal}
              key={meal}
            />
          ))}
        </RadioGroup>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          variant="contained"
          type="submit"
          disabled={isError}
        >
          Next
        </Button>
      </FormControl>
    </div>
  );
}
