"use client";

import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import type { Household } from "../types/household";
import { Chip } from "@mui/material";
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
import {
  cancelHouseholdById,
  createHousehold,
  getAllHouseholds,
} from "../services/membership-api";
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

  const handleCancelHousehold = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this household?"
    );
    if (!confirmed) return;

    await cancelHouseholdById(id);
    await mutate("households");
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
                <TableCell align="center">
                  {household.isCancelled ? (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewHousehold(household.id)}
                      >
                        View
                      </Button>
                      <Chip
                        label="Cancelled"
                        color="error"
                        variant="outlined"
                      />
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewHousehold(household.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleCancelHousehold(household.id)}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  )}
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
