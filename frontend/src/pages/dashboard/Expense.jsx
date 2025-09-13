import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { FaDownload } from "react-icons/fa";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";
import AddExpense from "../../components/expanses/AddExpances.jsx";
import EditExpense from "../../components/editPage/edit.jsx"; 
import useExpenses from "../../hooks/FetchExpanse/useExpenses.jsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTransactionApi } from "../../hooks/edit-delete/useEdit-Delete.jsx";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
        <p className="font-semibold text-gray-900 dark:text-white">{payload[0].payload.category}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-purple-600 dark:text-purple-400 font-bold">Amount: ${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const Expense = () => {
  const { theme } = useTheme();
  const { expenses, chartData, fetchExpenses } = useExpenses();
  const { editTransaction, deleteTransaction } = useTransactionApi();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleAddSuccess = () => {
    fetchExpenses();
    setShowAddModal(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense List", 14, 22);
    const tableColumn = ["Category/Title", "Date", "Amount"];
    const tableRows = expenses.map((exp) => [
      exp.category || exp.title,
      exp.dateFormatted,
      `$${exp.amount.toLocaleString()}`,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [139, 92, 246] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    doc.save("expense_list.pdf");
  };

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const id = selectedExpense._id || selectedExpense.id;
      if (!id) throw new Error("No valid ID found for transaction");

      const isoDate = new Date(updatedData.date).toISOString();

      const payload = {
        icon: updatedData.iconKey || "default-icon",
        title: updatedData.name,
        amount: Number(updatedData.amount),
        date: isoDate,
        category: updatedData.category || "",
        note: updatedData.note || "",
        type: "expense",
      };

      await editTransaction(id, payload);
      alert("Expense updated successfully");
      setEditModalOpen(false);
      setSelectedExpense(null);
      fetchExpenses();
    } catch (error) {
      alert("Failed to update expense: " + error.message);
    }
  };

  const handleEdit = (expense) => {
    openEditModal(expense);
  };

  const handleDelete = async (expense) => {
    if (!window.confirm(`Are you sure you want to delete ${expense.category || expense.title}?`)) return;
    try {
      await deleteTransaction(expense._id);
      alert("Expense deleted successfully");
      fetchExpenses();
    } catch (error) {
      alert("Failed to delete expense: " + error.message);
    }
  };

  return (
    <div className="px-1 sm:px-3 pt-4 bg-white dark:bg-gray-900 w-full min-h-screen transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 transition-colors duration-200 w-full max-w-full mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
              Expense Overview
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700 transition"
            >
              + Add Expense
            </button>
          </div>
        </div>
        <div className="mt-4 h-56 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fill: theme === "dark" ? "#94a3b8" : "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 1000]} tick={{ fill: theme === "dark" ? "#94a3b8" : "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={250} stroke="#8b5cf6" strokeDasharray="5 5" strokeWidth={1} />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fill="url(#expenseGradient)" isAnimationActive animationDuration={1200} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-full mx-auto transition-colors duration-200">
        <div className="mb-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">All Expenses</h3>
          <button
            onClick={downloadPDF}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-4 py-2 flex items-center space-x-1 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Download Expense List as PDF"
          >
            <FaDownload />
            <span>Download</span>
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map((expense, idx) => (
            <li key={idx} className="group relative flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-3 shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center space-x-4">
                <span className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">{expense.iconComponent}</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{expense.category || expense.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{expense.dateFormatted}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right text-red-600 dark:text-red-400 font-semibold">- ${expense.amount.toLocaleString()}</div>
                <div className="opacity-0 group-hover:opacity-100 flex space-x-3 ml-4 transition-opacity duration-300">
                  <button onClick={() => handleEdit(expense)} className="text-gray-600 dark:text-gray-300 hover:text-purple-600" aria-label="Edit Expense">
                    <FiEdit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(expense)} className="text-gray-600 dark:text-gray-300 hover:text-red-600" aria-label="Delete Expense">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAddModal && <AddExpense onClose={handleAddSuccess} />}

      {editModalOpen && selectedExpense && (
        <EditExpense
          source={selectedExpense}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedExpense(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Expense;
