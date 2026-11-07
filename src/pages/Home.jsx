import { useState, useMemo, useRef, useEffect, useDeferredValue } from "react";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

function Home() {
  const { data, loading, error } = useFetch("https://dummyjson.com/products?limit=100");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const searchRef = useRef(null);

  const deferredSearch = useDeferredValue(search);
  const isStale = search !== deferredSearch;

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const products = useMemo(() => data?.products ?? [], [data]);

  const categories = useMemo(
    () => ["all", ...new Set(products.map(p => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter(p =>
      p.title.toLowerCase().includes(deferredSearch.toLowerCase())
    );

    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, deferredSearch, category, sort]);

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

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-10">No products found 😕</p>
      )}

      {!loading && !error && (
        <p className="text-sm text-gray-500 mb-4">
         Numbr of products: <span className="font-bold text-indigo-600">{filteredProducts.length}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

export default Home;