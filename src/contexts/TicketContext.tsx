import React, { createContext, useContext, useState } from "react";
import { api } from "@/services/api.service";
import type { Ticket } from "@/types/ticket.types";

interface TicketContextType {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  createTicket: (data: Partial<Ticket>) => Promise<void>;
  updateTicket: (id: string, data: Partial<Ticket>) => Promise<void>;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tickets");
      setTickets(response.data.tickets);
    } catch (err) {
      setError("Erreur lors du chargement des tickets");
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (data: Partial<Ticket>) => {
    try {
      setLoading(true);
      const response = await api.post("/tickets", data);
      setTickets((prev) => [response.data, ...prev]);
    } catch (err) {
      setError("Erreur lors de la création du ticket");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id: string, data: Partial<Ticket>) => {
    try {
      setLoading(true);
      const response = await api.patch(`/tickets/${id}`, data);
      setTickets((prev) =>
        prev.map((ticket) => (ticket.id === id ? response.data : ticket))
      );
    } catch (err) {
      setError("Erreur lors de la mise à jour du ticket");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        fetchTickets,
        createTicket,
        updateTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};
