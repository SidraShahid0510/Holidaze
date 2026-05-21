import loginImg from "../assets/login-img.jpg";
import React, { useEffect, useState } from "react";
import { loginUser } from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = "Login | Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Login to your Holidaze account to manage bookings and venues.",
      );
    }
  }, []);

  // updates input values
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

  // checks if login form fields are valid
  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

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

  //  form submission after validation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await loginUser(formData);

      localStorage.setItem("user", JSON.stringify(response.data));
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful!");
      navigate("/profile");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.errors?.[0]?.message || "Login failed",
      );
    }
  };

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-[#F9F5F0] via-[#D4BFAC] to-[#C9B39A] flex flex-col items-center justify-center px-6 pb-16">
      <div className="text-center mb-10">
        <h1 className="auth-heading">Welcome to Holidaze</h1>
        <p className="body-text mt-2">Enter details to login</p>
      </div>

      <div className="w-full max-w-xl lg:max-w-5xl bg-primary shadow-md grid grid-cols-1 lg:grid-cols-2 ">
        <div className="p-10">
          <h2 className="text-2xl lg:text-3xl font-semibold font-serif text-center mb-6">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <div>
              <label className="block body-text font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="input-field"
              />
              {errors.password ? (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              ) : (
                <p className="mt-1 text-xs text-[#454545]">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            <button className="w-full bg-[#303437] text-white py-2 text-base font-semi-bold mt-4 transition-all duration-300 hover:bg-[#cea022] hover:text-[#0B1A44] ">
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#303437] font-bold hover:underline"
                aria-label="Register account"
              >
                Register
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden lg:block shadow-md">
          <img
            src={loginImg}
            alt="login image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
