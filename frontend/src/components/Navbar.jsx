import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ containerStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Home
      </NavLink>
      <NavLink
        to="/listing"
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Listing
      </NavLink>
      <NavLink
        to="mailto:obianslem15@gmail.com"
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Contact
      </NavLink>
      <NavLink
        to="/add-property"
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Add Property
      </NavLink>
    </nav>
  );
};
Navbar.propTypes = {
  containerStyles: PropTypes.string.isRequired,
};

export default Navbar;
