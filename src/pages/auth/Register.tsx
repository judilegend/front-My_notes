import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import InputField from "@/components/auth/InputField";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/Logo";
import { Loader2, User, Mail, Lock, Hash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    lastname: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    im: z.string().min(1, "Le numéro matricule est requis"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    password_confirmation: z.string(),
    role: z.enum(["ADMIN", "ENSEIGNANT", "ETUDIANT"]).default("ETUDIANT"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });

// Définition des types TypeScript pour le formulaire
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "ETUDIANT",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError("");
      await registerUser({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        im: data.im,
        password: data.password,
        password_confirmation: data.password_confirmation,
        role: data.role,
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(
        // err.response?.data?.message ||
        //   err.message ||
        "Une erreur est survenue lors de l'inscription"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setValue("role", value as "ADMIN" | "ENSEIGNANT" | "ETUDIANT");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-2">
          <Logo />
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-gray-600">
            Rejoignez My-notes pour consulter votre résultat du cours en ligne
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-lg shadow-xl rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 p-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}
            <div>
              {/* Nom */}
              <InputField
                label="Nom"
                icon={User}
                register={register("name")}
                error={errors?.name}
                placeholder="John"
              />

              {/* Prénom */}
              <InputField
                label="Prénom"
                icon={User}
                register={register("lastname")}
                error={errors.lastname}
                placeholder="Doe"
              />
            </div>
            <div>
              {/* Email */}
              <InputField
                label="Email"
                icon={Mail}
                register={register("email")}
                error={errors.email}
                placeholder="vous@exemple.com"
                type="email"
              />

              {/* Numéro matricule */}
              <InputField
                label="Numéro matricule"
                icon={Hash}
                register={register("im")}
                error={errors.im}
                placeholder="123456"
              />
            </div>

            <div>
              {/* Mot de passe */}
              <InputField
                label="Mot de passe"
                icon={Lock}
                register={register("password")}
                error={errors.password}
                placeholder="••••••••"
                type="password"
              />

              {/* Confirmation mot de passe */}
              <InputField
                label="Confirmer le mot de passe"
                icon={Lock}
                register={register("password_confirmation")}
                error={errors.password_confirmation}
                placeholder="••••••••"
                type="password"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="role">Rôle</Label>
              <Select defaultValue="ETUDIANT" onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETUDIANT">Étudiant</SelectItem>
                  <SelectItem value="ENSEIGNANT">Enseignant</SelectItem>
                  <SelectItem value="ADMIN">Administrateur</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" />
                  Création du compte...
                </div>
              ) : (
                "Créer un compte"
              )}
            </Button>
          </form>
        </Card>

        <p className="mt-8 text-center text-sm text-gray-600">
          Déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Se connecter
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
