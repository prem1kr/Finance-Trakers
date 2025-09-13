import React, { useState, useRef } from "react";
import {
  FiLayout,
  FiDollarSign,
  FiFileText,
  FiLogOut,
  FiBook,
} from "react-icons/fi";
import useUser from "../../../hooks/userInfo/useUser.jsx";
import useLogout from "../../../hooks/auth/useLogout.jsx";
import { uploadUserAvatar } from "../../../hooks/multer/useAvatar.jsx";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  currentView,
  setCurrentView,
}) {
  const { user, loading, setUser } = useUser();
  const { logout } = useLogout();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const menuItems = [
    { name: "Dashboard", icon: <FiLayout size={20} /> },
    { name: "Income", icon: <FiDollarSign size={20} /> },
    { name: "Expense", icon: <FiFileText size={20} /> },
    { name: "All Transaction", icon: <FiBook size={20} /> },
  ];

  const handleMenuClick = (itemName) => {
    setCurrentView(itemName);
    if (window.innerWidth <= 1080) {
      setSidebarOpen(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadUserAvatar(file);
      if (data?.data?.avatar) {
        setUser((prev) => ({ ...prev, avatar: data.data.avatar }));
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white/80 dark:bg-gray-800/90 shadow-2xl z-50 mt-20 flex flex-col backdrop-blur-md border-r border-gray-200 dark:border-gray-700 transition-colors duration-300 overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400 rounded-tr-3xl rounded-br-3xl" />

      {/* User Info */}
      <div className="flex flex-col items-center py-7 border-b border-gray-200 dark:border-gray-700 relative z-10 bg-opacity-80">
        <div className="relative cursor-pointer">
          <img
            src={
              user?.avatar
                ? `https://tracker-h7ju.onrender.com${user.avatar}`
                : "https://api.dicebear.com/6.x/avataaars/svg?seed=Mike"
            }
            alt="user avatar"
            className="w-20 h-20 rounded-full mb-2 ring-4 ring-purple-400/40 transition-all duration-300"
            onClick={() => fileInputRef.current.click()}
            title="Click to change avatar"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full text-white font-semibold">
              Uploading...
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleAvatarChange}
          />
        </div>

        {loading ? (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide drop-shadow">
            Loading user...
          </h2>
        ) : user ? (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide drop-shadow">
              {user.name}
            </h2>
            <p className="text-xs mt-1 font-medium text-purple-500 dark:text-purple-300">
              Premium Member
            </p>
          </>
        ) : (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide drop-shadow">
            User not signed in
          </h2>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col flex-grow p-5 space-y-2 relative z-10">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleMenuClick(item.name)}
            className={`
              flex items-center gap-3 px-4 py-2 font-semibold rounded-xl transition-all duration-300 bg-gradient-to-r w-full text-left
              ${
                item.name === currentView
                  ? "from-purple-500 to-pink-400 text-white shadow-lg"
                  : "bg-white/90 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 shadow"
              }
              hover:from-pink-500 hover:to-orange-400 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-purple-300
              transform hover:scale-105 active:scale-95
              animate-fadeIn
            `}
            style={{ animationDelay: `${idx * 75}ms`, animationFillMode: "backwards" }}
            aria-current={item.name === currentView ? "page" : undefined}
          >
            <span
              className={`
                ${
                  item.name === currentView
                    ? "text-white"
                    : idx === 1
                    ? "text-emerald-500"
                    : idx === 2
                    ? "text-red-500"
                    : idx === 3
                    ? "text-orange-400"
                    : "text-gray-500"
                }
                transition duration-300
              `}
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 mt-auto relative z-10" style={{ marginBottom: "100px" }}>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-100/70 to-red-200/60 dark:from-red-900/70 dark:to-red-700/60 text-red-600 dark:text-red-300 shadow hover:text-white hover:bg-red-500 hover:from-red-400 hover:to-red-500 hover:scale-105 active:scale-95 transition-all duration-300 w-full text-left animate-fadeIn"
          style={{ animationDelay: "340ms", animationFillMode: "backwards" }}
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>

      {/* Custom Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(.68,-0.6,.32,1.6) both;
        }
      `}</style>
    </div>
  );
}
