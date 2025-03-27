import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { PerformanceStats } from "@/components/reporting/PerformanceStats";
import { SatisfactionChart } from "@/components/reporting/SatisfactionChart";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rapports & Analyses</h1>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="quarter">Ce trimestre</option>
          <option value="year">Cette année</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceStats />
        <SatisfactionChart />
      </div>
    </div>
  );
}
