import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import AddPropertyModal from "./AddPropertyModal";
import useAuthCheck from "../hooks/useAuthCheck";

const Navbar = ({ containerStyles }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };
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
      <div onClick={handleAddPropertyClick} className={"py-1 cursor-pointer"}>
        Add Property
      </div>
      <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
    </nav>
  );
};
Navbar.propTypes = {
  containerStyles: PropTypes.string.isRequired,
};

export default Navbar;
