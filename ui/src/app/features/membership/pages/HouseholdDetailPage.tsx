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
  updateHousehold,
  updateMemberInHousehold,
} from "../services/membership-api";
import MemberCardList from "../components/MemberCardList";
import MemberModal from "../components/MemberModal";
import { MemberCreateCommand } from "../types/member-create-command";
import { MemberUpdateCommand } from "../types/member-update-command";
import HouseholdModal from "../components/HouseholdModal";
import { HouseholdCreateCommand } from "../types/household-create-command";
import { HouseholdUpdateCommand } from "../types/household-update-command";

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
  const [isMemberModalOpen, setMemberModalOpen] = React.useState(false);
  const [isHouseholdModalOpen, setHouseholdModalOpen] = React.useState(false);

  const handleEditHousehold = () => {
    setHouseholdModalOpen(true);
  };

  const handleEditHoushold = async (data: HouseholdCreateCommand) => {
    // UPDATE
    debugger;
    const updateRequest: HouseholdUpdateCommand = {
      id: Number(householdId),
      streetAddress: data.streetAddress,
      city: data.city,
      province: data.province,
      postalCode: data.postalCode,
      country: data.country,
      phoneNumber: data.phoneNumber,
    };
    await updateHousehold(Number(householdId), updateRequest);

    await mutate(`household-${householdId}`);
    setHouseholdModalOpen(false);
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setMemberModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setMemberModalOpen(true);
  };

  const handleCloseModal = () => {
    setMemberModalOpen(false);
    setSelectedMember(null);
  };

  const handleSaveMember = async (data: MemberCreateCommand) => {
    if (!selectedMember) {
      // ✅ Create new member

      await addMemberToHousehold(Number(householdId), data);
    } else {
      // UPDATE
      const updateRequest: MemberUpdateCommand = {
        memberId: selectedMember.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        membershipType: data.membershipType,
        membershipStartDate: data.membershipStartDate,
        membershipExpiryDate: data.membershipExpiryDate,
        email: data.email,
      };
      await updateMemberInHousehold(Number(householdId), updateRequest);
    }

    await mutate(`household-${householdId}`);
    setMemberModalOpen(false);
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
        open={isMemberModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMember}
      />
      <HouseholdModal
        mode="edit"
        houseHold={household}
        open={isHouseholdModalOpen}
        onClose={() => setHouseholdModalOpen(false)}
        onSave={handleEditHoushold}
      />
    </Stack>
  );
}
