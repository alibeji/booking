import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { info as atomInfo } from "../../stores/steps";
import { step } from "../../stores/steps";

type MenuProps = {
  restaurantMenu: string[] | undefined;
};

export default function Menu({ restaurantMenu }: MenuProps) {
  const setStep = useSetRecoilState(step);
  const [info, setInfo] = useRecoilState(atomInfo);
  const [menu, setMenu] = useState(info.menu ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenu(e.target.value);
  };

  const isError = !menu;

  const handleSubmit = () => {
    setInfo({ ...info, menu });
    setStep("date");
  };

  return (
    <>
      <h2 className="title">
        Please <span>choose a Menu</span>
      </h2>
      <FormControl className="form">
        <RadioGroup onChange={handleChange} value={menu}>
          {restaurantMenu?.map((meal) => (
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
    </>
  );
}
