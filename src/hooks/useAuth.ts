import axios from "axios";
//types user

export interface User {
  id: string;
  username: string;
  role: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
  //   im: string;
  //   role: string;
}

export interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  im: string;
  password: string;
  role: string;
}

const API_URL = "http://127.0.0.1:5000/api";

const useAuthService = () => {
  //login user
  const login = async (
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email: credentials.email, // Adapter le nom du champ selon l'API
        password: credentials.password,
      });

      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  //register user

  const register = async (
    data: RegisterData
  ): Promise<{ user: User; token: string }> => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        im: data.im,
        password: data.password,
        role: data.role || "ETUDIANT",
      });
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  //user profile
  const getUserProfile = async (token: string): Promise<User> => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Get user profile error:", error);
      throw error;
    }
  };

  //return login et register function
  return {
    login,
    register,
    getUserProfile,
  };
};

export default useAuthService;
