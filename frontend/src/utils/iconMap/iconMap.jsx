import React from "react";
import {
  FaShoppingCart, FaCar, FaHome, FaUtensils, FaGamepad, FaPlane, FaTshirt, FaGift,
  FaBriefcase, FaPiggyBank, FaBook, FaPalette, FaMusic, FaChartLine
} from "react-icons/fa";

const iconMap = {
  salary:      () => <FaBriefcase className="text-[#6C5DD3] text-xl" />,
  book:        () => <FaBook className="text-[#48BB78] text-xl" />,
  "interest from savings": () => <FaPiggyBank className="text-[#FF4D4F] text-xl" />,
  "e-commerce sales":      () => <FaShoppingCart className="text-[#FF914D] text-xl" />,
  "graphic design":        () => <FaPalette className="text-[#4D79FF] text-xl" />,
  "affiliate marketing":   () => <FaBook className="text-[#F59E42] text-xl" />,
  "rental income":         () => <FaHome className="text-[#FBBF24] text-xl" />,
  "youtube revenue":       () => <FaMusic className="text-[#F87171] text-xl" />,
  "stock market":          () => <FaChartLine className="text-[#6366f1] text-xl" />,
  shopping:    () => <FaShoppingCart className="text-[#6C5DD3] text-xl" />,
  travel:      () => <FaPlane className="text-[#9F7AEA] text-xl" />,
  "electricity bill": () => <FaGift className="text-[#FC8181] text-xl" />,
  "loan repayment":  () => <FaPiggyBank className="text-[#FF4D4F] text-xl" />,
  transport:   () => <FaCar className="text-[#FF4D4F] text-xl" />,
  education:   () => <FaBook className="text-[#48BB78] text-xl" />,
  "medical expenses": () => <FaGift className="text-[#FC8181] text-xl" />,
  "dining out":      () => <FaUtensils className="text-[#4D79FF] text-xl" />,
  game:        () => <FaGamepad className="text-[#a32cc4] text-xl" />,
  tshirt:      () => <FaTshirt className="text-[#f43f5e] text-xl" />,
};

export default iconMap;
