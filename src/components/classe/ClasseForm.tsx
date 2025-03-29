import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Classe } from "@/types/classe";

// Définition des mentions et parcours disponibles
const MENTIONS_PARCOURS = {
  "Intelligence Artificielle": ["GID", "OCC", "MDI"],
  Informatique: ["GB", "IG", "ASR"],
};

const formSchema = z.object({
  mention: z
    .string()
    .min(2, { message: "La mention doit contenir au moins 2 caractères" }),
  parcours: z
    .string()
    .min(2, { message: "Le parcours doit contenir au moins 2 caractères" }),
  niveau: z.string().min(1, { message: "Le niveau est requis" }),
});

type ClasseFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialData?: Classe;
  isEditing?: boolean;
};

export function ClasseForm({
  onSubmit,
  initialData,
  isEditing = false,
}: ClasseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      mention: "",
      parcours: "",
      niveau: "",
    },
  });

  const [availableParcours, setAvailableParcours] = useState<string[]>([]);
  const selectedMention = form.watch("mention");

  // Mettre à jour les parcours disponibles lorsque la mention change
  useEffect(() => {
    if (
      selectedMention &&
      MENTIONS_PARCOURS[selectedMention as keyof typeof MENTIONS_PARCOURS]
    ) {
      setAvailableParcours(
        MENTIONS_PARCOURS[selectedMention as keyof typeof MENTIONS_PARCOURS]
      );

      // Si le parcours actuel n'est pas dans la liste des parcours disponibles, le réinitialiser
      const currentParcours = form.getValues("parcours");
      if (
        currentParcours &&
        !MENTIONS_PARCOURS[
          selectedMention as keyof typeof MENTIONS_PARCOURS
        ].includes(currentParcours)
      ) {
        form.setValue("parcours", "");
      }
    } else {
      setAvailableParcours([]);
    }
  }, [selectedMention, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
    if (!isEditing) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="mention"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mention</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une mention" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Intelligence Artificielle">
                    Intelligence Artificielle
                  </SelectItem>
                  <SelectItem value="Informatique">Informatique</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parcours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parcours</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedMention}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedMention
                          ? "Sélectionner un parcours"
                          : "Sélectionnez d'abord une mention"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableParcours.map((parcours) => (
                    <SelectItem key={parcours} value={parcours}>
                      {parcours}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="niveau"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="L1">Licence 1</SelectItem>
                  <SelectItem value="L2">Licence 2</SelectItem>
                  <SelectItem value="L3">Licence 3</SelectItem>
                  <SelectItem value="M1">Master 1</SelectItem>
                  <SelectItem value="M2">Master 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Modifier la classe" : "Ajouter la classe"}
        </Button>
      </form>
    </Form>
  );
}
