import { useCallback } from "react";

export function useTransactionApi() {
  const token = localStorage.getItem("token");

  const editTransaction = useCallback(async (id, updatedData) => {
    if (!token) throw new Error("No token found");
    const response = await fetch(`http://localhost:5000/api/Transaction/edit/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to edit transaction");
    }
    return response.json();
  }, [token]);

  const deleteTransaction = useCallback(async (id) => {
    if (!token) throw new Error("No token found");
    const response = await fetch(`http://localhost:5000/api/Transaction/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete transaction");
    }
    return response.json();
  }, [token]);

  return { editTransaction, deleteTransaction };
}
