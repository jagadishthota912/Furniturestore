import { Link } from "react-router-dom";
export default function NotFound(){return <section className="empty-page"><div><h1>404</h1><p>Page not found.</p><Link to="/" className="btn btn-dark">Back Home</Link></div></section>}
