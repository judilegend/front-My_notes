import axios from "axios";
import { Classe } from "@/types/classe";

const API_URL = "http://localhost:5000/api/classes";

export const classeService = {
  async getAllClasses(): Promise<Classe[]> {
    const token = localStorage.getItem("auth_token");
    console.log(token);
    if (!token) {
      throw new Error(
        "Vous devez être connecté pour accéder à cette ressource"
      );
    }

    const response = await axios.get(API_URL + "/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.classes;
  },

  async createClasse(classeData: Omit<Classe, "id">): Promise<Classe> {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error(
        "Vous devez être connecté pour accéder à cette ressource"
      );
    }

    const response = await axios.post(API_URL + "/", classeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.classe;
  },

  async updateClasse(id: number, classeData: Partial<Classe>): Promise<Classe> {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error(
        "Vous devez être connecté pour accéder à cette ressource"
      );
    }

    const response = await axios.put(API_URL + `/${id}`, classeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.classe;
  },

  async deleteClasse(id: number): Promise<void> {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error(
        "Vous devez être connecté pour accéder à cette ressource"
      );
    }

    await axios.delete(API_URL + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
