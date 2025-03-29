import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import ContentHome from "@/components/home/ContentHome";

const index = () => {
  return (
    <DashboardLayout>
      <section>
        <ContentHome />
      </section>
    </DashboardLayout>
  );
};

export default index;
