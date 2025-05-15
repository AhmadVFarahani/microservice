"use client";

import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import HouseholdDetailPage from "@/app/features/membership/pages/HouseholdDetailPage";

export default function HouseholdDetail() {
  const params = useParams();
  const householdId = params?.id as string; // Cast to string

  return (
    <DashboardLayout>
      <HouseholdDetailPage householdId={householdId} />
    </DashboardLayout>
  );
}
