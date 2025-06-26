import React from "react";
import "./CategoryFilter.css";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "salary", label: "Salary" },
  { value: "rent", label: "Rent" },
  { value: "entertainment", label: "Entertainment" },
  { value: "healthcare", label: "Healthcare" },
  { value: "others", label: "Others" },
];

const CategoryFilter = React.memo(({ value, onChange }) => {
  return (
    <section className="filter-section">
      <h2>Filter Transactions</h2>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="category-select"
        aria-label="Filter by category"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </section>
  );
});
export default CategoryFilter;
