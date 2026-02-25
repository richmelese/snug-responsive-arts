import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthPage from "./AuthPage";
import Dashboard from "./Dashboard";
import TransactionsPage from "./TransactionsPage";
import ReportsPage from "./ReportsPage";
import AppLayout from "@/components/AppLayout";
import NotFound from "./NotFound";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Index;
