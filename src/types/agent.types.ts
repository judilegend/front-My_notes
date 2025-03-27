export type AgentRole = "junior" | "senior" | "supervisor" | "admin";

export interface Agent {
  id: string;
  name: string;
  email: string;
  role: AgentRole;
  department: string;
  joinedAt: Date;
  isActive: boolean;
  performance: AgentPerformance;
}

export interface AgentPerformance {
  resolvedTickets: number;
  averageResponseTime: number; // in hours
  satisfactionRate: number; // 0-5
  urgentTicketsHandled: number;
  openTickets: number;
}
