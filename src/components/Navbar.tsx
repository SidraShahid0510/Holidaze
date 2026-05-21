import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import type { User } from "../types/user";
import toast from "react-hot-toast";

function Navbar() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isLoggedIn = !!user;
  const avatarUrl = user?.avatar?.url || "https://i.pravatar.cc/40";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    setIsOpen(false);

    toast.success("Logged out successfully");
    navigate("/");
  };
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
      <div className="w-full px-8 md:px-10 lg:px-16 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Holidaze Logo"
            className=" h-4 md:h-5 lg:h-6 w-auto"
          />
        </Link>

        {/* Nav links */}
        <nav>
          {isLoggedIn ? (
            <div ref={dropdownRef} className="relative">
              {/* Avatar button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
                aria-label="Open menu"
              >
                <img
                  src={avatarUrl}
                  alt={user?.name || "User"}
                  className="h-10 w-10  rounded-full object-cover"
                />
                <FaChevronDown className="text-xs" />
              </button>

              {/* Dropdown (always visible for now) */}
              {isOpen && (
                <div className="absolute right-0 mt-5 w-52  bg-white shadow-md border">
                  <div
                    className="p-4 border-b flex items-center gap-4
                "
                  >
                    <img
                      src={avatarUrl}
                      alt={`${user?.name || "User"} avatar`}
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <p className="font-semibold text-sm">
                      {user?.name
                        ?.split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </p>
                  </div>

                  <ul className="text-sm py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 ">
                      <Link to="/profile" aria-label="Go to profile">
                        Profile
                      </Link>
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ul className="flex items-center gap-6 uppercase">
              <li>
                <Link
                  to="/register"
                  className="nav-links text-sm md:text-base hover:text-[#cea022] transition-colors "
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="nav-links text-sm md:text-base hover:text-[#cea022] transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
