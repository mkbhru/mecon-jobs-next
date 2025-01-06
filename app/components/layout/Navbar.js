import Image from "next/image";
import Link from "next/link";
import Header from "./Header";

const Navbar = () => {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center p-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* MECON Logo */}
          <Image
            src="/mecon.png"
            alt="MECON Logo"
            width={64}
            height={64}
            className="w-16 h-16"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-700">MECON LIMITED</h1>
            <h4 className="font-bold">A GOVT. OF INDIA ENTERPRISE</h4>
          </div>
        </div>

        {/* Center Section */}
        <nav className="flex items-center space-x-4">
          <Link href="" className="text-blue-600 text-sm">
            Screen Reader
          </Link>
          <Link href="#" className="text-blue-600 text-sm">
            Skip To Navigation
          </Link>
          <Link href="#" className="text-blue-600 text-sm">
            Skip To Main Content
          </Link>
          <div className="flex space-x-2">
            <button className="bg-gray-100 text-sm px-2 py-1">A-</button>
            <button className="bg-gray-100 text-sm px-2 py-1">A</button>
            <button className="bg-gray-100 text-sm px-2 py-1">A+</button>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="absolute right-3 top-2 text-gray-500">🔍</button>
          </div> */}
          {/* Logos */}
          <div className="flex space-x-4">
            <Image
              src="/bbbp.png"
              alt="Beti Bachao Beti Padhao"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            {/* <Image
              src="/hek.jpg"
              alt="Har Ek Kaam Desh Ke Naam"
              width={64}
              height={32}
              className="w-16 h-8"
            /> */}
            <Image
              src="/logoakm.png"
              alt="azadi ka amritmahotsav"
              width={64}
              height={32}
              className="w-16 h-8"
            />
            <Image
              src="/swach-bharat.jpg"
              alt="swach bharat"
              width={64}
              height={32}
              className="w-16 h-8"
            />
          </div>
        </div>
      </div>
      <Header />
    </header>
  );
};

export default Navbar;
