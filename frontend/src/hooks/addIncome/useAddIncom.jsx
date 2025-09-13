import axios from "axios";

export async function addIncome(incomeData) {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post("http://localhost:5000/api/Transaction/add", incomeData, config);
}
