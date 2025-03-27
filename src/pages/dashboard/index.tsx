import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTickets } from "@/contexts/TicketContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import TicketsPage from "./tickets";
import CreateTicket from "./tickets/create";
import TicketDetail from "./tickets/[id]";
import Settings from "./settings";

export default function Dashboard() {
  const { fetchTickets } = useTickets();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<TicketsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/create" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}
