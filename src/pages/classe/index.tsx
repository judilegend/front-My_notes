import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ClasseForm } from "@/components/classe/ClasseForm";
import { ClasseGroup } from "@/components/classe/ClasseGroup";
import { ClasseStats } from "@/components/classe/ClasseStats";
import { ClasseFilter } from "@/components/classe/ClasseFilter";
import { ClasseParcoursList } from "@/components/classe/ClasseParcoursList";
import { Classe } from "@/types/classe";
import { classeService } from "@/services/classeService";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, School } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteClasseDialog } from "@/components/classe/DeleteClasseDialog";

const ClassePage = () => {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClasse, setEditingClasse] = useState<Classe | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMention, setSelectedMention] = useState("");
  const [activeTab, setActiveTab] = useState("classes");
  const { toast } = useToast();

  const [selectedParcours, setSelectedParcours] = useState("");

  const navigate = useNavigate();
  //delete classe
  const [classeToDelete, setClasseToDelete] = useState<Classe | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Modifiez la fonction handleDeleteClasse
  // const handleDeleteClasse = async (id: number) => {
  //   const classeToDelete = classes.find((c) => c.id === id);
  //   if (classeToDelete) {
  //     setClasseToDelete(classeToDelete);
  //     setIsDeleteDialogOpen(true);
  //   }
  // };

  const confirmDeleteClasse = async () => {
    if (!classeToDelete) return;

    try {
      await classeService.deleteClasse(classeToDelete.id);
      setClasses(classes.filter((c) => c.id !== classeToDelete.id));
      toast({
        title: "Succès",
        description: "Classe supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la classe",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setIsDeleteDialogOpen(false);
      setClasseToDelete(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page",
        variant: "destructive",
      });
      navigate("/login"); // Assurez-vous que cette route existe
      return;
    }
    console.log(token);
    fetchClasses();
  }, []);
  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const data = await classeService.getAllClasses();
      setClasses(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les classes",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClasse = async (data: Omit<Classe, "id">) => {
    try {
      const newClasse = await classeService.createClasse(data);
      setClasses([...classes, newClasse]);
      setIsDialogOpen(false);
      toast({
        title: "Succès",
        description: "Classe ajoutée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la classe",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const handleEditClasse = (classe: Classe) => {
    setEditingClasse(classe);
    setIsDialogOpen(true);
  };

  const handleUpdateClasse = async (data: Omit<Classe, "id">) => {
    if (!editingClasse) return;

    try {
      const updatedClasse = await classeService.updateClasse(
        editingClasse.id,
        data
      );
      setClasses(
        classes.map((c) => (c.id === editingClasse.id ? updatedClasse : c))
      );
      setIsDialogOpen(false);
      setEditingClasse(null);
      toast({
        title: "Succès",
        description: "Classe mise à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la classe",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  const handleDeleteClasse = async (id: number) => {
    try {
      await classeService.deleteClasse(id);
      setClasses(classes.filter((c) => c.id !== id));
      toast({
        title: "Succès",
        description: "Classe supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la classe",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  // Filtrer les classes
  const filteredClasses = classes.filter((classe) => {
    const matchesMention = selectedMention
      ? classe.mention === selectedMention
      : true;
    const matchesParcours = selectedParcours
      ? classe.parcours === selectedParcours
      : true;
    const matchesSearch = searchTerm
      ? classe.parcours.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classe.mention.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesMention && matchesParcours && matchesSearch;
  });
  // Extraire les mentions uniques pour le filtre
  const uniqueMentions = Array.from(new Set(classes.map((c) => c.mention)));

  // Grouper les classes par mention
  const classesByMention = filteredClasses.reduce((acc, classe) => {
    if (!acc[classe.mention]) {
      acc[classe.mention] = [];
    }
    acc[classe.mention].push(classe);
    return acc;
  }, {} as Record<string, Classe[]>);

  return (
    <DashboardLayout>
      <div className="h-full mx-auto ">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold flex items-center">
              <School className="mr-2 h-8 w-8 text-primary" />
              Gestion des Classes
            </h1>
            <p className="text-muted-foreground mt-2">
              Gérez les mentions, parcours et niveaux disponibles pour les
              étudiants
            </p>
          </motion.div>

          <Button
            onClick={() => {
              setEditingClasse(null);
              setIsDialogOpen(true);
            }}
            className="flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une classe
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Statistiques */}
            {classes.length > 0 && <ClasseStats classes={classes} />}

            {classes.length > 0 && (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-8"
              >
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                  <TabsTrigger value="classes">Classes</TabsTrigger>
                  <TabsTrigger value="parcours">
                    Parcours disponibles
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="classes" className="mt-0">
                  {/* Filtres */}
                  <ClasseFilter
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedMention={selectedMention}
                    onMentionChange={setSelectedMention}
                    selectedParcours={selectedParcours}
                    onParcoursChange={setSelectedParcours}
                    mentions={uniqueMentions}
                  />

                  {Object.keys(classesByMention).length === 0 ? (
                    <div className="text-center py-12 bg-muted/50 rounded-lg">
                      <School className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-xl font-medium">
                        {classes.length === 0
                          ? "Aucune classe disponible"
                          : "Aucune classe ne correspond aux critères de recherche"}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {classes.length === 0
                          ? "Commencez par ajouter une nouvelle classe en cliquant sur le bouton ci-dessus"
                          : "Essayez de modifier vos filtres pour voir plus de résultats"}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {Object.entries(classesByMention).map(
                        ([mention, classesList]) => (
                          <ClasseGroup
                            key={mention}
                            title={mention}
                            classes={classesList}
                            onEdit={handleEditClasse}
                            onDelete={handleDeleteClasse}
                          />
                        )
                      )}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="parcours" className="mt-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      Parcours par Mention
                    </h2>
                    <p className="text-muted-foreground">
                      Aperçu des différents parcours disponibles pour chaque
                      mention
                    </p>
                  </div>
                  <ClasseParcoursList classes={classes} />
                </TabsContent>
              </Tabs>
            )}

            {classes.length === 0 && (
              <div className="text-center py-12 bg-muted/50 rounded-lg">
                <School className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-medium">
                  Aucune classe disponible
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Commencez par ajouter une nouvelle classe en cliquant sur le
                  bouton ci-dessus
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingClasse
                ? "Modifier une classe"
                : "Ajouter une nouvelle classe"}
            </DialogTitle>
          </DialogHeader>
          <ClasseForm
            onSubmit={editingClasse ? handleUpdateClasse : handleAddClasse}
            initialData={editingClasse || undefined}
            isEditing={!!editingClasse}
          />
        </DialogContent>
      </Dialog>
      <DeleteClasseDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteClasse}
        classeName={
          classeToDelete
            ? `${classeToDelete.mention} - ${classeToDelete.parcours}`
            : ""
        }
      />
    </DashboardLayout>
  );
};

export default ClassePage;
