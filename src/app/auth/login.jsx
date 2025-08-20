"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import loginService from "@/app/services/loginService";
import signupService from "@/app/services/signupService";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setUsername("");
    setPhone("");
  };

  // Handle back button click
  const handleBack = () => {
    router.push("/"); // Redirect to the main page
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const obj = {
      email: email,
      password: password,
    };

    try {
      const response = await loginService.login(obj);
      if (response.status === 200) {
        // Check if the user is an admin
        const isAdmin = response.data.user.roles.some(
          (role) => role.name === "admin"
        );

        if (isAdmin) {
          // Redirect to the dashboard if the user is an admin
          router.push("/dashboard");
        } else {
          // Redirect to the home page for regular users
          router.push("/");
        }

        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          variant: "default",
        });
      } else {
        toast({
          title: "Login Failed",
          description:
            response.message?.data?.error || "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async () => {
    // Check if all fields are filled
    if (!name || !email || !username || !phone || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number format (assuming phone should be numeric and 10 digits long)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Validation Error",
        description:
          "Phone number must be 10 digits long and contain only numbers.",
        variant: "destructive",
      });
      return;
    }

    // If all validations pass, proceed with signup
    const obj = {
      name,
      email,
      username,
      phone,
      password,
    };

    try {
      const response = await signupService.register(obj);

      if (response.status >= 200 && response.status < 300) {
        router.push("/");
        toast({
          title: "Account Created",
          description: "Your account has been created successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "Signup Failed",
          description:
            response.message || "An error occurred during registration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex min-h-screen flex-col justify-center items-center bg-slate-900 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md transition-transform transform duration-300 ease-in-out">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-black transition-colors duration-200 mb-4"
        >
          <FaArrowLeft className="mr-2" />
        </button>

        <div className="flex justify-between mb-4 border-b pb-2">
          <button
            className={`w-1/2 text-center py-2 transition-colors duration-300 ${
              activeTab === "login"
                ? "font-bold border-b-2 border-black "
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("login");
              resetForm();
            }}
          >
            Login
          </button>
          <button
            className={`w-1/2 text-center py-2 transition-colors duration-300 ${
              activeTab === "signup"
                ? "font-bold border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("signup");
              resetForm();
            }}
          >
            Sign Up
          </button>
        </div>

        <div className="transition-opacity duration-300 ease-in-out">
          {activeTab === "login" ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">Login</h2>
              <p className="text-gray-600 mb-4">
                Enter your credentials to access your account.
              </p>
              <input
                className="w-full p-2 mb-2 border rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative w-full">
                <input
                  className="w-full p-2 mb-4 border rounded pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-3 top-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                className="w-full py-2 bg-black text-white rounded hover:bg-gray-900 transition"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-2">Sign Up</h2>
              <p className="text-gray-600 mb-4">
                Create a new account to get started.
              </p>
              <input
                className="w-full p-2 mb-2 border rounded"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="w-full p-2 mb-2 border rounded"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="relative w-full">
                <input
                  className="w-full p-2 mb-4 border rounded pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-3 top-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                className="w-full py-2 bg-black text-white rounded hover:bg-gray-900 transition"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
