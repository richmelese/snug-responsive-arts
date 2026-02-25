import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function SummaryCards({ totalIncome, totalExpenses, balance }: SummaryCardsProps) {
  const cards = [
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      bgClass: "bg-income-muted",
      textClass: "text-income",
      iconBgClass: "bg-income",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      bgClass: "bg-expense-muted",
      textClass: "text-expense",
      iconBgClass: "bg-expense",
    },
    {
      label: "Balance",
      value: balance,
      icon: Wallet,
      bgClass: "bg-balance-muted",
      textClass: "text-balance",
      iconBgClass: "bg-balance",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <Card
          key={card.label}
          className="border-border/50 shadow-sm hover:shadow-md transition-shadow"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBgClass}`}>
              <card.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className={`text-xl font-heading font-bold ${card.textClass} animate-count-up`}>
                {formatCurrency(card.value)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
