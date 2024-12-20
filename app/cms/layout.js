"use client";

import Footer from "../components/layout/Footer";

export default function CmsLayout({ children }) {
  return (
    <>
      <div className="fixed inset-0 bg-white overflow-auto ">
        {/* Local Navbar */}
        <div className="navbar bg-primary text-primary-content">
          <a className="btn btn-ghost normal-case text-xl">CMS Dashboard</a>
          <div className="flex-1"></div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              document.cookie =
                "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              window.location.href = "/cms/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/* Main CMS Content */}
      <main className="p-14">{children}</main>
      <Footer/>
    </>
  );
}
