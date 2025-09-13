import React from "react";
import { FaDownload } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext.jsx";
import iconMap from "../../utils/iconMap/iconMap.jsx";
import useTransactions from "../../hooks/FetchTransaction/useTransactions.jsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Transactions = () => {
  const { theme } = useTheme();
  const { transactions } = useTransactions();

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("All Transactions", 14, 22);

    const tableColumn = ["Title", "Date", "Amount", "Type"];
    const tableRows = transactions.map(txn => [
      txn.title,
      new Date(txn.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }),
      txn.amount.toLocaleString(),
      txn.type,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [107, 33, 168] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="px-3 sm:px-6 pt-4 space-y-4">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md w-full transition-colors duration-200">
          <div className="flex flex-row items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
              All Transactions
            </h2>
            <button
              onClick={downloadPDF}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg px-3 py-2 text-sm font-medium shadow flex items-center transition-all whitespace-nowrap"
            >
              <FaDownload className="mr-2" /> Download
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 w-full">
            {transactions.map((txn, idx) => {
              const isIncome = txn.type === "income";

              const iconFn = iconMap[txn.title];
              const iconElement = iconFn ? iconFn() : <span className="text-xl">{txn.icon || "❓"}</span>;

              return (
                <div
                  key={idx}
                  className={`
                    flex items-center justify-between p-3 rounded-lg transition-all duration-300 shadow-sm
                    ${isIncome
                      ? "bg-green-50 dark:bg-green-900/60 hover:bg-green-100 dark:hover:bg-green-900"
                      : "bg-red-50 dark:bg-red-900/50 hover:bg-red-100 dark:hover:bg-red-900"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 bg-white dark:bg-gray-800">
                      {iconElement}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          font-semibold text-sm truncate transition-colors duration-200
                          ${isIncome
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                          }
                        `}
                      >
                        {txn.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        {new Date(txn.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`
                        px-3 py-1 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors duration-200
                        ${isIncome
                          ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-800/60"
                          : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-800/70"
                        }
                      `}
                    >
                      {isIncome ? "+" : "-"}${txn.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
