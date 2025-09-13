import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiArrowDownRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { useTheme } from "../../../context/ThemeContext.jsx";
import useExpenses from "../../../hooks/FetchExpanse/useExpenses.jsx";

export default function Expense() {
  const { theme } = useTheme();
  const { expenses: sources, chartData } = useExpenses(); // renamed to sources from your code

  const notify = () => toast("See all expenses coming soon!");

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Expense List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Recent Expenses
          </h3>
          {/* Uncomment if needed
          <button
            onClick={notify}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
          >
            See All →
          </button>
          */}
        </div>
        <ul className="space-y-5 overflow-hidden" style={{ height: "310px" }}>
          {sources.map((e, idx) => (
           <li
  key={idx}
  className={`flex items-center justify-between rounded-lg transition-all duration-300 cursor-pointer 
    ${e.bg || "bg-red-50 dark:bg-red-900"} px-3 py-2
    hover:bg-red-100 dark:hover:bg-red-800 hover:shadow-lg hover:scale-[1.02]
  `}
>
  <div className="flex items-center gap-3">
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-colors duration-200 
        ${e.bg || "bg-red-50 dark:bg-red-900"}`}
    >
      {e.iconComponent}
    </div>
    <div>
      <p className="font-medium text-gray-900 dark:text-white">{e.title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{e.dateFormatted}</p>
    </div>
  </div>
  <div className="font-semibold flex items-center gap-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900 px-3 py-1 rounded-xl text-base shadow-sm transition-colors duration-300">
    -${Math.abs(e.amount).toLocaleString()}
    <FiArrowDownRight size={16} />
  </div>
</li>

          ))}
        </ul>
      </div>

      {/* Expense Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-colors duration-200 min-h-[400px]">
        <h3 className="font-semibold text-lg mb-6 text-gray-900 dark:text-white">
          Last 30 Days Expenses
        </h3>
        <div className="w-full flex-grow" style={{ minHeight: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={theme === "dark" ? "#374151" : "#e0e0e0"}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 14, fill: theme === "dark" ? "#d1d5db" : "#374151" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 12, fill: theme === "dark" ? "#d1d5db" : "#374151" }}
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax + 5000"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
                  borderColor: theme === "dark" ? "#4b5563" : "#ccc",
                  color: theme === "dark" ? "#d1d5db" : "#374151",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#ef4444", fontWeight: "bold" }}
                cursor={{ fill: theme === "dark" ? "#7f1d1d" : "#fee2e2", opacity: 0.32 }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={48} fill="url(#colorExpense)" />
              <defs>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#ef4444" stopOpacity={1} />
                  <stop offset="90%" stopColor="#fca5a5" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
