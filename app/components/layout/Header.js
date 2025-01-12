"use client";
import React, { useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHome,
  FaExternalLinkAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import LogoutButton from "../cms/LogoutButton";
import GoToDashboardButton from "../cms/GoToDashboardButton";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = usePathname();
  const isCmsRoute = router.startsWith("/cms");
  const headerText = isCmsRoute
    ? "MECON Careers Management System"
    : "MECON Career Opportunities";
  const isLoginRoute = router === "/cms/login";

  return (
    <header className="bg-gray-300">
      <div className="navbar px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center ">
          {isCmsRoute ? (
            <>
              <GoToDashboardButton />
              <button
                onClick={() => window.open("/", "_blank")}
                className="btn btn-primary font-bold ml-2 hidden md:flex"
              >
                <FaExternalLinkAlt className="mr-2" />
                Preview Career Page
              </button>
            </>
          ) : (
            <a
              href="http://www.meconlimited.co.in/"
              rel="noopener noreferrer"
              className="btn bg-gray-200"
            >
              <FaHome className="text-xl" />
              <span className="ml-2 hidden md:inline">Main Website</span>
            </a>
          )}
        </div>

        {/* Center Section */}
        <div className="navbar-center hidden md:flex">
          <a className="text-xl font-bold">{headerText}</a>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          <div className="hidden md:flex">
            <a
              href="https://twitter.com/meconlimited"
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-ghost"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://www.instagram.com/meconranchi"
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-ghost"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/company/mecon-limited-india"
              rel="noopener noreferrer"
              target="_blank"
              className="btn btn-ghost"
            >
              <FaLinkedin className="text-xl" />
            </a>
            {!isLoginRoute && isCmsRoute && <LogoutButton />}
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="btn btn-ghost md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-gray-200 p-4 flex flex-col items-center md:hidden">
          <a
            href="https://twitter.com/meconlimited"
            target="_blank"
            className="btn btn-ghost"
          >
            <FaTwitter className="text-xl" />{" "}
            <span className="ml-2">Twitter</span>
          </a>
          <a
            href="https://www.instagram.com/meconranchi"
            target="_blank"
            className="btn btn-ghost"
          >
            <FaInstagram className="text-xl" />{" "}
            <span className="ml-2">Instagram</span>
          </a>
          <a
            href="https://www.linkedin.com/company/mecon-limited-india"
            target="_blank"
            className="btn btn-ghost"
          >
            <FaLinkedin className="text-xl" />{" "}
            <span className="ml-2">LinkedIn</span>
          </a>
          {!isLoginRoute && isCmsRoute && <LogoutButton />}
          {isCmsRoute && (
            <button
              onClick={() => window.open("/", "_blank")}
              className="btn btn-primary font-bold mt-4"
            >
              Preview Career Page
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
