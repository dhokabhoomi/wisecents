import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];
function SpendingChart({ transactions }) {
  const expenseData = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((acc, tx) => {
      const existing = acc.find((item) => item.name === tx.category);
      if (existing) {
        existing.value += Math.abs(tx.amount);
      } else {
        acc.push({ name: tx.category, value: Math.abs(tx.amount) });
      }
      return acc;
    }, []);

  if (expenseData.length === 0) return null;
  return (
    <div className="card p-3 mb-3">
      <h5>Spending by category</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {expenseData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <Tooltip />
        <Legend />
      </ResponsiveContainer>
    </div>
  );
}
export default SpendingChart;
