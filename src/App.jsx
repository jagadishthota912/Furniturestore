import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

function UserProtectedRoute({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search, message: "Please login to continue." }} />;
  }
  return children;
}

function AdminProtectedRoute({ children }) {
  const location = useLocation();
  const admin = JSON.parse(localStorage.getItem("furnitureHubAdmin") || "null");
  if (!admin?.authenticated || admin.role !== "admin") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname, message: "Admin login is required." }} />;
  }
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<UserProtectedRoute><OrderSuccess /></UserProtectedRoute>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<UserProtectedRoute><MyOrders /></UserProtectedRoute>} />
          <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admindashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
