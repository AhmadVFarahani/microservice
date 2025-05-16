"use client";

import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import type { Household } from "../types/household";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

import HouseholdModal from "../components/HouseholdModal";
import { createHousehold, getAllHouseholds } from "../services/membership-api";
import { HouseholdCreateCommand } from "../types/household-create-command";

export default function HouseholdListPage() {
  const router = useRouter();
  const {
    data: households,
    error,
    isLoading,
  } = useSWR<Household[]>("households", getAllHouseholds);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddHousehold = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveHousehold = async (data: HouseholdCreateCommand) => {
    await createHousehold(data);
    await mutate("households");
    setModalOpen(false);
  };

  const handleViewHousehold = (id: number) => {
    router.push(`/membership/households/${id}`);
  };

  if (isLoading) return <div>Loading households...</div>;
  if (error) return <div>Error loading households!</div>;

  return (
    <Stack spacing={2}>
      {/* Page title + Add button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Households</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddHousehold}
        >
          + Add Household
        </Button>
      </Stack>

      {/* Table of households */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Street Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Province</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {households?.map((household) => (
              <TableRow key={household.id}>
                <TableCell>{household.id}</TableCell>
                <TableCell>{household.streetAddress}</TableCell>
                <TableCell>{household.city}</TableCell>
                <TableCell>{household.province}</TableCell>
                <TableCell>{household.postalCode}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewHousehold(household.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Household Modal */}
      <HouseholdModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveHousehold}
      />
    </Stack>
  );
}
