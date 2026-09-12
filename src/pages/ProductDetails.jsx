import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProduct } from "../services";
import { addToCart } from "../redux/CartSlice";
import { addToWishlist } from "../redux/WishlistSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then((res) => setProduct(res.data)).catch(console.error);
  }, [id]);

  if (!product) return <div className="loading">Loading product...</div>;

  const addCart = () => {
    dispatch(addToCart(product));
    alert("Product added to cart");
  };

  return (
    <section className="details-page">
      <div className="container">
        <div className="breadcrumb-line"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}</div>
        <div className="row g-5">
          <div className="col-lg-6"><div className="details-image"><img src={product.img_url} alt={product.name} /></div></div>
          <div className="col-lg-6 details-info">
            <span>{product.category}</span>
            <h1>{product.name}</h1>
            <div className="rating-row"><b className="stars">★★★★★</b> <span>{product.rating} customer rating</span></div>
            <div className="detail-price">₹{Number(product.price).toLocaleString("en-IN")} {product.oldPrice && <del>₹{Number(product.oldPrice).toLocaleString("en-IN")}</del>}</div>
            <p className="detail-description">{product.description}</p>
            <div className="spec-grid">
              <div><small>Material</small><b>{product.material}</b></div>
              <div><small>Color</small><b>{product.color}</b></div>
              <div><small>Stock</small><b>{product.stock} available</b></div>
              <div><small>Delivery</small><b>3 - 7 days</b></div>
            </div>
            <div className="detail-actions">
              <button className="btn btn-dark btn-lg flex-grow-1" onClick={addCart}>Add to Cart</button>
              <button className="btn btn-outline-dark btn-lg" onClick={() => dispatch(addToWishlist(product))}><i className="bi bi-heart"></i></button>
            </div>
            <div className="detail-notes"><p><i className="bi bi-truck"></i> Free delivery on orders above ₹50,000</p><p><i className="bi bi-shield-check"></i> 1-year quality support</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
