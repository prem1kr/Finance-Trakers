import axios from "axios";

export async function addExpense(expenseData) {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(
    "https://tracker-h7ju.onrender.com/api/Transaction/add",
    expenseData,
    config
  );

  return response;
}
