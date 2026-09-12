import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { findUserByEmail } from "../services";

export default function Login() {
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
      const response = await findUserByEmail(email.trim().toLowerCase());
      const user = response.data.find((x) => x.role !== "admin" && x.password === password);

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      const { password: _password, ...safeUser } = user;
      localStorage.setItem("loggedInUser", JSON.stringify(safeUser));
      navigate(location.state?.from || "/");
    } catch {
      setError("Unable to login. Make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span>WELCOME BACK</span>
        <h1>Login to Furniture Hub</h1>
        {location.state?.message && <div className="alert alert-warning">{location.state.message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

          <button disabled={loading} className="btn btn-dark btn-lg w-100 mt-3">
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <p>Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </section>
  );
}
