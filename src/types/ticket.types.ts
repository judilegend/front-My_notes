export type UserRole =
  | "client"
  | "agent"
  | "supervisor"
  | "admin"
  | "developer"
  | "guest";

export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketStatus =
  | "new"
  | "open"
  | "in_progress"
  | "pending"
  | "resolved"
  | "closed"
  | "reopened";
export type TicketCategory =
  | "hardware"
  | "software"
  | "network"
  | "security"
  | "other";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  assignedTo?: string;
  attachments: Attachment[];
  comments: Comment[];
  history: TicketHistory[];
  dueDate?: Date;
  resolution?: string;
  isUrgent: boolean;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  attachments: Attachment[];
  isInternal: boolean;
}

export interface TicketHistory {
  id: string;
  action: string;
  timestamp: Date;
  performedBy: string;
  previousValue?: string;
  newValue?: string;
  note?: string;
}
