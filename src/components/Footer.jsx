import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h3><span className="brand-box">F</span> Furniture Hub</h3>
            <p>Beautiful furniture for modern homes. This project is built as a frontend e-commerce learning application using React, Redux Toolkit and JSON Server.</p>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Shop</h6>
            <Link to="/shop">All Products</Link>
            <Link to="/category/Sofa">Sofas</Link>
            <Link to="/category/Bed">Beds</Link>
            <Link to="/category/Table">Tables</Link>
          </div>
          <div className="col-6 col-lg-2">
            <h6>Account</h6>
            <Link to="/profile">My Profile</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="col-lg-4">
            <h6>Customer Care</h6>
            <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
            <p><i className="bi bi-envelope me-2"></i>support@furniturehub.demo</p>
            <p><i className="bi bi-telephone me-2"></i>+91 90000 00000</p>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">© 2026 Furniture Hub • Built for learning</div>
      </div>
    </footer>
  );
}
