import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail, registerUser } from "../services";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const email = form.email.trim().toLowerCase();
      const existing = await findUserByEmail(email);

      if (existing.data.length) {
        setError("Email already registered. Please login.");
        return;
      }

      const response = await registerUser({
        name: form.name.trim(),
        email,
        phone: form.phone.trim(),
        address: form.address.trim(),
        password: form.password,
        role: "user",
        createdAt: new Date().toISOString()
      });

      const user = response.data;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError("Registration failed. Make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span>FURNITURE HUB</span>
        <h1>Create your account</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit}>
          <label>Full name</label>
          <input required name="name" value={form.name} onChange={change} />

          <label>Email</label>
          <input required type="email" name="email" value={form.email} onChange={change} />

          <label>Phone</label>
          <input required name="phone" value={form.phone} onChange={change} />

          <label>Address</label>
          <textarea required name="address" value={form.address} onChange={change} />

          <label>Password</label>
          <input required minLength="6" type="password" name="password" value={form.password} onChange={change} />

          <button disabled={loading} className="btn btn-dark btn-lg w-100 mt-3">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </div>
    </section>
  );
}
