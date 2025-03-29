import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Classe } from "@/types/classe";
import { motion } from "framer-motion";
import { ClasseDetail } from "./ClasseDetail";

type ClasseCardProps = {
  classe: Classe;
  onEdit: (classe: Classe) => void;
  onDelete: (id: number) => void;
};

export function ClasseCard({ classe, onEdit, onDelete }: ClasseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{classe.mention}</CardTitle>
          <CardDescription>{classe.parcours}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center bg-primary/10 py-2 rounded-md">
            <span className="font-medium text-primary">{classe.niveau}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(classe)}>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <ClasseDetail classe={classe} />
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(classe.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
