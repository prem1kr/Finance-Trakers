import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://tracker-h7ju.onrender.com/api/Transaction/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data.data;
        setTransactions(data);

        let income = 0,
          expenses = 0;

        data.forEach((txn) => {
          if (txn.type === "income") income += txn.amount;
          else if (txn.type === "expense") expenses += txn.amount;
        });

        setSummary({
          totalIncome: income,
          totalExpenses: expenses,
          totalBalance: income - expenses,
        });
      } catch (error) {
        toast.error("Failed to load transactions");
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, summary };
}
