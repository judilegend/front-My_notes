import React from "react";
import { Classe } from "@/types/classe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, School } from "lucide-react";

type ClasseStatsProps = {
  classes: Classe[];
};

export function ClasseStats({ classes }: ClasseStatsProps) {
  // Calculer les statistiques
  const totalClasses = classes.length;
  const uniqueMentions = new Set(classes.map((c) => c.mention)).size;
  const uniqueParcours = new Set(classes.map((c) => c.parcours)).size;

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <Card className="bg-[#EBD18D] z-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total des Classes
          </CardTitle>
          <School className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClasses}</div>
        </CardContent>
      </Card>

      <Card className="bg-[#af40ff] z-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mentions</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueMentions}</div>
        </CardContent>
      </Card>

      <Card className="bg-[#00ddeb] z-10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Parcours</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueParcours}</div>
        </CardContent>
      </Card>
    </div>
  );
}
