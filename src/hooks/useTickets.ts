import { useState, useCallback } from "react";
import { ticketService } from "@/services/ticket.service";
import type { Ticket, TicketStatus } from "@/types/ticket.types";
import { useToast } from "@/hooks/useToast";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchTickets = useCallback(
    async (filters = {}) => {
      try {
        setLoading(true);
        const { tickets: fetchedTickets } = await ticketService.getTickets(
          filters
        );
        setTickets(fetchedTickets);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des tickets");
        showToast("error", "Erreur lors du chargement des tickets");
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  const createTicket = async (ticketData: Partial<Ticket>) => {
    try {
      setLoading(true);
      const newTicket = await ticketService.createTicket(ticketData);
      setTickets((prev) => [newTicket, ...prev]);
      showToast("success", "Ticket créé avec succès");
      return newTicket;
    } catch (err) {
      setError("Erreur lors de la création du ticket");
      showToast("error", "Erreur lors de la création du ticket");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (id: string, status: TicketStatus) => {
    try {
      const updatedTicket = await ticketService.updateTicketStatus(id, status);
      setTickets((prev) =>
        prev.map((ticket) => (ticket.id === id ? updatedTicket : ticket))
      );
      showToast("success", "Statut du ticket mis à jour");
    } catch (err) {
      showToast("error", "Erreur lors de la mise à jour du statut");
      throw err;
    }
  };

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    updateTicketStatus,
  };
}
