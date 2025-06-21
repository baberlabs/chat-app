import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { BotMessageSquare } from "lucide-react";

const RegisterPage = () => {
  const { register, isRegistering } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-gray-100">
      <div className="bg-gray-800/80 rounded-xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-extrabold flex flex-row-reverse items-center gap-3 mb-2 text-blue-400 drop-shadow">
          <BotMessageSquare size={36} /> Chatr
        </h1>
        <form
          className="mt-6 w-full"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-bold mb-8 text-center text-white tracking-tight">
            Register
          </h2>
          <div className="mb-5">
            <label
              className="block text-sm font-semibold mb-2 text-gray-300"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-5">
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
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-7">
            <label
              className="block text-sm font-semibold mb-2 text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition pr-16"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 text-xs font-semibold px-2 py-1 rounded focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`mt-2 w-full p-3 rounded-lg font-bold transition duration-200 ${
              isRegistering
                ? "bg-blue-900 text-blue-200 cursor-progress italic"
                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer shadow-md"
            }`}
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-300 underline hover:text-blue-400 transition"
          >
            Login here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
