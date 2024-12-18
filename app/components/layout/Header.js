import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaHome } from "react-icons/fa";
import logo from '../../../public/wall.jpg';

function Header() {
  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div>
            <a
              href="http://www.meconlimited.co.in/"
              rel="noopener noreferrer"
              className="btn"
            >
              <FaHome className="text-xl" />Main Website
            </a>
          </div>
        </div>
        <div className="navbar-center">
          <a className="text-xl font-bold">Mecon Jobs</a>
        </div>
        <div className="navbar-end">
          <a
            href="https://twitter.com/meconlimited"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <FaTwitter className="text-xl" />
          </a>

          <a
            href="https://www.instagram.com/meconranchi"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <FaInstagram className="text-xl" />
          </a>

          <a
            href="https://www.linkedin.com/company/mecon-limited-india"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
