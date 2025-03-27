import { Card } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

const performanceData = [
  { month: "Jan", tickets: 45, responseTime: 2.3 },
  { month: "Feb", tickets: 52, responseTime: 2.1 },
  { month: "Mar", tickets: 61, responseTime: 1.9 },
  // Add more data
];

export function PerformanceStats() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Performance Mensuelle</h2>
        <div className="h-80">
          {/* <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#4F46E5" name="Tickets Résolus" />
            </BarChart>
          </ResponsiveContainer> */}
        </div>
      </Card>
    </div>
  );
}
