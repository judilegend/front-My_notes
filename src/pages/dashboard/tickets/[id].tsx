import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTickets } from "@/contexts/TicketContext";
import { Ticket } from "@/types/ticket.types";

export default function TicketDetail() {
  const { id } = useParams();
  const { tickets } = useTickets();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const currentTicket = tickets.find((t) => t.id === id);
    if (currentTicket) {
      setTicket(currentTicket);
    }
  }, [id, tickets]);

  if (!ticket) {
    return <div>Ticket non trouvé</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                ticket.priority === "high"
                  ? "bg-red-100 text-red-800"
                  : ticket.priority === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {ticket.priority}
            </span>
            <span className="text-gray-500">#{ticket.id}</span>
          </div>
          <p className="text-gray-700">{ticket.description}</p>
        </div>
      </div>

      {/* Comments section will be added here */}
    </div>
  );
}
