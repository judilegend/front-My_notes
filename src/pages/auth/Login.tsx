import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/Logo";
import { Loader2, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

// Définition du schéma de validation
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

// Type pour les données du formulaire
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError("");

      // Appel de la fonction login avec les données du formulaire
      await login({
        email: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (err) {
      // Gestion des erreurs avec typage approprié
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Erreur de connexion au serveur"
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue s'est produite");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Logo />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Bienvenue
          </h2>
          <p className="mt-2 text-gray-600">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-lg shadow-xl rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 p-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  {...register("email")}
                  type="email"
                  className="pl-10"
                  placeholder="vous@exemple.com"
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  {...register("password")}
                  type="password"
                  className="pl-10"
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Se souvenir de moi
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Ou continuez avec
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full" type="button">
                <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <img src="/github.svg" alt="GitHub" className="h-5 w-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </Card>

        <p className="mt-8 text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            Créer un compte
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
