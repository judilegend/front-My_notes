import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout children={undefined}>
      {/* <Routes>
        <Route path="/" element={<TicketsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/create" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes> */}
    </DashboardLayout>
  );
}
