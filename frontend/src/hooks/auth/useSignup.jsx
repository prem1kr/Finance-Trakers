import { useState } from "react";
import axios from "axios";

export default function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://tracker-h7ju.onrender.com/api/auth/signup", formData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  return { signup, loading, error };
}
