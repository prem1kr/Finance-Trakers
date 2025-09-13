import React, { useState } from "react";
import { FaTimes, FaCalendarAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmojiPicker from "emoji-picker-react";
import { addIncome } from "../../hooks/addIncome/useAddIncom.jsx";

export default function AddIncome({ onClose }) {
  const { theme } = useTheme();

  const [icon, setIcon] = useState("😊");
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setIcon(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = date.toISOString().split("T")[0];
    const payload = {
      icon,
      title: source,
      amount: Number(amount),
      type: "income",
      date: formattedDate,
    };

    try {
      const response = await addIncome(payload);
      if (response.status === 201) {
        alert("Income added successfully");
        onClose();
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow w-full max-w-md mx-4 animate-fade-in transition-colors duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <div className="font-semibold text-lg text-gray-900 dark:text-white flex items-center space-x-2">
            <span>Add Income</span>
            <span className="text-2xl">{icon}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white dark:text-gray-500 text-xl transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Icon Picker Toggle */}
        <div className="px-6 pt-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="px-3 py-1 text-purple-600 border border-purple-600 rounded hover:bg-purple-100 dark:hover:bg-purple-800 transition"
          >
            Pick Icon
          </button>
          {showEmojiPicker && (
            <div className="mt-2 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        {/* Form */}
        <form className="space-y-4 p-6 pt-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Freelance, Salary, etc"
            className="w-full rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-700 focus:ring-1 focus:ring-purple-200 dark:focus:ring-purple-700 text-sm p-3 outline-none text-gray-900 dark:text-gray-200 transition-colors duration-200"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            className="w-full rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-700 focus:ring-1 focus:ring-purple-200 dark:focus:ring-purple-700 text-sm p-3 outline-none text-gray-900 dark:text-gray-200 transition-colors duration-200"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            required
          />

          <div className="relative">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-700 focus:ring-1 focus:ring-purple-200 dark:focus:ring-purple-700 text-sm p-3 outline-none pr-10 text-gray-900 dark:text-gray-200 transition-colors duration-200"
              required
            />
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg pointer-events-none" />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg mt-2 text-white bg-purple-600 hover:bg-purple-700 transition font-semibold text-sm shadow"
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
}
