import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../redux/CartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, x) => sum + Number(x.price) * x.quantity, 0);
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 999;
  const total = subtotal + shipping;

  if (!items.length) return <section className="empty-page"><div><i className="bi bi-bag-x"></i><h1>Your cart is empty</h1><p>Looks like you haven't added anything yet.</p><Link to="/shop" className="btn btn-dark">Start Shopping</Link></div></section>;

  return (
    <section className="cart-page">
      <div className="container">
        <div className="page-heading"><span>YOUR BAG</span><h1>Shopping cart</h1><p>{items.length} different product(s) in your cart.</p></div>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-row" key={item.id}>
                  <img src={item.img_url} alt={item.name}/>
                  <div className="cart-main"><small>{item.category}</small><h4>{item.name}</h4><b>₹{Number(item.price).toLocaleString("en-IN")}</b></div>
                  <div className="quantity"><button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button><b>{item.quantity}</b><button onClick={() => dispatch(increaseQuantity(item.id))}>+</button></div>
                  <div className="cart-total"><b>₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}</b><button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button></div>
                </div>
              ))}
            </div>
            <button className="btn btn-link text-danger px-0 mt-3" onClick={() => dispatch(clearCart())}>Clear cart</button>
          </div>
          <div className="col-lg-4"><div className="summary-card"><h3>Order summary</h3><div><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div><div><span>Shipping</span><b>{shipping ? `₹${shipping}` : "FREE"}</b></div><hr/><div className="summary-total"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div><Link to="/checkout" className="btn btn-dark btn-lg w-100">Proceed to checkout</Link></div></div>
        </div>
      </div>
    </section>
  );
}
