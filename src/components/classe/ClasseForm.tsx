import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
              <FormControl>
                <Input placeholder="Ex: Informatique" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="Ex: Développement Web" {...field} />
              </FormControl>
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
