function CategoryFilter({ selected, setSelected }) {
  const categories = [
    "all",
    "food",
    "shopping",
    "utilities",
    "transaport",
    "entertainment",
    "salary",
    "rent",
    "others",
  ];
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="card p-3 mb-3">
      <h5>Filter by Category</h5>
      <select
        value={selected}
        className="form-select"
        onChange={(e) => setSelected(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {capitalize(cat)}
          </option>
        ))}
      </select>
    </div>
  );
}
export default CategoryFilter;
