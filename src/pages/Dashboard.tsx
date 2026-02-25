import { useState } from "react";
import { useTransactions, type TransactionFormData } from "@/hooks/useTransactions";
import DashboardHeader from "@/components/finance/DashboardHeader";
import SummaryCards from "@/components/finance/SummaryCards";
import TransactionList from "@/components/finance/TransactionList";
import TransactionForm from "@/components/finance/TransactionForm";
import CategoryChart from "@/components/finance/CategoryChart";
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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <DashboardHeader onAddTransaction={handleAdd} />
        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TransactionList
              transactions={transactions}
              onEdit={handleEdit}
              onDelete={(id) => deleteTransaction.mutate(id)}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-2">
            <CategoryChart categoryTotals={categoryTotals} />
          </div>
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
