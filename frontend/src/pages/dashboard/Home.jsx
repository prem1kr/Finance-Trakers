import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { ThemeProvider } from "../../context/ThemeContext.jsx";

import Dashboard from "./Dashboard.jsx";
import Income from "./Income.jsx";
import Expense from "./Expense.jsx";
import Transactions from "../../components/transactions/Transactions.jsx";
import Sidebar from "../../components/dashboard/sidebar/Sidebar.jsx";
import Navbar from "../../components/dashboard/navbar/Navbar.jsx"
function HomeContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentView, setCurrentView] = useState("Dashboard"); 
  
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1080) {
        setSidebarOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowSidebar = windowWidth > 1080;
  const showMenuButton = windowWidth <= 1080;
  const isExtraSmallScreen = windowWidth <= 480;

  const renderCurrentView = () => {
    switch (currentView) {
      case "Income":
        return <Income />;
      case "Expense":
        return <Expense />;
      case "All Transaction":
        return <Transactions />;
      case "Dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-900 min-h-screen font-inter transition-colors duration-200 
        text-gray-900 dark:text-gray-100"
      style={{ fontFeatureSettings: '"cv11", "ss03"' }}
    >
      <Navbar
        showMenuButton={showMenuButton}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Sidebar */}
      <div className="pt-16 flex">
        <div>
          <div className="hidden lg:block w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-md z-40 transition-colors duration-200 border-r border-gray-200 dark:border-gray-700">
            <Sidebar
              sidebarOpen={sidebarOpen} 
              setSidebarOpen={setSidebarOpen} 
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          </div>

          <div
            className={`fixed inset-0 z-50 bg-black/40 dark:bg-black/60 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          >
            <div
              className={`bg-white dark:bg-gray-800 w-64 shadow-md h-full transform relative transition-all duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-2 right-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Close sidebar"
              >
                <FiX size={24} />
              </button>
              <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                currentView={currentView}
                setCurrentView={setCurrentView}
              />
            </div>
          </div>
        </div>

        {/* Dashboard/Content */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out lg:ml-64 ${
            isExtraSmallScreen ? "p-0" : "p-0"
          }`}
        >
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
