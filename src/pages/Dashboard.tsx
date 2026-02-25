import { useState } from "react";
import { useTransactions, type TransactionFormData } from "@/hooks/useTransactions";
import SummaryCards from "@/components/finance/SummaryCards";
import TransactionList from "@/components/finance/TransactionList";
import TransactionForm from "@/components/finance/TransactionForm";
import CategoryChart from "@/components/finance/CategoryChart";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type Transaction = Tables<"transactions">;

export default function Dashboard() {
  const {
    transactions,
    isLoading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
    categoryTotals,
  } = useTransactions();

  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    (TransactionFormData & { id: string }) | null
  >(null);

  const handleAdd = () => {
    setEditingTransaction(null);
    setFormOpen(true);
  };

  const handleEdit = (t: Transaction) => {
    setEditingTransaction({
      id: t.id,
      amount: Number(t.amount),
      type: t.type as "income" | "expense",
      category: t.category,
      description: t.description || "",
      transaction_date: t.transaction_date,
    });
    setFormOpen(true);
  };

  const handleSubmit = (data: TransactionFormData) => {
    if (editingTransaction) {
      updateTransaction.mutate({ ...data, id: editingTransaction.id }, {
        onSuccess: () => setFormOpen(false),
      });
    } else {
      createTransaction.mutate(data, {
        onSuccess: () => setFormOpen(false),
      });
    }
  };

  // Show only the latest 5 transactions on dashboard
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your financial overview at a glance</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-3">
          <TransactionList
            transactions={recentTransactions}
            onEdit={handleEdit}
            onDelete={(id) => deleteTransaction.mutate(id)}
            isLoading={isLoading}
          />
          {transactions.length > 5 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/transactions")}
            >
              View all {transactions.length} transactions
            </Button>
          )}
        </div>
        <div className="lg:col-span-2">
          <CategoryChart categoryTotals={categoryTotals} />
        </div>
      </div>

      <TransactionForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        isLoading={createTransaction.isPending || updateTransaction.isPending}
        initialData={editingTransaction}
      />
    </div>
  );
}
