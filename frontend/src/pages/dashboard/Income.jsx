import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaDownload } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";
import AddIncome from "../../components/Income/AddIncome.jsx";
import EditIncome from "../../components/editPage/edit.jsx";
import useIncomeData from "../../hooks/FetchIncome/useIncome.jsx";
import { useTransactionApi } from "../../hooks/edit-delete/useEdit-Delete.jsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const barColors = ["#8b5cf6", "#c4b5fd"];

export default function Income() {
  const { theme } = useTheme();
  const { sources, chartData, fetchIncomeData } = useIncomeData();
  const { editTransaction, deleteTransaction } = useTransactionApi();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);

  const handleAddSuccess = () => {
    fetchIncomeData();
    setShowAddModal(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Income Sources", 14, 22);

    const tableColumn = ["Name", "Date", "Amount"];
    const tableRows = sources.map((source) => [
      source.name,
      source.date,
      `$${source.amount.toLocaleString()}`,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [107, 33, 168] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("income_sources.pdf");
  };

  const openEditModal = (source) => {
    setSelectedSource(source);
    setEditModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const id = selectedSource._id || selectedSource.id;
      if (!id) throw new Error("No valid ID found for transaction");

      const isoDate = new Date(updatedData.date).toISOString();

      const payload = {
        icon: updatedData.iconKey || "default-icon",
        title: updatedData.name,
        amount: Number(updatedData.amount),
        date: isoDate,
        category: updatedData.category || "",
        note: updatedData.note || "",
        type: "income",
      };

      await editTransaction(id, payload);
      alert("Income source updated successfully!");
      setEditModalOpen(false);
      setSelectedSource(null);
      fetchIncomeData();
    } catch (error) {
      console.error("Update failed:", error);
      alert(`Failed to update income source: ${error.message}`);
    }
  };

  const handleEdit = (source) => {
    openEditModal(source);
  };

  const handleDelete = async (source) => {
    try {
      const id = source._id || source.id;
      if (!id) throw new Error("No valid ID found for transaction");

      await deleteTransaction(id);
      alert("Income source deleted successfully!");
      fetchIncomeData();
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`Failed to delete income source: ${error.message}`);
    }
  };

  return (
    <>
      <div className="space-y-8 bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen p-2 md:p-8">
        <div className="w-full rounded-xl shadow-lg bg-white dark:bg-gray-800 backdrop-blur-sm p-5 md:p-8 relative transition-colors duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-1 text-gray-900 dark:text-white">
                Income Overview
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                Track your earnings over time and analyze your income trends.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-purple-50 dark:bg-purple-900/60 hover:bg-purple-100 dark:hover:bg-purple-800 text-purple-600 dark:text-purple-300 rounded-lg px-4 py-2 text-sm font-medium shadow transition-all"
                onClick={() => setShowAddModal(true)}
              >
                + Add Income
              </button>
            </div>
          </div>
          <div className="w-full h-64 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                barCategoryGap="20%"
                margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
              >
                <XAxis
                  dataKey="label"
                  tick={{
                    fill: theme === "dark" ? "#94a3b8" : "#52525b",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, "dataMax + 5000"]}
                  tick={{
                    fill: theme === "dark" ? "#94a3b8" : "#52525b",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  wrapperClassName="!rounded-lg !shadow-lg !text-xs"
                  contentStyle={{
                    background: theme === "dark" ? "#111827ed" : "#fff",
                    color: theme === "dark" ? "#fff" : "#333",
                    borderRadius: "0.75rem",
                    border: "none",
                  }}
                  labelStyle={{ color: "#7c3aed", fontWeight: "bold" }}
                  cursor={{
                    fill: theme === "dark" ? "#3b0764" : "#ede9fe",
                    opacity: 0.32,
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[10, 10, 0, 0]}
                  isAnimationActive
                  animationDuration={900}
                >
                  {chartData.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={barColors[idx % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full rounded-xl shadow-[0_8px_40px_rgba(80,40,160,0.18)] bg-white dark:bg-gray-800 backdrop-blur-sm p-5 md:p-8 transition-colors duration-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              Income Sources
            </h2>
            <button
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg px-3 py-2 text-sm font-medium shadow transition-all flex items-center"
              onClick={downloadPDF}
            >
              <FaDownload className="mr-2" />
              Download
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
            {sources.map((src, idx) => (
              <div
                key={idx}
                className={`group relative flex items-center justify-between ${src.bg} bg-opacity-70 dark:bg-opacity-50 rounded-lg px-2 py-3 shadow transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:bg-opacity-80 hover:shadow-lg hover:scale-[1.025] cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <span className="p-2 rounded-full text-xl bg-white/80 dark:bg-gray-900/80">
                    {src.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {src.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {src.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-green-500 dark:text-green-400 font-bold text-base">
                    + ${src.amount.toLocaleString()}
                  </span>

                  <div className="opacity-0 group-hover:opacity-100 flex space-x-2 ml-4 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(src)}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-600"
                      aria-label="Edit Income Source"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(src)}
                      className="text-gray-600 dark:text-gray-300 hover:text-red-600"
                      aria-label="Delete Income Source"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAddModal && <AddIncome onClose={handleAddSuccess} />}
      </div>

      {editModalOpen && selectedSource && (
        <EditIncome
          source={selectedSource}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedSource(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
