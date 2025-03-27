import { useState } from "react";
import { TicketComments } from "./TicketComments";
import { TicketHistory } from "./TicketHistory";
import { TicketAttachments } from "./TicketAttachments";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  AlertCircle,
  MessageSquare,
  Paperclip,
  History,
} from "lucide-react";
import type { Ticket } from "@/types/ticket.types";

interface TicketDetailProps {
  ticket: Ticket;
  onStatusChange: (status: string) => void;
  onAddComment: (comment: string) => void;
}

export function TicketDetail({
  ticket,
  onStatusChange,
  onAddComment,
}: TicketDetailProps) {
  const [activeTab, setActiveTab] = useState<
    "comments" | "history" | "attachments"
  >("comments");

  const tabs = [
    { id: "comments", label: "Commentaires", icon: MessageSquare },
    { id: "history", label: "Historique", icon: History },
    { id: "attachments", label: "Pièces jointes", icon: Paperclip },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
            <p className="text-gray-600 mt-2">{ticket.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                ticket.priority === "urgent"
                  ? "bg-red-100 text-red-800"
                  : ticket.priority === "high"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {ticket.priority}
            </span>
            <select
              value={ticket.status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="form-select"
            >
              <option value="open">Ouvert</option>
              <option value="in_progress">En cours</option>
              <option value="pending">En attente</option>
              <option value="resolved">Résolu</option>
              <option value="closed">Fermé</option>
            </select>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          <div className="mt-6">
            {activeTab === "comments" && (
              <TicketComments
                comments={ticket.comments}
                onAddComment={onAddComment}
              />
            )}
            {activeTab === "history" && (
              <TicketHistory history={ticket.history} />
            )}
            {activeTab === "attachments" && (
              <TicketAttachments attachments={ticket.attachments} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
