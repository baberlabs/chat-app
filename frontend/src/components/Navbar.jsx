import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquareText, Settings, User } from "lucide-react";

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <aside className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-xl border-r border-gray-800 min-h-screen flex flex-col justify-between w-20">
      <nav className="flex flex-col items-center py-8 space-y-8">
        <li className="list-none">
          {authUser ? (
            <Link
              to="/"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-indigo-600 transition-all shadow-lg"
              title="Chats"
            >
              <MessageSquareText
                className="text-gray-100 group-hover:text-white transition"
                size={28}
              />
            </Link>
          ) : (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 cursor-not-allowed">
              <MessageSquareText className="text-gray-500" size={28} />
            </div>
          )}
        </li>
        <li className="list-none">
          {authUser ? (
            <Link
              to="/profile"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-indigo-600 transition-all shadow-lg"
              title="Profile"
            >
              <User
                className="text-gray-100 group-hover:text-white transition"
                size={28}
              />
            </Link>
          ) : (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 cursor-not-allowed">
              <User className="text-gray-500" size={28} />
            </div>
          )}
        </li>
        <li className="list-none">
          <Link
            to="/settings"
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-indigo-600 transition-all shadow-lg"
            title="Settings"
          >
            <Settings
              className="text-gray-100 group-hover:text-white transition"
              size={28}
            />
          </Link>
        </li>
      </nav>
      <div className="flex flex-col items-center py-8">
        <Link to="/" className="flex flex-col items-center group">
          <span className="text-indigo-300 font-bold text-xs tracking-widest group-hover:text-white transition">
            Chatr
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Navbar;
