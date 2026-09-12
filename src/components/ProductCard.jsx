import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wished = useSelector((state) => state.wishlist.items.some((x) => x.id === product.id));

  const toggleWishlist = () => {
    dispatch(wished ? removeFromWishlist(product.id) : addToWishlist(product));
  };

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`wishlist-float ${wished ? "active" : ""}`} onClick={toggleWishlist} title="Wishlist">
          <i className={`bi ${wished ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
        <Link to={`/product/${product.id}`}>
          <img src={product.img_url || FALLBACK_IMAGE} alt={product.name} onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }} />
        </Link>
      </div>
      <div className="product-info">
        <small>{product.category}</small>
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <div className="rating-row"><span className="stars">★★★★★</span><span>{product.rating}</span></div>
        <div className="price-row"><strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>{product.oldPrice && <del>₹{Number(product.oldPrice).toLocaleString("en-IN")}</del>}</div>
        <div className="product-buttons">
          <button className="btn btn-dark" onClick={() => dispatch(addToCart(product))}>Add to cart</button>
          <Link className="btn btn-outline-dark" to={`/product/${product.id}`}>View</Link>
        </div>
      </div>
    </div>
  );
}
