"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ExpensesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const transactions = await res.json();

        if (Array.isArray(transactions)) {
          const monthlyData = groupByMonth(transactions);
          setData(monthlyData);
        } else {
          console.error("Transactions fetched are not an array:", transactions);
          setData([]); // Set empty data to avoid crash
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setData([]); // On error, set empty array
      }
    };

    fetchTransactions();
  }, []);

  const groupByMonth = (transactionsList) => {
    const monthlyTotals = {};

    (transactionsList || []).forEach((txn) => {
      const date = new Date(txn.date);
      const month = date.toLocaleString("default", { month: "short", year: "numeric" });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += txn.amount;
    });

    return Object.keys(monthlyTotals).map((month) => ({
      month,
      amount: monthlyTotals[month],
    }));
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
