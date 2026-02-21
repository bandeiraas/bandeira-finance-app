import { ErrorBoundary } from "react-error-boundary"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@features/auth/providers/AuthProvider.tsx"
import { QueryProvider } from "@app/providers/QueryProvider.tsx"
import { ProtectedRoute } from "@features/auth/guards/ProtectedRoute.tsx"
import { ErrorFallback } from "@components/ErrorBoundaryFallback.tsx"
import { ApiErrorBanner } from "@components/ApiErrorBanner.tsx"
import Layout from "@layouts/MainLayout.tsx"

import Landing from "@pages/Landing.tsx"
import OnboardingDemo from "@pages/OnboardingDemo.tsx"
import Login from "@pages/Login.tsx"
import Register from "@pages/Register.tsx"
import ForgotPassword from "@pages/ForgotPassword.tsx"

import Dashboard from "@pages/Dashboard.tsx"
import Transactions from "@pages/Transactions.tsx"
import Cards from "@pages/Cards.tsx"
import Invoices from "@pages/Invoices.tsx"
import Alerts from "@pages/Alerts.tsx"
import Profile from "@pages/Profile.tsx"
import EditProfile from "@pages/EditProfile.tsx"
import Settings from "@pages/Settings.tsx"
import AddAccount from "@features/accounts/pages/AddAccount.tsx"
import Accounts from "@pages/Accounts.tsx"
import AccountDetail from "@pages/AccountDetail.tsx"
import AddCard from "@features/cards/pages/AddCard.tsx"
import NewIncome from "@pages/NewIncome.tsx"
import NewExpense from "@pages/NewExpense.tsx"

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryProvider>
        <ApiErrorBanner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/demo" element={<OnboardingDemo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/cards" element={<Cards />} />
                  <Route path="/cards/new" element={<AddCard />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/accounts/:id" element={<AccountDetail />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/add-account" element={<AddAccount />} />
                  <Route path="/accounts/add" element={<AddAccount />} />
                  <Route path="/new-income" element={<NewIncome />} />
                  <Route path="/new-expense" element={<NewExpense />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}

export default App
