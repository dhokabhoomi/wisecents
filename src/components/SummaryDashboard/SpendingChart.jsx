import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./SpendingChart.css";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const SpendingChart = React.memo(({ transactions }) => {
  const expenseData = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((acc, tx) => {
      const category =
        tx.category.charAt(0).toUpperCase() + tx.category.slice(1);

      const existing = acc.find((item) => item.name === category);
      if (existing) {
        existing.value += Math.abs(tx.amount);
      } else {
        acc.push({ name: category, value: Math.abs(tx.amount) });
      }
      return acc;
    }, [])
    .sort((a, b) => b.value - a.value);

  if (expenseData.length === 0) {
    return (
      <section className="chart-section">
        <h2>Spending by Category</h2>
        <div className="empty-chart">
          <p>No expenses to display</p>
        </div>
      </section>
    );
  }

  return (
    <section className="chart-section">
      <h2>Spending by Category</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              paddingAngle={2}
              label={({ name, percent }) =>
                percent > 0.05
                  ? `${name}: ${(percent * 100).toFixed(0)}%`
                  : null
              }
              labelLine={false}
            >
              {expenseData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
              contentStyle={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                borderRadius: "0.5rem",
              }}
            />
            <Legend
              iconType="circle"
              formatter={(value) => (
                <span
                  style={{ color: "var(--color-text)", fontSize: "0.875rem" }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
});
export default SpendingChart;
