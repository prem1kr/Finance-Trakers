import axios from "axios";

export async function uploadUserAvatar(file) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const formData = new FormData();
  formData.append("avatar", file);

  const response = await axios.post(
    "https://tracker-h7ju.onrender.com/api/auth/upload-avatar",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
