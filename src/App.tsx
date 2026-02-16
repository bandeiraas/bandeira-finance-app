import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./features/auth/providers/AuthProvider"
import { QueryProvider } from "./app/providers/QueryProvider"
import { ProtectedRoute } from "./features/auth/guards/ProtectedRoute"
import Layout from "./layouts/MainLayout"

// Public pages
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"

// Protected pages
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Cards from "./pages/Cards"
import Invoices from "./pages/Invoices"
import Alerts from "./pages/Alerts"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Settings from "./pages/Settings"
import AddAccount from "./pages/AddAccount"
import NewIncome from "./pages/NewIncome"
import NewExpense from "./pages/NewExpense"

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
