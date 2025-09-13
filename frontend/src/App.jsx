import {Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Home from "./pages/dashboard/Home.jsx";
import Expanse from "./pages/dashboard/Expense.jsx";
import Home2 from "./components/dashboard/income/Income.jsx";
import Home3 from "./components/dashboard/expanse/Expanse.jsx";
import Home1 from "./components/dashboard/overview/OverView.jsx";
import AddIncome from "./components/Income/AddIncome.jsx";
import Income from "./pages/dashboard/Income.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element= {<Root/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Home/>} />
      <Route path="/income" element={<Income/>} />
      <Route path="/expense" element={<Expanse/>} />
      <Route path="dashboard1" element={<Home1/>} />
      <Route path="/dashboard2" element={<Home2/>} />
      <Route path="/dashboard3" element={<Home3/>} />
      <Route path="/add-income" element={<AddIncome/>} />
      
    </Routes>
  );
}

export default App;


const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}