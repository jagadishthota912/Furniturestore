import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/CartSlice";
import { addOrder } from "../redux/OrderSlice";
import { createOrder } from "../services";

export default function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery"
  });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const subtotal = items.reduce((sum, x) => sum + Number(x.price) * x.quantity, 0);
  const shipping = subtotal >= 50000 ? 0 : 999;
  const total = subtotal + shipping;

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!items.length) return navigate("/shop");
    if (!user) {
      navigate("/login", {
        state: {
          from: `/checkout${location.search}`,
          message: "Please login before placing an order."
        }
      });
      return;
    }

    setError("");
    setPlacing(true);

    const order = {
      id: `FH${Date.now()}`,
      customer: { ...form, name: user.name, phone: user.phone || form.phone, address: form.address, email: user.email },
      userId: user.id,
      items,
      subtotal,
      shipping,
      total,
      payment: form.payment,
      status: "Placed",
      date: new Date().toLocaleDateString("en-IN"),
      createdAt: new Date().toISOString()
    };

    try {
      const response = await createOrder(order);
      dispatch(addOrder(response.data));
      dispatch(clearCart());
      navigate("/order-success", { state: { orderId: response.data.id } });
    } catch {
      setError("Could not place your order. Make sure JSON Server is running.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="checkout-page">
      <div className="container">
        <div className="page-heading">
          <span>SECURE CHECKOUT</span>
          <h1>Complete your order</h1>
        </div>

        {!user && (
          <div className="alert alert-warning d-flex justify-content-between align-items-center">
            <span>You can browse and add products without an account, but login is required to place an order.</span>
            <button className="btn btn-dark btn-sm" onClick={() => navigate("/login", { state: { from: "/checkout", message: "Please login before placing an order." } })}>
              Login
            </button>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={placeOrder}>
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="checkout-card">
                <h3>Delivery details</h3>
                <div className="row g-3">
                  <div className="col-md-6"><label>Full name</label><input required name="name" value={form.name} onChange={change}/></div>
                  <div className="col-md-6"><label>Phone</label><input required name="phone" value={form.phone} onChange={change}/></div>
                  <div className="col-12"><label>Address</label><textarea required name="address" value={form.address} onChange={change}/></div>
                  <div className="col-md-6"><label>City</label><input required name="city" value={form.city} onChange={change}/></div>
                  <div className="col-md-6"><label>Pincode</label><input required pattern="[0-9]{6}" title="Enter a 6-digit pincode" name="pincode" value={form.pincode} onChange={change}/></div>
                </div>

                <h3 className="mt-4">Payment method</h3>
                <select name="payment" value={form.payment} onChange={change}>
                  <option>Cash on Delivery</option>
                  <option>UPI (Demo)</option>
                  <option>Card (Demo)</option>
                </select>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="summary-card">
                <h3>Order total</h3>
                {items.map((x) => (
                  <div className="checkout-item" key={x.id}>
                    <span>{x.name} × {x.quantity}</span>
                    <b>₹{(Number(x.price) * x.quantity).toLocaleString("en-IN")}</b>
                  </div>
                ))}
                <hr/>
                <div><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div>
                <div><span>Shipping</span><b>{shipping ? `₹${shipping}` : "FREE"}</b></div>
                <hr/>
                <div className="summary-total"><span>Total</span><b>₹{total.toLocaleString("en-IN")}</b></div>
                <button disabled={placing || !user} className="btn btn-dark btn-lg w-100">
                  {placing ? "Placing order..." : !user ? "Login to place order" : "Place order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
