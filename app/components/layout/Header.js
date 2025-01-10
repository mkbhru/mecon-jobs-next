"use client";
import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHome,
  FaExternalLinkAlt,
} from "react-icons/fa";
import logo from "../../../public/wall.jpg";
import { usePathname } from "next/navigation";
import LogoutButton from "../cms/LogoutButton";
import GoToDashboardButton from "../cms/GoToDashboardButton";

function Header() {
  const router = usePathname();
  const isCmsRoute = router.startsWith("/cms");
  const headerText = isCmsRoute
    ? "MECON Careers Management System"
    : "MECON Career Opportunities";

  const isLoginRoute = router === "/cms/login";
  return (
    <>
      {
        <>
          <div className="navbar bg-gray-300">
            <div className="navbar-start">
              <div>
                <>
                  {isCmsRoute ? (
                    <>
                      <GoToDashboardButton />
                      <button
                        onClick={() => window.open("/", "_blank")}
                        className="btn btn-primary font-bold ml-2"
                      >
                        <FaExternalLinkAlt />
                        Preview Career Page
                      </button>
                    </>
                  ) : (
                    <a
                      href="http://www.meconlimited.co.in/"
                      // target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-gray-200"
                    >
                      <FaHome className="text-xl" />
                      Main Website
                    </a>
                  )}
                </>
              </div>
            </div>
            <div className="navbar-center">
              <a className="text-xl font-bold">{headerText}</a>
            </div>
            <div className="navbar-end">
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
          </div>
        </>
      }
    </>
  );
}

export default Header;
