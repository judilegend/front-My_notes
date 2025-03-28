import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import ContentHome from "@/components/home/contentHome";

const index = () => {
  return (
    <DashboardLayout>
      <ContentHome />
    </DashboardLayout>
  );
};

export default index;
