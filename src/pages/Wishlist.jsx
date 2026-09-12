import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import { removeFromWishlist } from "../redux/WishlistSlice";

export default function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (!items.length) return <section className="empty-page"><div><i className="bi bi-heart"></i><h1>Your wishlist is empty</h1><p>Save furniture you love for later.</p><Link to="/shop" className="btn btn-dark">Explore Furniture</Link></div></section>;

  return <section className="wishlist-page"><div className="container"><div className="page-heading"><span>SAVED ITEMS</span><h1>My wishlist</h1></div><div className="row g-4">{items.map((p) => <div className="col-6 col-lg-3" key={p.id}><div className="wishlist-card"><img src={p.img_url} alt={p.name}/><h3>{p.name}</h3><p>{p.category}</p><b>₹{Number(p.price).toLocaleString("en-IN")}</b><div><button className="btn btn-dark" onClick={() => dispatch(addToCart(p))}>Add to cart</button><button className="btn btn-outline-danger" onClick={() => dispatch(removeFromWishlist(p.id))}>Remove</button></div></div></div>)}</div></div></section>;
}
