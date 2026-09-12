import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, deleteProduct, editProduct, getOrders, getProducts, getUsers } from "../../services";

const blank = { name:"", category:"Sofa", brand:"Furniture Hub", price:"", oldPrice:"", img_url:"", description:"", material:"", color:"", stock:"", rating:"4.5", featured:false, badge:"" };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("furnitureHubAdmin") || "null")?.authenticated !== true) navigate("/admin/login");
    else load();
  }, []);

  const load = () => getProducts().then((res) => setProducts(res.data)).catch(console.error);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = { ...form, price:Number(form.price), oldPrice:form.oldPrice ? Number(form.oldPrice) : null, stock:Number(form.stock), rating:Number(form.rating) };
    try {
      if (editingId) await editProduct(editingId, data);
      else await addProduct(data);
      setMessage(editingId ? "Product updated successfully." : "Product added successfully.");
      setForm(blank); setEditingId(null); load();
    } catch { setMessage("Operation failed. Is JSON Server running?"); }
  };

  const edit = (p) => { setEditingId(p.id); setForm({...p}); window.scrollTo({top:0,behavior:"smooth"}); };
  const remove = async (id) => { if (!confirm("Delete this product?")) return; await deleteProduct(id); load(); };

  const loadUsers = async () => {
    setView("users");
    setLoadingData(true);
    try { setUsers((await getUsers()).data); } catch { setMessage("Could not load registered users."); }
    finally { setLoadingData(false); }
  };

  const loadOrders = async () => {
    setView("orders");
    setLoadingData(true);
    try { setOrders((await getOrders()).data); } catch { setMessage("Could not load orders."); }
    finally { setLoadingData(false); }
  };

  return (
    <section className="admin-page">
      <div className="container">
        <div className="admin-head">
          <div><span>JSON SERVER • CRUD • ADMIN</span><h1>Admin Control Center</h1><p>Manage products and inspect customer activity from the database.</p></div>
          <button className="btn btn-outline-dark" onClick={() => {localStorage.removeItem("furnitureHubAdmin");navigate("/admin/login", { replace: true })}}>Logout</button>
        </div>

        {message && <div className="alert alert-info">{message}</div>}

        <div className="admin-stats row g-3 mb-4">
          <div className="col-md-4"><div className="admin-stat"><span>PRODUCTS</span><b>{products.length}</b><small>Catalog items</small></div></div>
          <div className="col-md-4"><div className="admin-stat"><span>REGISTERED USERS</span><b>{users.length || "—"}</b><small>Click View Users to load</small></div></div>
          <div className="col-md-4"><div className="admin-stat"><span>ORDERS</span><b>{orders.length || "—"}</b><small>Click View Orders to load</small></div></div>
        </div>

        <div className="admin-view-buttons mb-4">
          <button className={`btn ${view === "users" ? "btn-dark" : "btn-outline-dark"}`} onClick={loadUsers}>
            <i className="bi bi-people me-2"></i>View Registered Users
          </button>
          <button className={`btn ${view === "orders" ? "btn-dark" : "btn-outline-dark"}`} onClick={loadOrders}>
            <i className="bi bi-bag-check me-2"></i>View Orders
          </button>
        </div>

        {view === "users" && (
          <div className="admin-panel mb-5">
            <div className="panel-heading"><div><span>CUSTOMER DATABASE</span><h2>Registered users</h2></div><b>{users.length} users</b></div>
            {loadingData ? <p>Loading users...</p> : (
              <div className="table-responsive admin-table">
                <table className="table align-middle">
                  <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Address</th><th>User ID</th></tr></thead>
                  <tbody>
                    {users.map((u) => <tr key={u.id}><td><b>{u.name}</b></td><td>{u.email}</td><td><span className="badge text-bg-light">{u.role || "user"}</span></td><td>{u.phone}</td><td>{u.address}</td><td>#{u.id}</td></tr>)}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {view === "orders" && (
          <div className="admin-panel mb-5">
            <div className="panel-heading"><div><span>ORDER DATABASE</span><h2>Customer orders</h2></div><b>{orders.length} orders</b></div>
            {loadingData ? <p>Loading orders...</p> : orders.length === 0 ? <p>No orders have been placed yet.</p> : (
              <div className="table-responsive admin-table">
                <table className="table align-middle">
                  <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td><b>{o.id}</b></td>
                        <td><b>{o.customer?.name}</b><br/><small>{o.customer?.email}</small></td>
                        <td>{o.items?.reduce((n, x) => n + Number(x.quantity || 0), 0)} item(s)</td>
                        <td><b>₹{Number(o.total).toLocaleString("en-IN")}</b></td>
                        <td>{o.payment}</td>
                        <td><span className={`status ${o.status?.toLowerCase()}`}>{o.status}</span></td>
                        <td>{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="admin-form">
          <h3>{editingId ? "Update product" : "Add product"}</h3>
          <form onSubmit={submit}><div className="row g-3">
            <div className="col-md-6"><label>Product name</label><input required name="name" value={form.name} onChange={change}/></div>
            <div className="col-md-3"><label>Category</label><select name="category" value={form.category} onChange={change}><option>Sofa</option><option>Chair</option><option>Table</option><option>Bed</option><option>Storage</option></select></div>
            <div className="col-md-3"><label>Price</label><input required type="number" name="price" value={form.price} onChange={change}/></div>
            <div className="col-md-3"><label>Old price</label><input type="number" name="oldPrice" value={form.oldPrice || ""} onChange={change}/></div>
            <div className="col-md-3"><label>Stock</label><input required type="number" name="stock" value={form.stock} onChange={change}/></div>
            <div className="col-md-3"><label>Rating</label><input type="number" step=".1" min="0" max="5" name="rating" value={form.rating} onChange={change}/></div>
            <div className="col-md-3"><label>Badge</label><input name="badge" value={form.badge} onChange={change}/></div>
            <div className="col-12"><label>Image URL</label><input required name="img_url" value={form.img_url} onChange={change}/></div>
            <div className="col-md-6"><label>Material</label><input name="material" value={form.material} onChange={change}/></div>
            <div className="col-md-6"><label>Color</label><input name="color" value={form.color} onChange={change}/></div>
            <div className="col-12"><label>Description</label><textarea required name="description" value={form.description} onChange={change}/></div>
            <div className="col-12"><label><input type="checkbox" name="featured" checked={form.featured} onChange={change}/> Featured product</label></div>
            <div className="col-12"><button className="btn btn-dark me-2">{editingId ? "Update Product" : "Add Product"}</button>{editingId && <button type="button" className="btn btn-outline-secondary" onClick={() => {setForm(blank);setEditingId(null)}}>Cancel</button>}</div>
          </div></form>
        </div>

        <div className="table-responsive admin-table">
          <table className="table align-middle">
            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>{products.map((p)=><tr key={p.id}><td><div className="table-product"><img src={p.img_url} alt={p.name}/><b>{p.name}</b></div></td><td>{p.category}</td><td>₹{Number(p.price).toLocaleString("en-IN")}</td><td>{p.stock}</td><td><button className="btn btn-sm btn-outline-dark me-2" onClick={()=>edit(p)}>Edit</button><button className="btn btn-sm btn-outline-danger" onClick={()=>remove(p.id)}>Delete</button></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
