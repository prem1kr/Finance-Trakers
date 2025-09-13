import axios from "axios";

export async function addExpense(expenseData) {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(
    "http://localhost:5000/api/Transaction/add",
    expenseData,
    config
  );

  return response;
}
