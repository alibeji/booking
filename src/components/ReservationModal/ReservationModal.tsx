import { Dialog } from "@mui/material";
import React from "react";
import ReservationForm from "../ReservationForm/ReservationForm";

type ReservationModalProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const ReservationModal = ({ id, open, onClose }: ReservationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="container" style={{ rowGap: "1rem" }}>
        <h2 className="title" style={{ marginBottom: "0" }}>
          New <span>reservation</span>
        </h2>
        <ReservationForm id={id} />
      </div>
    </Dialog>
  );
};

export default ReservationModal;
