import registerImg from "../assets/register-img.jpg";
import React, { useEffect, useState } from "react";
import { registerUser } from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = "Register | Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Create a Holidaze account to book venues or manage your own listings.",
      );
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    let isValid = true;

    if (formData.name.length < 3) {
      newErrors.name = "Name must be minimum 3 characters";
      isValid = false;
    }

    if (!formData.email.endsWith("@stud.noroff.no")) {
      newErrors.email = "Email must be a stud.noroff.no email";
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const [accountType, setAccountType] = useState<"customer" | "manager">(
    "customer",
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    const registerData = {
      ...formData,
      venueManager: accountType === "manager",
    };

    try {
      await registerUser(registerData);
      toast.success("Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.errors?.[0]?.message || "Registration failed",
      );
    }
  };

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-[#F9F5F0] via-[#D4BFAC] to-[#C9B39A] flex flex-col items-center justify-center px-6 pb-16 ">
      <div className="text-center mb-10 mt-10">
        <h1 className="auth-heading">Welcome to Holidaze</h1>
        <p className="body-text mt-2">Enter details to create an account</p>
      </div>
      <div className="w-full max-w-xl lg:max-w-5xl bg-primary shadow-md grid grid-cols-1 lg:grid-cols-2 ">
        {/* LEFT SIDE (FORM) */}
        <div className="p-10">
          <h2 className=" text-2xl lg:text-3xl font-semibold font-serif text-center mb-6">
            Register
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <p className="body-text font-medium mb-2">Select account type</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType("customer")}
                  className={`border px-4 py-2 body-text ${
                    accountType === "customer"
                      ? "bg-[#cea022] text-[#0B1A44]"
                      : "bg-white"
                  }`}
                >
                  Customer
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("manager")}
                  className={`border px-4 py-2 body-text ${
                    accountType === "manager"
                      ? "bg-[#cea022] text-[#0B1A44]"
                      : "bg-white"
                  }`}
                >
                  Venue Manager
                </button>
              </div>

              <div className="mt-4 bg-white p-4">
                <h3 className="font-semibold mb-1">
                  {accountType === "customer"
                    ? "Customer account"
                    : "Venue Manager account"}
                </h3>

                <p className="body-text text-gray-600">
                  {accountType === "customer"
                    ? "A customer account is used for booking venues whenever you want. If you want to add and manage your own venues, switch to Venue Manager."
                    : "A venue manager account is used for adding and managing your own venues. If you only want to book venues, switch to Customer account."}
                </p>
              </div>
            </div>
            {/* Name */}
            <div>
              <label className="block body-text font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Sara"
                className="input-field"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              ) : (
                <p className="mt-1 text-xs text-[#454545]">
                  Minimum 3 characters
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block body-text font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sara@stud.noroff.no"
                className="input-field"
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              ) : (
                <p className="mt-1 text-xs text-[#454545]">
                  Must be a stud.noroff.no email
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block body-text font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="********"
                className="input-field"
              />
              {/* Conditional text */}
              {errors.password ? (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              ) : (
                <p className="mt-1 text-xs text-[#454545]">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Button */}
            <button className="w-full bg-[#303437] text-white py-2 text-base font-semi-bold mt-4 transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44]">
              Register
            </button>

            {/* Login link */}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#303437] font-bold hover:underline cursor-pointer"
                aria-label="Login account"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="hidden lg:block shadow-md">
          <img
            src={registerImg}
            alt="register"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
