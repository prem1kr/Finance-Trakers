import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
        setError(null);
      } catch (err) {
        const msg = err.response?.data?.message || err.message || "Failed to fetch user";
        setError(msg);
        setUser(null);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, setUser, loading, error }; 
}
