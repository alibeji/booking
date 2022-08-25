import React from "react";
import styles from "./Confirmation.module.scss";
import { step as atomStep } from "../../stores/steps";
import dayjs from "dayjs";
import { info as atomInfo } from "../../stores/steps";
import { useRecoilValue, useRecoilState } from "recoil";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Button from "@mui/material/Button";
dayjs.extend(customParseFormat);

type ConfirmationProps = {
  restaurantName: string;
};

export default function Confirmation({ restaurantName }: ConfirmationProps) {
  const [step, setStep] = useRecoilState(atomStep);
  const { duration, time } = useRecoilValue(atomInfo);

  const reservationEnd = dayjs(time, "HH:mm")
    .add(duration === "long" ? 3 : 1.5, "hour")
    .format("HH:mm");

  const handleAccept = () => {
    setStep("confirm");
  };

  return (
    <>
      {step === "conditions" ? (
        <h1 className="title">
          Accept the <span>conditions</span>
        </h1>
      ) : (
        <h1 className="title">
          <span>Reservation</span> confirmed
        </h1>
      )}
      <div className={styles.paragraphContainer}>
        <p>
          {step === "conditions"
            ? `Dear guest,

             Please note that your table is available until ${reservationEnd} and can later be reserved by other clients.\n
             Best regards,\n
              ${restaurantName}`
            : `Dear guest,\n 
            Your reservation has been confirmed.\n 
            Best Regards,\n 
            ${restaurantName}`}
        </p>
      </div>
      {step === "conditions" && (
        <Button variant="contained" onClick={handleAccept}>
          Accept
        </Button>
      )}
    </>
  );
}
