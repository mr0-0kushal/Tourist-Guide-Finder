import React, { useState , useEffect } from "react";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
  import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav className={`navbar transition-all duration-300  ${
        scrolled ? "" : "bg-transparent"
      }`}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <h1 className="font-extrabold text-4xl logo gradient-text">E-Guide</h1>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavHashLink
                exact
                to="#home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavHashLink>
            </li>
            <li className="nav-item">
              <NavHashLink
                smooth
                to="#about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavHashLink>
            </li>
            <li className="nav-item">
              <NavHashLink
                smooth
                to="#blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </NavHashLink>
            </li>
            <li className="nav-item">
              <NavHashLink
                smooth
                to="#contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavHashLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {!click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;