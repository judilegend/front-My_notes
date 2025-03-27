import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthService from "../hooks/useAuth";

// Types
export interface User {
  id: string;
  username: string; // Correspond au champ username dans l'API
  name?: string; // Information supplémentaire pour l'UI
  lastname?: string; // Information supplémentaire pour l'UI
  im?: string; // Numéro d'immatriculation
  role: string; // Rôle de l'utilisateur (ADMIN, ENSEIGNANT, ETUDIANT)
  avatar?: string; // Généré côté client
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string; // Sera mappé à username pour l'API
  password: string;
}

interface RegisterData {
  name: string;
  lastname: string;
  email: string; // Sera mappé à username pour l'API
  im: string;
  password: string;
  password_confirmation: string;
  role: string;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const authService = useAuthService();

  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Vérifier le token au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          // Récupérer le profil utilisateur avec le token
          const userProfile = await authService.getUserProfile(token);

          // Ajouter l'avatar généré côté client
          const user: User = {
            ...userProfile,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.username}`,
          };

          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          console.error("Erreur lors de la vérification du token", error);
        }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // Adapter les données pour correspondre à ce que l'API attend
      const apiCredentials = {
        email: credentials.email,
        password: credentials.password,
      };

      const { user, token } = await authService.login(apiCredentials);

      // Ajouter l'avatar généré côté client
      const enhancedUser: User = {
        ...user,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      };

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(enhancedUser));

      setState({
        user: enhancedUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      // Adapter les données pour correspondre à ce que l'API attend
      const apiRegisterData = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        im: data.im,
        password: data.password,
        role: data.role || "ETUDIANT",
      };

      const { user, token } = await authService.register(apiRegisterData);

      // Ajouter l'avatar généré côté client
      const enhancedUser: User = {
        ...user,
        name: data.name,
        lastname: data.lastname,
        im: data.im,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      };

      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(enhancedUser));

      setState({
        user: enhancedUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate("/login");
  };

  const updateProfile = async (data: Partial<User>) => {
    // Note: Cette fonction devrait être mise à jour pour appeler une API réelle
    // quand elle sera disponible dans le backend
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...state.user, ...data } as User;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setState((prev) => ({
          ...prev,
          user: updatedUser,
        }));
        resolve();
      }, 1000);
    });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  };

  if (state.isLoading) {
    return <div>Loading...</div>; // Vous pouvez remplacer par un composant de loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
