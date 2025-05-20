"use client";

import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { HouseholdCreateCommand } from "../types/household-create-command";
import { Household } from "../types/household";

type HouseholdModalProps = {
  mode: "create" | "edit";
  open: boolean;
  onClose: () => void;
  onSave: (data: HouseholdCreateCommand) => void;
  houseHold?: Household;
};

export default function HouseholdModal({
  mode,
  open,
  onClose,
  onSave,
  houseHold,
}: HouseholdModalProps) {
  const [formData, setFormData] = useState<HouseholdCreateCommand>({
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  useEffect(() => {
    debugger;
    if (mode === "edit" && houseHold) {
      setFormData({
        streetAddress: houseHold.streetAddress,
        city: houseHold.city,
        province: houseHold.province,
        postalCode: houseHold.postalCode,
        country: houseHold.country,
        phoneNumber: houseHold.phoneNumber,
      });
    } else {
      setFormData({
        streetAddress: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
      });
    }
  }, [mode, houseHold]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Household</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Street Address"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "create" ? "Create" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
