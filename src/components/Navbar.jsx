import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const wishlistCount = useSelector(
    (state) => state.wishlist.items.length
  );

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const submitSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(search.trim())}`
      );
    }
  };

  return (
    <>
      <div className="top-strip">
        Free delivery on orders above ₹50,000{" "}
        <span>•</span> Easy 7-day returns
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top main-nav">
        <div className="container">

          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <span className="brand-box">F</span>

            <span>
              Furniture <b>Hub</b>
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav">

            {/* Navigation Links */}
            <ul className="navbar-nav mx-lg-auto gap-lg-2">

              <li>
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink className="nav-link" to="/shop">
                  Shop
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="nav-link"
                  to="/category/Sofa"
                >
                  Sofas
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="nav-link"
                  to="/category/Bed"
                >
                  Bedroom
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="nav-link"
                  to="/category/Table"
                >
                  Dining
                </NavLink>
              </li>

            </ul>

            {/* Search */}
            <form
              className="nav-search"
              onSubmit={submitSearch}
            >
              <i className="bi bi-search"></i>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search furniture..."
              />
            </form>

            {/* Navbar Actions */}
            <div className="nav-actions">

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="icon-link"
                title="Wishlist"
              >
                <i className="bi bi-heart"></i>

                {wishlistCount > 0 && (
                  <span>{wishlistCount}</span>
                )}
              </Link>

              {/* Account */}
              <Link
                to={loggedInUser ? "/profile" : "/login"}
                className="icon-link"
                title="Account"
              >
                <i className="bi bi-person"></i>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="icon-link"
                title="Cart"
              >
                <i className="bi bi-bag"></i>

                {cartCount > 0 && (
                  <span>{cartCount}</span>
                )}
              </Link>

              {/* Admin Login */}
              <Link
                to="/admin/login"
                className="btn btn-dark ms-2 admin-login-btn"
                title="Admin Login"
              >
                <i className="bi bi-shield-lock me-1"></i>
                Admin
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}