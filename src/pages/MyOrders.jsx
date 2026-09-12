import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, setOrders } from "../redux/OrderSlice";
import { getOrdersByEmail, updateOrder } from "../services";

export default function MyOrders() {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    getOrdersByEmail(user.email)
      .then((res) => dispatch(setOrders(res.data)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.email, dispatch]);

  const cancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await updateOrder(id, { status: "Cancelled" });
      dispatch(cancelOrder(id));
    } catch {
      alert("Could not cancel the order.");
    }
  };

  if (!user) return (
    <section className="empty-page">
      <div>
        <i className="bi bi-person-lock"></i>
        <h1>Login required</h1>
        <p>Please login to view your orders.</p>
      </div>
    </section>
  );

  if (loading) return <div className="loading"><h4>Loading your orders...</h4></div>;

  if (!orders.length) return (
    <section className="empty-page">
      <div>
        <i className="bi bi-receipt"></i>
        <h1>No orders yet</h1>
        <p>Your placed orders will appear here.</p>
      </div>
    </section>
  );

  return (
    <section className="orders-page">
      <div className="container">
        <div className="page-heading"><span>ACCOUNT</span><h1>My orders</h1><p>Your order history is saved in Furniture Hub.</p></div>
        {orders.map((o) => (
          <div className="order-card" key={o.id}>
            <div className="order-head">
              <div><b>{o.id}</b><span>{o.date}</span></div>
              <span className={`status ${o.status.toLowerCase()}`}>{o.status}</span>
            </div>
            <div className="order-products">
              {o.items.map((p) => (
                <div key={p.id}><img src={p.img_url} alt={p.name}/><span>{p.name} × {p.quantity}</span></div>
              ))}
            </div>
            <div className="order-bottom">
              <b>Total: ₹{Number(o.total).toLocaleString("en-IN")}</b>
              {o.status !== "Cancelled" && <button onClick={() => cancel(o.id)}>Cancel order</button>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
