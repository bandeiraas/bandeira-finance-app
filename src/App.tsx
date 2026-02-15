import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Invoices from "./pages/Invoices";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import AddAccount from "./pages/AddAccount";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";
import NewIncome from "./pages/NewIncome";
import NewExpense from "./pages/NewExpense";

import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-account" element={<AddAccount />} />
          <Route path="/new-income" element={<NewIncome />} />
          <Route path="/new-expense" element={<NewExpense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
