import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import logo from "./logo.png";
import { Cpu, HardDrive, Cable } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (loginError) {
        alert(loginError.message);
        return;
      }

      // ✅ Try to fetch role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("email", email.toLowerCase())
        .single();


      if (roleError || !roleData) {
        console.log("Role Error:", roleError);
        alert("Login succeeded, but no role found. Contact admin.");
        return;
      }

      localStorage.setItem("userRole", roleData?.role);
      {roleData?.role == "admin" ? navigate("/Home"): navigate("/Product")};
    } catch (err) {
      console.error("Unexpected error during login:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-16 relative z-0">
        <div className="bg-[#3B73ED] rounded-[75px] h-[150px] w-[150px] absolute top-[10vh] left-[5%] -z-1" />
        <div className="bg-[#3B73ED] rounded-full h-[300px] w-[300px] absolute top-[32vh] left-[30%] -z-10 opacity-80" />
        <div className="bg-[#3B73ED] rounded-full h-[200px] w-[200px] absolute top-[40vh] left-[60%] -z-10 opacity-50" />

        <div className="absolute top-6 left-6 z-10 w-[100%]">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <img
              src={logo}
              alt="MyShopDesk logo"
              className="w-[10%] bg-black rounded-full"
            />
            MyShopDesk
          </h1>
        </div>
        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-4 z-10">
            MyShopDesk Management
          </h2>
          <p className="text-lg mb-8">
            Streamline your electronics store operations with our comprehensive
            management solution.
          </p>
          <ul className="space-y-4 z-10">
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <Cpu />
              </span>{" "}
              Inventory tracking with real-time updates
            </li>
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <HardDrive />
              </span>{" "}
              Detailed sales analytics and reporting
            </li>
            <li className="flex items-center">
              <span className="mx-2 bg-[#5182EF] rounded-[25px] w-[50px] h-[50px] flex justify-center items-center">
                <Cable />
              </span>{" "}
              Smart customer relationship management
            </li>
          </ul>
        </div>
        <footer className="absolute bottom-6 text-sm text-white/80 z-10">
          © 2025 MyShopDesk Management. All rights reserved.
        </footer>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isSignUp ? "Create an Account" : "Login to your Account"}
          </h2>
          <form className="space-y-4" onSubmit={handleAuth}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500 text-center">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 hover:underline hover:cursor-pointer"
                >
                  Log in
                </button>
              </>
            ) : null}
          </div>
          {isSignUp ? null : (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Forgot Password?
              <label
                onClick={() => {
                  navigate("/PasswordReset");
                }}
                htmlFor=""
                className="text-blue-600 mx-2 hover:cursor-pointer hover:underline"
              >
                Forgot
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
