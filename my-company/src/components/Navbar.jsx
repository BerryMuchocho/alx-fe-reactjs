import { Link } from "react-router-dom";

function Navbar() {
    const navStyle = {
        padding: "10px",
        backgroundColor: "#333",
        display: "flex",
        gap: "15px"
    };
    const linkStyle = {
        color: "white",
        textDecoration: "none"
    };

    return (
        <nav style={navStyle}>
            <Link style={linkStyle} to="/">Home</Link>
            <Link style={linkStyle} to="/about">About</Link>
            <Link style={linkStyle} to="/services">Services</Link>
            <Link style={linkStyle} to="/contact">Contact</Link>
        </nav>
    );
}

export default Navbar;
