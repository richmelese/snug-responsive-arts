import { LogOut, Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  onAddTransaction: () => void;
}

export default function DashboardHeader({ onAddTransaction }: DashboardHeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Wallet className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-heading font-bold text-foreground">Finance Tracker</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onAddTransaction} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
        <Button variant="outline" size="icon" onClick={signOut}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
