import { Card } from "../ui/card";
// import { BarChart } from "../ui/charts";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export function SatisfactionReport() {
  const handleExportReport = () => {
    // Implement export logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Satisfaction Client</h2>
        <Button onClick={handleExportReport}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Évaluation par Agent</h3>
          <div className="h-80">
            {/* <BarChart
              data={agentSatisfactionData}
              xAxis="agent"
              series={[{ name: "Satisfaction", key: "rating" }]}
            /> */}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Commentaires Récents</h3>
          <div className="space-y-4">
            {/* {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg mr-2">
                      {"★".repeat(feedback.rating)}
                    </span>
                    <span className="text-gray-500">{feedback.rating}/5</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{feedback.comment}</p>
              </div>
            ))} */}
          </div>
        </Card>
      </div>
    </div>
  );
}
