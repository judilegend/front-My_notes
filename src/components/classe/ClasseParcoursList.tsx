import React from "react";
import { Classe } from "@/types/classe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

type ClasseParcoursListProps = {
  classes: Classe[];
};

export function ClasseParcoursList({ classes }: ClasseParcoursListProps) {
  // Organiser les parcours par mention
  const parcoursByMention = classes.reduce((acc, classe) => {
    if (!acc[classe.mention]) {
      acc[classe.mention] = new Set<string>();
    }
    acc[classe.mention].add(classe.parcours);
    return acc;
  }, {} as Record<string, Set<string>>);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {Object.entries(parcoursByMention).map(([mention, parcours]) => (
        <Card key={mention} className="overflow-hidden">
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center text-lg">
              <BookOpen className="mr-2 h-5 w-5" />
              {mention}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Parcours disponibles:
            </h4>
            <ul className="space-y-1">
              {Array.from(parcours).map((parcour) => (
                <li
                  key={parcour}
                  className="text-sm pl-2 border-l-2 border-primary"
                >
                  {parcour}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
