import { useState, useMemo, useRef, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=100");

  // 1. Search, Category, Sort තියාගන්න State 3ක්
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const products = useMemo(() => data?.products ?? [], [data]);

  const categories = useMemo(
    () => ["all", ...new Set(products.map(p => p.category))],
    [products]
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          ref={searchRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search Product..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 capitalize"
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {loading && <p className="text-center text-gray-500 py-10">Loading products...</p>}

      {error && (
        <p className="text-center text-red-500 bg-red-50 rounded-lg py-6">⚠️ {error}</p>
      )}
    </div>
  );
}

export default Home;