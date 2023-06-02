import "styles/Navbar.css";

import { useAuth } from "auth/useAuth";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { signout } = useAuth();

  const linkStyle = {
    color: "white",
    fontWieght: "bold",
  };

  return (
    <nav role="navigation" className="navbar is-info is-fixed-top">
      <div className="navbar-item">
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
      </div>

      <div className="navbar-item">
        <NavLink to="/posts" style={linkStyle}>
          Posts
        </NavLink>
      </div>

      <div className="navbar-item">
        <div
          onClick={signout}
          onMouseOver={(e) => {
            e.currentTarget.style.cursor = "pointer";
          }}
          onFocus={(e) => {
            e.currentTarget.style.cursor = "pointer";
          }}
          style={linkStyle}
        >
          Sign Out
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
