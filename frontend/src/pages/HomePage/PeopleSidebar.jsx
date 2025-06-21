import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const PeopleSidebar = () => {
  const { onlineUsers } = useAuthStore();
  const { users, isUsersLoading, getAllUsers, getAllChats } = useChatStore();

  useEffect(() => {
    getAllUsers();
    getAllChats();
  }, [getAllUsers, getAllChats]);

  const UsersLoading = isUsersLoading;
  const NoUsers = !isUsersLoading && users.length === 0;
  const UsersLoad = !isUsersLoading && users.length > 0;

  return (
    <aside className="w-fit flex flex-col min-w-[260px] max-w-[320px] h-full bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 shadow-xl rounded-xl border border-gray-800 overflow-hidden">
      <Header onlineUsers={onlineUsers} />
      <ul className="overflow-y-auto flex-1 custom-scrollbar">
        {UsersLoading && <UsersLoadingPlaceholder />}
        {NoUsers && <NoUsersPlaceholder />}
        {UsersLoad && <UsersList onlineUsers={onlineUsers} users={users} />}
      </ul>
    </aside>
  );
};

const Header = ({ onlineUsers }) => {
  return (
    <header className="p-5 font-bold shadow-sm bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 border-b border-gray-800 flex items-center gap-2">
      <span className="text-lg tracking-wide">People</span>
      <span className="ml-auto flex items-center gap-1 text-green-400 font-semibold text-sm bg-gray-800 px-2 py-1 rounded-full">
        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        {Math.max(onlineUsers.length - 1, 0)} online
      </span>
    </header>
  );
};

const UsersLoadingPlaceholder = () => {
  return (
    <li className="p-6 text-center text-gray-400 animate-pulse">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 bg-gray-800 rounded-full mb-2"></div>
        <div className="w-24 h-4 bg-gray-800 rounded mb-1"></div>
        <div className="w-16 h-3 bg-gray-800 rounded"></div>
      </div>
    </li>
  );
};

const NoUsersPlaceholder = () => {
  return (
    <li className="p-6 text-center text-gray-500">
      <div className="flex flex-col items-center gap-2">
        <img
          src="/avatar.png"
          alt="No users"
          className="w-12 h-12 opacity-40 mb-2"
        />
        <span className="font-medium">No users found.</span>
        <span className="text-xs text-gray-400">Start a conversation!</span>
      </div>
    </li>
  );
};

const UsersList = ({ onlineUsers, users }) => {
  const { setSelectedUser, selectedUser } = useChatStore();

  return (
    <ul className="overflow-y-auto flex-1">
      {users.map((user) => (
        <li
          key={user._id}
          className={`relative flex items-center gap-4 p-3 pr-5 cursor-pointer transition-all duration-150 group ${
            selectedUser?._id === user._id
              ? "bg-gray-800/80 border-l-4 border-blue-500"
              : "hover:bg-gray-800/60"
          }`}
          onClick={() => setSelectedUser(user)}
        >
          <div className="relative">
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user.fullName}
              className={`w-12 h-12 rounded-full object-cover border-2 ${
                onlineUsers.includes(user._id)
                  ? "border-green-400"
                  : "border-gray-700"
              } group-hover:scale-105 transition`}
            />
            {onlineUsers.includes(user._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full shadow"></span>
            )}
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-100 group-hover:text-blue-400 transition">
              {user.fullName}
            </p>
            <p className="text-gray-400 text-xs">{user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Optional: Custom scrollbar styling (add to your global CSS or Tailwind config)
// .custom-scrollbar::-webkit-scrollbar { width: 8px; }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: #2d3748; border-radius: 4px; }

export default PeopleSidebar;
