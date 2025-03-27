import { useState } from "react";
import { Table } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash2, UserPlus } from "lucide-react";
import type { Agent } from "@/types/agent.types";
import { AgentForm } from "./AgentForm";

export function AgentList() {
  const [showForm, setShowForm] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleEdit = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowForm(true);
  };

  const handleDelete = (agentId: string) => {
    // Implement delete logic
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Liste des Agents</h2>
        <Button onClick={() => setShowForm(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter un Agent
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Agent</th>
            <th>Rôle</th>
            <th>Performance</th>
            <th>Tickets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.name}`}
                  alt={agent.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-sm text-gray-500">{agent.email}</p>
                </div>
              </td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    agent.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : agent.role === "supervisor"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {agent.role}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {agent.performance.satisfactionRate.toFixed(1)}
                </div>
              </td>
              <td>
                <div className="text-sm">
                  <p>{agent.performance.resolvedTickets} résolus</p>
                  <p className="text-gray-500">
                    {agent.performance.openTickets} en cours
                  </p>
                </div>
              </td>
              <td>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(agent)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(agent.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <AgentForm
          agent={selectedAgent}
          onClose={() => {
            setShowForm(false);
            setSelectedAgent(null);
          }}
        />
      )}
    </div>
  );
}
