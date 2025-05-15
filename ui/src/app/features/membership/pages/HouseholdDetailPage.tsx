"use client";

import React from "react";
import useSWR, { mutate } from "swr";

import type { Household } from "../types/household";
import type { Member } from "../types/member";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {
  addMemberToHousehold,
  getHouseholdById,
} from "../services/membershipApi";
import MemberCardList from "../components/MemberCardList";
import MemberModal from "../components/MemberModal";
import { MemberCreateCommand } from "../types/member-create-command";

type Props = {
  householdId: string;
};

export default function HouseholdDetailPage({ householdId }: Props) {
  const {
    data: household,
    error,
    isLoading,
  } = useSWR<Household>(householdId ? `household-${householdId}` : null, () =>
    getHouseholdById(Number(householdId))
  );

  const [selectedMember, setSelectedMember] = React.useState<Member | null>(
    null
  );
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleEditHousehold = () => {
    alert(`Edit Household ${householdId} clicked`);
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };

  const handleSaveMember = async (data: Member) => {
    if (!selectedMember) {
      // ✅ Create new member
      const requestData: MemberCreateCommand = {
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        dateOfBirth: data.dateOfBirth ?? "",
        membershipType: data.membershipType ?? "basic",
        membershipStartDate: data.membershipStartDate ?? "",
        membershipExpiryDate: data.membershipExpiryDate ?? "",
        email: data.email ?? "",
        phoneNumber: data.phoneNumber ?? "",
      };

      await addMemberToHousehold(Number(householdId), requestData);
      await mutate(`household-${householdId}`);
      setModalOpen(false);
    } else {
      // ❌ Optional: update logic for future version
      alert("Update Member API not implemented in backend");
    }
  };

  if (isLoading) return <div>Loading household...</div>;
  if (error) return <div>Error loading household!</div>;
  if (!household) return <div>No household found.</div>;

  return (
    <Stack spacing={3}>
      {/* Household Info */}
      <Paper sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Household Info</Typography>
          <Button variant="outlined" onClick={handleEditHousehold}>
            Edit Household
          </Button>
        </Stack>

        <Typography>ID: {household.id}</Typography>
        <Typography>Address: {household.streetAddress}</Typography>
        <Typography>City: {household.city}</Typography>
        <Typography>Province: {household.province}</Typography>
        <Typography>Postal Code: {household.postalCode}</Typography>
      </Paper>

      {/* Member List */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Members</Typography>
        <Button variant="contained" onClick={handleAddMember}>
          + Add Member
        </Button>
      </Stack>

      {/* Member Card List */}
      <MemberCardList
        members={household.members}
        onEditMember={handleEditMember}
      />

      {/* Member Modal */}
      <MemberModal
        mode={selectedMember ? "edit" : "create"}
        member={selectedMember ?? undefined}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMember}
      />
    </Stack>
  );
}
