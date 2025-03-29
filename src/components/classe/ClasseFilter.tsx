import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

type ClasseFilterProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedMention: string;
  onMentionChange: (value: string) => void;
  mentions: string[];
};

export function ClasseFilter({
  searchTerm,
  onSearchChange,
  selectedMention,
  onMentionChange,
  mentions,
}: ClasseFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par parcours..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="w-full md:w-64">
        <Select value={selectedMention} onValueChange={onMentionChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrer par mention" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes les mentions</SelectItem>
            {mentions.map((mention) => (
              <SelectItem key={mention} value={mention}>
                {mention}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
