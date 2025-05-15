"use client";

import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import type { Member } from "../types/member";
import { MemberCreateCommand } from "../types/member-create-command";

type MemberModalProps = {
  mode: "create" | "edit";
  open: boolean;
  onClose: () => void;
  onSave: (data: MemberCreateCommand) => void;
  member?: Member;
};

export default function MemberModal({
  mode,
  open,
  onClose,
  onSave,
  member,
}: MemberModalProps) {
  const [formData, setFormData] = useState<MemberCreateCommand>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    membershipType: "basic",
    membershipStartDate: "",
    membershipExpiryDate: "",
  });

  useEffect(() => {
    if (mode === "edit" && member) {
      setFormData({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phoneNumber: member.phoneNumber,
        dateOfBirth: member.dateOfBirth,
        membershipType: member.membershipType,
        membershipStartDate: member.membershipStartDate,
        membershipExpiryDate: member.membershipExpiryDate,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        membershipType: "basic",
        membershipStartDate: "",
        membershipExpiryDate: "",
      });
    }
  }, [mode, member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "create" ? "Add Member" : "Edit Member"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
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
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Membership Type"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Membership Start Date"
            name="membershipStartDate"
            type="date"
            value={formData.membershipStartDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Membership Expiry Date"
            name="membershipExpiryDate"
            type="date"
            value={formData.membershipExpiryDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
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
