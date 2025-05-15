"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Member } from "../types/member";

type Props = {
  members: Member[];
  onEditMember: (member: Member) => void;
};

export default function MemberCardList({ members, onEditMember }: Props) {
  const handleDeleteMember = (id: number) => {
    alert(`Delete Member ${id} clicked`);
  };

  return (
    <Stack spacing={2}>
      {members.map((member) => (
        <Card key={member.id} variant="outlined">
          <CardContent>
            <Typography variant="h6">
              {member.firstName} {member.lastName}
            </Typography>
            <Typography>Email: {member.email}</Typography>
            <Typography>Phone: {member.phoneNumber}</Typography>
            <Typography>Date of Birth: {member.dateOfBirth}</Typography>
            <Typography>Membership Type: {member.membershipType}</Typography>
            <Typography>
              Membership: {member.membershipStartDate} →{" "}
              {member.membershipExpiryDate}
            </Typography>

            <Stack direction="row" spacing={1} mt={2}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onEditMember(member)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDeleteMember(member.id)}
              >
                Delete
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
