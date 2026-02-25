import { useAuth } from "@/hooks/useAuth";
import AuthPage from "./AuthPage";
import Dashboard from "./Dashboard";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
};

export default Index;
