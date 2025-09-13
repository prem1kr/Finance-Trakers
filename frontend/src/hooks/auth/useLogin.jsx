import { useState } from "react";
import axios from "axios";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://tracker-h7ju.onrender.com/api/auth/login", formData);
      setLoading(false);
      return response.data; // contains token, user, etc.
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  return { login, loading, error };
}
