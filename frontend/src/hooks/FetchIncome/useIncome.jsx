import { useState, useEffect } from "react";
import axios from "axios";
import iconMap from "../../utils/iconMap/iconMap.jsx";
import { FaSuitcase } from "react-icons/fa";
import toast from "react-hot-toast";

const colorfulDefault = () => <FaSuitcase className="text-[#A67C52] text-xl" />;

function getBestIcon(txn) {
  if (txn.icon && txn.icon.length && /\p{Extended_Pictographic}/u.test(txn.icon)) {
    return <span className="text-2xl">{txn.icon}</span>;
  }
  if (txn.icon && iconMap[txn.icon.toLowerCase()]) {
    return iconMap[txn.icon.toLowerCase()]();
  }
  if (txn.title && iconMap[txn.title.toLowerCase()]) {
    return iconMap[txn.title.toLowerCase()]();
  }
  return colorfulDefault();
}

export default function useIncomeData() {
  const [sources, setSources] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchIncomeData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://tracker-h7ju.onrender.com/api/Transaction/get?type=income",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const incomeTransactions = res.data.data || [];

      const mappedSources = incomeTransactions.map((txn) => ({
        _id: txn._id, // Add backend ID here for edit/delete operations
        name: txn.title,
        icon: getBestIcon(txn),
        date: new Date(txn.date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        amount: txn.amount,
        bg: "bg-gray-100 dark:bg-gray-700",
        category: txn.category || "",
        note: txn.note || "",
        // add any other fields needed for your UI or edit/delete
      }));

      setSources(mappedSources);

      const mappedChartData = incomeTransactions.map((txn) => ({
        label: new Date(txn.date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        }),
        value: txn.amount,
      }));

      setChartData(mappedChartData);
    } catch (err) {
      console.error("Failed to fetch income data:", err);
      toast.error("Failed to fetch income data");
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, []);

  return { sources, chartData, fetchIncomeData };
}
