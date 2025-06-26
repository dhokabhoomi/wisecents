import React from "react";
import "./SummaryDashboard.css";

const StatCard = React.memo(({ title, amount, type }) => {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <p className={`stat-value ${type}`}>
        {type === "expense" && "-"}₹{Math.abs(amount).toFixed(2)}
      </p>
    </div>
  );
});

const SummaryDashboard = React.memo(({ transactions }) => {
  const income = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expenses = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income + expenses;

  return (
    <div className="stats-grid">
      <StatCard
        title="Net Balance"
        amount={balance}
        type={balance >= 0 ? "income" : "expense"}
      />
      <StatCard title="Total Income" amount={income} type="income" />
      <StatCard title="Total Expenses" amount={expenses} type="expense" />
    </div>
  );
});
export default SummaryDashboard;
