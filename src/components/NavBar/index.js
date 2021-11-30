import { Collapse, Navbar, NavbarToggler, NavItem, Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./style.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(n => !n);
  }

  return (
    <div>
      <Navbar color="dark" expand="md" dark>
        <NavLink to="/" className="navbar-brand">Jobly</NavLink>
        
        <NavbarToggler onClick={toggleOpen} />
        
        <Collapse navbar isOpen={isOpen}>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Sign Up</NavLink>
            </NavItem>
          </Nav>
        
        </Collapse>
      </Navbar>
      </div>
  );
}

export default NavBar;