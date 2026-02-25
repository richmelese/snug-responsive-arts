import { useTransactions } from "@/hooks/useTransactions";
import CategoryChart from "@/components/finance/CategoryChart";
import SummaryCards from "@/components/finance/SummaryCards";

export default function ReportsPage() {
  const { totalIncome, totalExpenses, balance, categoryTotals, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Overview of your financial data</p>
      </div>
      <SummaryCards totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
      <div className="max-w-lg">
        <CategoryChart categoryTotals={categoryTotals} />
      </div>
    </div>
  );
}
