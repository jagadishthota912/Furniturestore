import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProducts } from "../services";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  const result = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="search-results-page">
      <div className="container">
        <div className="page-heading"><span>SEARCH</span><h1>Search results</h1><p>Showing matches for <strong>“{q}”</strong></p></div>
        <div className="row g-4">
          {result.map((p) => <div className="col-6 col-lg-3" key={p.id}>
            <div className="simple-search-card"><img src={p.img_url} alt={p.name}/><h3>{p.name}</h3><p>{p.category}</p><b>₹{Number(p.price).toLocaleString("en-IN")}</b><Link to={`/product/${p.id}`}>View Product</Link></div>
          </div>)}
        </div>
        {result.length === 0 && <div className="empty-box"><h3>No matching furniture</h3><p>Try “sofa”, “table”, “bed” or another product name.</p><Link to="/shop" className="btn btn-dark">Continue Shopping</Link></div>}
      </div>
    </section>
  );
}
