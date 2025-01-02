import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <span className="text-xl py-4 font-bold">
            Developed & Maintained By:{" "}
            <strong>IT-Section, MECON LIMITED</strong> ©2024
          </span>
        </div>

        <p className="text-sm mb-4">
          MECON LIMITED, A GOVT. OF INDIA ENTERPRISE
        </p>

        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com/meconranchi/"
            className="text-gray-300 hover:text-blue-500 transition"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCqBdP1-rDC70B5YpzG8vSVA"
            className="text-gray-300 hover:text-red-500 transition"
            aria-label="YouTube"
          >
            <FaYoutube className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/meconranchi"
            className="text-gray-300 hover:text-pink-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/meconlimited"
            className="text-gray-300 hover:text-blue-400 transition"
            aria-label="Twitter"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/mecon-limited-india"
            className="text-gray-300 hover:text-blue-700 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
