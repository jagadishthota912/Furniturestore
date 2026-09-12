import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { findAdminByEmail } from "../../services";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await findAdminByEmail(email.trim().toLowerCase());
      const admin = response.data.find((x) => x.role === "admin" && x.password === password);
      if (!admin) {
        setError("Invalid admin email or password.");
        return;
      }
      localStorage.setItem("furnitureHubAdmin", JSON.stringify({ authenticated: true, id: admin.id, role: admin.role, email: admin.email, name: admin.name }));
      navigate(location.state?.from || "/admindashboard", { replace: true });
    } catch {
      setError("Unable to connect to the database. Start JSON Server first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span>SECURE ADMIN AREA</span>
        <h1>Admin sign in</h1>
        {location.state?.message && <div className="alert alert-warning">{location.state.message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          <button disabled={loading} className="btn btn-dark btn-lg w-100 mt-3">{loading ? "Verifying..." : "Admin Login"}</button>
        </form>
      </div>
    </section>
  );
}
