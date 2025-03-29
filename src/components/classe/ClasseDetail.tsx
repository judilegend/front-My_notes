import React from "react";
import { Classe } from "@/types/classe";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen, GraduationCap, School, Users } from "lucide-react";

type ClasseDetailProps = {
  classe: Classe;
};

export function ClasseDetail({ classe }: ClasseDetailProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-primary">
          Voir détails
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <School className="mr-2 h-5 w-5" />
            Détails de la classe
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-4 p-4 bg-primary/10 rounded-md">
            <GraduationCap className="h-10 w-10 text-primary" />
            <div>
              <h3 className="font-bold text-lg">{classe.mention}</h3>
              <p className="text-sm text-muted-foreground">Mention</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <div className="flex items-center mb-2">
                <BookOpen className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm font-medium">Parcours</span>
              </div>
              <p className="text-sm">{classe.parcours}</p>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex items-center mb-2">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm font-medium">Niveau</span>
              </div>
              <p className="text-sm">{classe.niveau}</p>
            </div>
          </div>

          <div className="p-4 border rounded-md">
            <h4 className="text-sm font-medium mb-2">
              Informations supplémentaires
            </h4>
            <p className="text-sm text-muted-foreground">
              Cette classe fait partie de la mention {classe.mention} et propose
              le parcours {classe.parcours}
              pour les étudiants de niveau {classe.niveau}.
            </p>
          </div>
        </div>
        <CardFooter className="flex justify-end">
          <DialogTrigger asChild>
            <Button variant="outline">Fermer</Button>
          </DialogTrigger>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
}
