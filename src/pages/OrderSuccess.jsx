import { Link, useLocation } from "react-router-dom";
export default function OrderSuccess() {
  const { state } = useLocation();
  return <section className="success-page"><div><div className="success-icon"><i className="bi bi-check2"></i></div><span>ORDER CONFIRMED</span><h1>Thank you for your order.</h1><p>Your order has been placed successfully{state?.orderId ? ` with ID ${state.orderId}` : ""}.</p><div><Link to="/orders" className="btn btn-dark me-2">View My Orders</Link><Link to="/shop" className="btn btn-outline-dark">Continue Shopping</Link></div></div></section>;
}
