import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import styles from "./Guest.module.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { info as infoAtom, step } from "../../stores/steps";

export default function Guests() {
  const setStep = useSetRecoilState(step);
  const [info, setInfo] = useRecoilState(infoAtom);
  const [guests, setGuests] = useState(info.guests ?? 1);
  const isError = guests < 1 || guests > 12 || !guests;

  const handleSubmit = () => {
    setInfo({ ...info, guests });
    setStep("menu");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGuests(e.target.valueAsNumber);

  const handleIncrement = (type: "remove" | "add") => {
    if (!guests) setGuests(1);
    else setGuests((prev) => (type === "remove" ? prev - 1 : prev + 1));
  };

  return (
    <>
      <h1 className="title">
        Please <span>choose the number</span> of Guests
      </h1>
      <FormControl className={styles.guestNumberInputForm}>
        <OutlinedInput
          className={styles.guestNumberInput}
          type="number"
          inputProps={{ max: 12, min: 1 }}
          error={isError}
          value={guests}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                onClick={() => handleIncrement("remove")}
                disabled={guests <= 1}
              >
                <RemoveIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleIncrement("add")}
                disabled={guests >= 12}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
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
        {isError && (
          <p className={styles.error}>
            The number of guests needs to be between 1 and 12.
          </p>
        )}
      </FormControl>
    </>
  );
}
