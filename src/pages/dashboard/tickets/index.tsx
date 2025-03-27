import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockTickets } from "@/data/mockTickets";

export default function TicketsPage() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(mockTickets);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTickets = tickets.filter((ticket) =>
    filterStatus === "all" ? true : ticket.status === filterStatus
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Button
          onClick={() => navigate("/dashboard/tickets/create")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nouveau Ticket
        </Button>
      </div>

      <div className="mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-select"
        >
          <option value="all">Tous les statuts</option>
          <option value="open">Ouvert</option>
          <option value="in_progress">En cours</option>
          <option value="resolved">Résolu</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md"
            onClick={() => navigate(`/dashboard/tickets/${ticket.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{ticket.title}</h3>
                <p className="text-sm text-gray-600">{ticket.description}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  ticket.priority === "urgent"
                    ? "bg-red-100 text-red-800"
                    : ticket.priority === "high"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {ticket.priority}
              </span>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>#{ticket.id}</span>
              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
