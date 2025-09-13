import axios from "axios";

export async function addIncome(incomeData) {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("https://tracker-h7ju.onrender.com/api/Transaction/add", incomeData, config);
}
