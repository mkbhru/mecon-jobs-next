import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [zoomLevel, setZoomLevel] = useState(1); // State to manage zoom level

  const handleZoom = (zoomType) => {
    let newZoomLevel = zoomLevel;
    if (zoomType === "decrease") {
      newZoomLevel = Math.max(zoomLevel - 0.1, 0.8); // Prevent zoom below 50%
    } else if (zoomType === "default") {
      newZoomLevel = 1; // Reset to 100%
    } else if (zoomType === "increase") {
      newZoomLevel = Math.min(zoomLevel + 0.1, 1.5); // Prevent zoom above 200%
    }
    setZoomLevel(newZoomLevel);
    document.body.style.zoom = newZoomLevel; // Apply zoom to the body
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          {/* MECON Logo */}
          <Image
            src="/mecon.png"
            alt="MECON Logo"
            width={64}
            height={64}
            style={{ height: "auto" }} // Ensures aspect ratio is preserved
          />
          <div>
            <h1 className="text-lg  md:text-2xl font-bold text-blue-700 text-center md:text-left">
              MECON LIMITED
            </h1>
            <h4 className="text-sm md:text-base font-bold text-center md:text-left">
              A GOVT. OF INDIA ENTERPRISE
            </h4>
          </div>
        </div>

        {/* Center Section - Responsive Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="#" className="text-blue-600 text-sm">
            Screen Reader
          </Link>
          <Link href="#" className="text-blue-600 text-sm">
            Skip To Navigation
          </Link>
          <Link href="#" className="text-blue-600 text-sm">
            Skip To Main Content
          </Link>
          <div className="flex space-x-2">
            <button
              onClick={() => handleZoom("decrease")}
              className="bg-gray-100 text-sm px-2 py-1"
            >
              A-
            </button>
            <button
              onClick={() => handleZoom("default")}
              className="bg-gray-100 text-sm px-2 py-1"
            >
              A
            </button>
            <button
              onClick={() => handleZoom("increase")}
              className="bg-gray-100 text-sm px-2 py-1"
            >
              A+
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="hidden">
          <button className="text-blue-600 text-sm">☰ Menu</button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            <Image
              src="/bbbp.png"
              alt="Beti Bachao Beti Padhao"
              width={48}
              height={48}
              className="w-12 h-12 ml-1"
            />
            <Image
              src="/har.png"
              alt="Harekkamdeshknam"
              width={64}
              height={32}
              style={{ height: "auto" }} // Ensures aspect ratio is preserved
              className="w-16 h-auto"
            />
            <Image
              src="/logoakm.png"
              alt="azadi ka amritmahotsav"
              width={64}
              height={32}
              style={{ height: "auto" }} // Ensures aspect ratio is preserved
              className="w-16"
            />
            <Image
              src="/swach-bharat.jpg"
              alt="swach bharat"
              width={64}
              height={32}
              style={{ height: "auto" }} // Ensures aspect ratio is preserved
              className="w-16"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
