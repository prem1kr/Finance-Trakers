import axios from "axios";

export default function useLogout() {
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/"; // redirect after logout
    } catch (error) {
      console.error("Failed to logout:", error);
      // Optionally show notification here
    }
  };

  return { logout };
}
