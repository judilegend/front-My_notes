import { Card } from "../ui/card";
import { BarChart, LineChart } from "../ui/charts";
import type { Agent } from "@/types/agent.types";

interface AgentDashboardProps {
  agent: Agent;
}

export function AgentDashboard({ agent }: AgentDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Tickets Résolus</h3>
          <p className="text-2xl font-semibold mt-1">
            {agent.performance.resolvedTickets}
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            Temps de Réponse Moyen
          </h3>
          <p className="text-2xl font-semibold mt-1">
            {agent.performance.averageResponseTime}h
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            Satisfaction Client
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-semibold">
              {agent.performance.satisfactionRate.toFixed(1)}
            </span>
            <span className="text-yellow-400 text-2xl ml-1">★</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Performance Hebdomadaire</h3>
          <div className="h-64">
            <LineChart
              data={weeklyPerformanceData}
              xAxis="date"
              series={[
                { name: "Tickets Résolus", key: "resolved" },
                { name: "Temps de Réponse", key: "responseTime" },
              ]}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Répartition des Tickets</h3>
          <div className="h-64">
            <BarChart
              data={ticketDistributionData}
              xAxis="category"
              series={[
                { name: "En cours", key: "open" },
                { name: "Résolus", key: "resolved" },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
