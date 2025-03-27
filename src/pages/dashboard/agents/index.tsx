import { useState } from "react";
import { AgentList } from "@/components/agents/AgentList";
import { AgentStats } from "@/components/agents/AgentStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AgentsPage() {
  const [showAddAgent, setShowAddAgent] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Agents</h1>
        <Button
          onClick={() => setShowAddAgent(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter un Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AgentStats />
      </div>

      <AgentList />
    </div>
  );
}
