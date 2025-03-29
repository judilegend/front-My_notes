import React from "react";
import { ClasseCard } from "./ClasseCard";
import { Classe } from "@/types/classe";

type ClasseGroupProps = {
  title: string;
  classes: Classe[];
  onEdit: (classe: Classe) => void;
  onDelete: (id: number) => void;
};

export function ClasseGroup({
  title,
  classes,
  onEdit,
  onDelete,
}: ClasseGroupProps) {
  if (classes.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classe) => (
          <ClasseCard
            key={classe.id}
            classe={classe}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
