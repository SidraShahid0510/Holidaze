import logo from "../assets/white-logo.svg";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#303437] px-6 py-12 text-white md:px-10 lg:px-16">
      <div className="mx-auto">
        <div className="grid gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
          {/* Left side */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="Holidaze logo" className="h-6 lg:h-8 w-auto" />

            <p className="mt-4 max-w-xs text-[0.9rem] leading-6 text-white/80 md:text-left">
              At Holidaze, our mission is to create meaningful stays through
              carefully selected spaces and seamless experiences. We aim to
              connect travellers with places that feel considered, comfortable,
              and true to their journey.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-[1rem] font-semibold">Link</h3>
            <ul className="space-y-2 text-[0.9rem] text-white/80">
              <li>
                <a href="/#home" className="footer-link">
                  Home
                </a>
              </li>

              <li>
                <a href="/#venues" className="footer-link">
                  Venues
                </a>
              </li>
              <li className="footer-item">Packages</li>
              <li className="footer-item">Gallery</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-[1rem] font-semibold">Explore</h3>
            <ul className="space-y-2 text-[0.9rem] text-white/80">
              <li className="footer-item">Seasonal Packages</li>
              <li className="footer-item">Apartment</li>
              <li className="footer-item">Message & Wishes</li>
              <li className="footer-item">Apartments</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-[1rem] font-semibold">Contact</h3>
            <ul className="space-y-2 text-[0.9rem] text-white/80">
              <li className="footer-item">Contact us</li>
              <li className="footer-item">Privacy Policy</li>
              <li className="footer-item">FAQ</li>
              <li className="footer-item">Cancellation Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-white/20 pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-[0.85rem] text-white/70">
            © Copyright 2026 Holidaze
          </p>

          <div className="flex flex-col items-center gap-3 md:flex-row">
            <span className="text-[0.85rem] text-white/70">Follow us</span>

            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white"
                aria-label="Visit our Facebook page"
              >
                <FaFacebookF className="text-xs" />
              </a>

              <a
                href="https://www.instagram.com/"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white"
                aria-label="Visit our Instagram page"
              >
                <FaInstagram className="text-xs" />
              </a>

              <a
                href="https://x.com/"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white"
                aria-label="Visit our X (Twitter) page"
              >
                <FaTwitter className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
