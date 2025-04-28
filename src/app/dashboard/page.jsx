"use client"; // 👈 make this a Client Component

import { useState } from "react";
import TransactionForm from "@/app/components/TransactionForm";
import TransactionList from "@/app/components/TransactionList";
import ExpensesChart from "@/app/components/ExpensesChart";

export default function Dashboard() {
  const [version, setVersion] = useState(0);

  const fetchTransactions = () => {
    setVersion((v) => v + 1); // bump version to trigger re-render
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Personal Finance Dashboard</h1>
      <TransactionForm fetchTransactions={fetchTransactions} />
      <ExpensesChart key={`chart-${version}`} />
      <TransactionList key={`list-${version}`} />
    </main>
  );
}
