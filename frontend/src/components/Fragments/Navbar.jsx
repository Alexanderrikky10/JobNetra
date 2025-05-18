import React, { useState, useEffect, useRef } from "react";
import { GiSuitcase } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="w-full fixed top-0 left-1/2 -translate-x-1/2 px-6 sm:px-12 py-2 flex justify-between items-center bg-white shadow-md z-50">
      {/* Logo */}
      <Link to="/" className="flex gap-1 items-center cursor-default">
        <GiSuitcase className="text-5xl text-[var(--primary-color)]" />
        <h1 className="text-xl font-bold text-[var(--primary-color)]">
          JobNetra
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-8">
        <Link
          to="/"
          className="relative text-[var(--text-nav)] font-bold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
        >
          Home
        </Link>
        <Link
          to="/jobs"
          className="relative text-[var(--text-nav)] font-bold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
        >
          Jobs
        </Link>
        <Link
          to="/tutorial"
          className="relative text-[var(--text-nav)] font-bold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
        >
          Tutorial
        </Link>

        <Link
          to="/about"
          className="relative text-[var(--text-nav)] font-bold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
        >
          About
        </Link>
      </div>

      {/* Desktop Button */}
      <Link
        to="/login"
        className="hidden sm:inline-block py-2 px-6 bg-[var(--secondary-color)] text-white font-semibold rounded-lg hover:bg-[var(--secondary-hover)]"
      >
        Sign In
      </Link>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="sm:hidden text-2xl text-[var(--primary-color)] hover:text-[var(--primary-hover)] cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`absolute top-full left-0 w-full bg-white shadow-md sm:hidden flex flex-col gap-4 px-10 transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <Link
          to="/"
          className="text-center relative text-[var(--text-nav)] font-semibold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/jobs"
          className="text-center relative text-[var(--text-nav)] font-semibold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
          onClick={() => setMenuOpen(false)}
        >
          Jobs
        </Link>
        <Link
          to="/tutorial"
          className="text-center relative text-[var(--text-nav)] font-semibold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
          onClick={() => setMenuOpen(false)}
        >
          Tutorial
        </Link>

        <Link
          to="/about"
          className="text-center relative text-[var(--text-nav)] font-semibold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/signin"
          className="py-2 px-6 bg-[var(--secondary-color)] text-white font-semibold rounded-lg hover:bg-[var(--secondary-hover)] text-center"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
