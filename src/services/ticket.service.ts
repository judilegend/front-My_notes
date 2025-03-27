import { api } from "./api.service";
import type {
  Ticket,
  TicketStatus,
  Comment,
  Attachment,
} from "@/types/ticket.types";

export const ticketService = {
  // Création d'un ticket
  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
    const response = await api.post("/tickets", ticketData);
    return response.data;
  },

  // Récupération des tickets avec filtres
  async getTickets(params: {
    status?: TicketStatus[];
    priority?: string;
    category?: string;
    assignedTo?: string;
    page?: number;
    limit?: number;
  }): Promise<{ tickets: Ticket[]; total: number }> {
    const response = await api.get("/tickets", { params });
    return response.data;
  },

  // Récupération d'un ticket spécifique
  async getTicketById(id: string): Promise<Ticket> {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },

  // Mise à jour du statut
  async updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket> {
    const response = await api.patch(`/tickets/${id}/status`, { status });
    return response.data;
  },

  // Assignation d'un ticket
  async assignTicket(id: string, userId: string): Promise<Ticket> {
    const response = await api.patch(`/tickets/${id}/assign`, { userId });
    return response.data;
  },

  // Ajout d'un commentaire
  async addComment(
    ticketId: string,
    comment: Partial<Comment>
  ): Promise<Comment> {
    const response = await api.post(`/tickets/${ticketId}/comments`, comment);
    return response.data;
  },

  // Upload de pièces jointes
  async uploadAttachments(
    ticketId: string,
    files: File[]
  ): Promise<Attachment[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await api.post(
      `/tickets/${ticketId}/attachments`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  // Réouverture d'un ticket
  async reopenTicket(id: string, reason: string): Promise<Ticket> {
    const response = await api.post(`/tickets/${id}/reopen`, { reason });
    return response.data;
  },

  // Escalade d'un ticket
  async escalateTicket(
    id: string,
    reason: string,
    toUserId: string
  ): Promise<Ticket> {
    const response = await api.post(`/tickets/${id}/escalate`, {
      reason,
      toUserId,
    });
    return response.data;
  },
};
