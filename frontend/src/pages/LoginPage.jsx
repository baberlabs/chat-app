import { use, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { BotMessageSquare } from "lucide-react";

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100">
      <div className="bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-extrabold flex items-center gap-3 mb-8 text-blue-400 drop-shadow-lg">
          <BotMessageSquare size={36} className="text-blue-500" />
          Chatr
        </h1>
        <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">
            Welcome
          </h2>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2 text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2 text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`mt-2 w-full p-3 rounded-lg font-bold transition-colors ${
              isLoggingIn
                ? "bg-blue-900 text-white cursor-progress italic opacity-70"
                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            }`}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging In..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 underline hover:text-blue-300 transition"
          >
            Register here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
