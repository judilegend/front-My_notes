import { Ticket } from "@/types/ticket.types";

// Simulation de données
const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Problème d'imprimante",
    description: "L'imprimante ne répond plus aux demandes d'impression",
    priority: "high",
    status: "open",
    category: "hardware",
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: "user1",
    attachments: [],
    comments: [],
    history: [],
    isUrgent: false,
  },
  // Ajoutez d'autres tickets simulés ici
];

// Simulation d'API avec localStorage
export const api = {
  async get(url: string, config = {}) {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (url === "/tickets") {
      const tickets = JSON.parse(
        localStorage.getItem("tickets") || JSON.stringify(mockTickets)
      );
      return { data: { tickets, total: tickets.length } };
    }

    return { data: null };
  },

  async post(url: string, data: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (url === "/tickets") {
      const newTicket = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
        history: [],
      };

      const tickets = JSON.parse(
        localStorage.getItem("tickets") || JSON.stringify(mockTickets)
      );
      tickets.unshift(newTicket);
      localStorage.setItem("tickets", JSON.stringify(tickets));

      return { data: newTicket };
    }

    return { data: null };
  },

  async patch(url: string, data: any) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const tickets = JSON.parse(
      localStorage.getItem("tickets") || JSON.stringify(mockTickets)
    );
    const ticketId = url.split("/")[2];

    const updatedTickets = tickets.map((ticket: Ticket) =>
      ticket.id === ticketId
        ? { ...ticket, ...data, updatedAt: new Date() }
        : ticket
    );

    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    return { data: updatedTickets.find((t: Ticket) => t.id === ticketId) };
  },
};
