import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services";
import ProductCard from "../components/ProductCard";

const categories = [
  { name: "Sofas", value: "Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85" },
  { name: "Bedroom", value: "Bed", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85" },
  { name: "Dining", value: "Table", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85" },
  { name: "Storage", value: "Storage", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=900&q=85" }
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  return (
    <>
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="eyebrow">NEW SEASON • 2026 COLLECTION</span>
              <h1>Furniture that makes <em>home</em> feel like home.</h1>
              <p>Discover timeless pieces, crafted for comfort and designed for modern living.</p>
              <div className="hero-buttons">
                <Link to="/shop" className="btn btn-dark btn-lg">Shop Collection <i className="bi bi-arrow-right ms-2"></i></Link>
                {/* <Link to="/about" className="btn btn-link">Our Story</Link> */}
              </div>
              <div className="hero-trust">
                <span><i className="bi bi-truck"></i> Free delivery over ₹50K</span>
                <span><i className="bi bi-shield-check"></i> Quality guaranteed</span>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="hero-photo">
                <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1200&q=85" alt="Beautiful modern interior" />
                <div className="hero-card"><small>BEST SELLER</small><b>Oslo Living Collection</b><span>From ₹18,999</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-space">
        <div className="section-title">
          <div><span>EXPLORE</span><h2>Shop by category</h2></div>
          <Link to="/shop">View all <i className="bi bi-arrow-right"></i></Link>
        </div>
        <div className="row g-3">
          {categories.map((c) => (
            <div className="col-6 col-lg-3" key={c.value}>
              <Link to={`/category/${c.value}`} className="category-tile">
                <img src={c.image} alt={c.name} />
                <div><h3>{c.name}</h3><span>Explore →</span></div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-area section-space">
        <div className="container">
          <div className="section-title">
            <div><span>CURATED FOR YOU</span><h2>Popular right now</h2></div>
            <Link to="/shop">Shop all <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="row g-4">
            {products.filter((p) => p.featured).slice(0, 4).map((p) => (
              <div className="col-sm-6 col-lg-3" key={p.id}><ProductCard product={p} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-space">
        <div className="offer-banner">
          <div>
            <span>THE WEEKEND EDIT</span>
            <h2>Make space for something beautiful.</h2>
            <p>Save up to 30% on selected pieces for a limited time.</p>
            <Link to="/shop" className="btn btn-light">Shop the sale</Link>
          </div>
        </div>
      </section>

      <section className="container benefits section-space">
        <div><i className="bi bi-box-seam"></i><h5>Reliable delivery</h5><p>Careful doorstep delivery across major cities.</p></div>
        <div><i className="bi bi-stars"></i><h5>Quality first</h5><p>Furniture selected for comfort and durability.</p></div>
        <div><i className="bi bi-arrow-repeat"></i><h5>Easy returns</h5><p>Simple 7-day return experience on eligible items.</p></div>
        <div><i className="bi bi-headset"></i><h5>Human support</h5><p>Our customer care team is here to help.</p></div>
      </section>
    </>
  );
}
