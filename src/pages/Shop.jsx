import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { category: routeCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(routeCategory || "All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    setCategory(routeCategory || "All");
  }, [routeCategory]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = useMemo(() => {
    let data = products.filter((p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") data = [...data].sort((a, b) => a.price - b.price);
    if (sort === "high") data = [...data].sort((a, b) => b.price - a.price);
    if (sort === "name") data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    return data;
  }, [products, category, sort, search]);

  return (
    <section className="shop-page">
      <div className="container">
        <div className="page-heading">
          <span>FURNITURE COLLECTION</span>
          <h1>{category === "All" ? "Shop all furniture" : category}</h1>
          <p>Find pieces that fit your room, your style and your everyday life.</p>
        </div>

        <div className="filter-bar">
          <div className="filter-search"><i className="bi bi-search"></i><input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        <div className="result-count">{filtered.length} products</div>

        <div className="row g-4">
          {filtered.map((p) => <div className="col-6 col-lg-3" key={p.id}><ProductCard product={p} /></div>)}
        </div>

        {filtered.length === 0 && <div className="empty-box"><h3>No products found</h3><p>Try another search or category.</p></div>}
      </div>
    </section>
  );
}
