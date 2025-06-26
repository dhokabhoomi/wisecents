import React from "react";
import "./DataManager.css";
import Button from "./UI/Button";

const DataManager = React.memo(({ transactions, onImport }) => {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wiseCents_data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const rows = transactions.map((tx) => [
      tx.date,
      tx.description,
      tx.category,
      Math.abs(tx.amount).toFixed(2),
      tx.amount > 0 ? "Income" : "Expense",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wiseCents_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          onImport(parsed);
        } else {
          alert("Invalid file format.");
        }
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset input
  };

  return (
    <div className="data-manager">
      <h3>Data Management</h3>
      <div className="button-group">
        <Button onClick={exportJSON} variant="secondary" size="sm">
          Export JSON
        </Button>
        <Button onClick={exportCSV} variant="secondary" size="sm">
          Export CSV
        </Button>
        <label className="import-button">
          Import JSON
          <input type="file" accept=".json" onChange={handleImport} hidden />
        </label>
      </div>
    </div>
  );
});

export default DataManager;
