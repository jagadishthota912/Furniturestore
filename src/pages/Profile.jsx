import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) return <section className="empty-page"><div><i className="bi bi-person-circle"></i><h1>Login required</h1><p>Please log in to view your account.</p><button className="btn btn-dark" onClick={() => navigate("/login")}>Login</button></div></section>;
  const logout = () => { localStorage.removeItem("loggedInUser"); navigate("/"); };
  return <section className="profile-page"><div className="profile-card"><div className="profile-avatar"><i className="bi bi-person"></i></div><h1>{user.name}</h1><p>{user.email}</p><div className="profile-row"><span>Phone</span><b>{user.phone}</b></div><div className="profile-row"><span>Address</span><b>{user.address}</b></div><button className="btn btn-dark w-100 mt-3" onClick={() => navigate("/orders")}>My Orders</button><button className="btn btn-outline-danger w-100 mt-2" onClick={logout}>Logout</button></div></section>;
}
