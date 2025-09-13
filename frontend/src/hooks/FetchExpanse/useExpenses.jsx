import { useState, useEffect } from "react";
import axios from "axios";
import iconMap from "../../utils/iconMap/iconMap.jsx";
import { FaSuitcase } from "react-icons/fa";
import toast from "react-hot-toast";

// Colorful default icon
const colorfulDefault = () => <FaSuitcase className="text-[#A67C52] text-xl" />;

function getBestIcon(txn) {
  if (txn.icon && txn.icon.length && /\p{Extended_Pictographic}/u.test(txn.icon)) {
    return <span className="text-2xl">{txn.icon}</span>;
  }
  if (txn.icon && iconMap[txn.icon.toLowerCase()]) {
    return iconMap[txn.icon.toLowerCase()]();
  }
  if (txn.category && iconMap[txn.category.toLowerCase()]) {
    return iconMap[txn.category.toLowerCase()]();
  }
  if (txn.title && iconMap[txn.title.toLowerCase()]) {
    return iconMap[txn.title.toLowerCase()]();
  }
  return colorfulDefault();
}

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/Transaction/get?type=expense",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const expenseTransactions = res.data.data || [];

      const mappedExpenses = expenseTransactions.map((txn) => ({
        ...txn,
        iconComponent: getBestIcon(txn),
        dateFormatted: new Date(txn.date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));

      setExpenses(mappedExpenses);

      const chart = expenseTransactions.map((txn) => ({
        label: new Date(txn.date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        }),
        value: txn.amount,
        category: txn.category || txn.title || "Unknown",
      }));

      setChartData(chart);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      toast.error("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, chartData, fetchExpenses };
}
