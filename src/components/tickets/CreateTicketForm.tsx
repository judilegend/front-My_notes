import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, AlertCircle } from "lucide-react";
import type { TicketPriority, TicketCategory } from "@/types/ticket";

const ticketSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  description: z
    .string()
    .min(20, "La description doit contenir au moins 20 caractères"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.enum(["hardware", "software", "network", "other"]),
});

export function CreateTicketForm() {
  const [attachments, setAttachments] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    attachments.forEach((file) => formData.append("attachments", file));

    // TODO: Implement API call
    console.log(formData);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Créer un nouveau ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Titre</label>
          <Input
            {...register("title")}
            placeholder="Décrivez brièvement votre problème"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            {...register("description")}
            rows={5}
            placeholder="Décrivez en détail votre problème..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Priorité</label>
            <Select {...register("priority")}>
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
              <option value="urgent">Urgente</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Catégorie</label>
            <Select {...register("category")}>
              <option value="hardware">Matériel</option>
              <option value="software">Logiciel</option>
              <option value="network">Réseau</option>
              <option value="other">Autre</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Pièces jointes
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              onChange={(e) => setAttachments(Array.from(e.target.files || []))}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400" />
              <span className="mt-2 text-sm text-gray-600">
                Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
              </span>
            </label>
          </div>
          {attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                {attachments.length} fichier(s) sélectionné(s)
              </p>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Créer le ticket
        </Button>
      </form>
    </Card>
  );
}
