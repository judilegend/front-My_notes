import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";

// import { Search } from "lucide-react";

// Définition des mentions et parcours disponibles
const MENTIONS_PARCOURS = {
  "Intelligence Artificielle": ["GID", "OCC", "MDI"],
  Informatique: ["GB", "IG", "ASR"],
};

type ClasseFilterProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMention: string;
  onMentionChange: (value: string) => void;
  selectedParcours: string;
  onParcoursChange: (value: string) => void;
  mentions: string[];
};

export function ClasseFilter({
  // searchTerm,
  // onSearchChange,
  selectedMention,
  onParcoursChange,
}: ClasseFilterProps) {
  // Liste des parcours disponibles pour la mention sélectionnée
  const [, setAvailableParcours] = useState<string[]>([]);

  // Mettre à jour les parcours disponibles lorsque la mention change
  useEffect(() => {
    if (
      selectedMention &&
      MENTIONS_PARCOURS[selectedMention as keyof typeof MENTIONS_PARCOURS]
    ) {
      setAvailableParcours(
        MENTIONS_PARCOURS[selectedMention as keyof typeof MENTIONS_PARCOURS]
      );
    } else {
      setAvailableParcours([]);
    }
    // Réinitialiser le parcours sélectionné si la mention change
    onParcoursChange("");
  }, [selectedMention, onParcoursChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        /> */}
      </div>

      <div className="w-full md:w-64">
        {/* <Select value={selectedMention} onValueChange={onMentionChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrer par mention" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes les mentions</SelectItem>
            <SelectItem value="Intelligence Artificielle">
              Intelligence Artificielle
            </SelectItem>
            <SelectItem value="Informatique">Informatique</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* {selectedMention && (
        <div className="w-full md:w-64">
          <Select value={selectedParcours} onValueChange={onParcoursChange}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrer par parcours" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les parcours</SelectItem>
              {availableParcours.map((parcours) => (
                <SelectItem key={parcours} value={parcours}>
                  {parcours}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )} */}
    </div>
  );
}
