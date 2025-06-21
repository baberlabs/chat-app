import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";

import {
  BadgeAlert,
  Camera,
  Edit,
  LogOut,
  Save,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateProfile, logout, deleteAccount } = useAuthStore();
  const [profileData, setProfileData] = useState({
    fullName: authUser?.fullName || "Loading...",
    email: authUser?.email || "Loading...",
    profilePic: authUser?.profilePic || "",
    isVerified: authUser?.isVerified || "Loading...",
  });
  const [fullNameEditMode, setFullNameEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);

  const [fullName, setFullName] = useState(profileData.fullName);
  const [email, setEmail] = useState(profileData.email);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setProfileData({
      fullName: authUser?.fullName || "Loading...",
      email: authUser?.email || "Loading...",
      profilePic: authUser?.profilePic || "",
      isVerified: authUser?.isVerified || "Loading...",
    });
    setFullName(authUser?.fullName || "");
    setEmail(authUser?.email || "");
  }, [authUser]);

  const handleFullNameChange = async () => {
    const updatedProfile = await updateProfile(authUser._id, {
      fullName: fullName,
    });
    setProfileData((prev) => ({
      ...prev,
      fullName: updatedProfile.fullName,
    }));
    setFullNameEditMode(false);
    toast.success("Full name updated successfully!");
  };
  const handleEmailChange = async () => {
    const updatedProfile = await updateProfile(authUser._id, {
      email: email,
    });
    setProfileData((prev) => ({
      ...prev,
      email: updatedProfile.email,
    }));
    setEmailEditMode(false);
    toast.success("Email updated successfully!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      const updatedProfile = await updateProfile(authUser._id, {
        profilePic: base64Image,
      });
      setProfileData((prev) => ({
        ...prev,
        profilePic: updatedProfile.profilePic,
      }));
      toast.success("Profile picture updated!");
    };
  };

  const handlePasswordChange = async () => {
    await updateProfile(authUser._id, {
      password: password,
    });
    setPasswordEditMode(false);
    setPassword("");
    toast.success("Password updated successfully!");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      await deleteAccount(authUser._id);
      toast.success("Account deleted successfully.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-2xl bg-gray-900/90 rounded-3xl shadow-2xl p-8 md:p-14 flex flex-col items-center border border-gray-800">
        {/* Profile Picture */}
        <div className="relative mb-6 group">
          <img
            src={profileData?.profilePic || "/avatar.png"}
            alt="Profile"
            className="size-40 md:size-48 rounded-full object-cover border-4 border-blue-600 shadow-lg transition-transform group-hover:scale-105"
          />
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
            <div className="bg-blue-600 hover:bg-blue-700 absolute bottom-2 right-2 p-2 rounded-full cursor-pointer shadow-md transition group-hover:scale-110 border-2 border-white">
              <Camera size={20} />
            </div>
          </label>
        </div>

        <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {profileData.fullName}
        </h2>
        <div className="flex items-center gap-2 mb-6">
          {profileData.isVerified === true ? (
            <span className="flex items-center gap-1 text-green-400 font-semibold text-sm">
              <CheckCircle2 size={18} /> Verified
            </span>
          ) : (
            <button
              onClick={() =>
                toast("Verification process not implemented yet.", {
                  icon: "⚠️",
                })
              }
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded-xl text-xs font-medium shadow-md transition cursor-pointer"
            >
              <BadgeAlert size={16} />
              Verify your email
            </button>
          )}
        </div>

        {/* Editable Fields */}
        <div className="w-full flex flex-col gap-6">
          {[
            {
              label: "Full Name",
              value: fullName,
              setValue: setFullName,
              isEditing: fullNameEditMode,
              toggleEdit: setFullNameEditMode,
              handleSave: handleFullNameChange,
              type: "text",
              placeholder: "Enter your full name",
            },
            {
              label: "Email",
              value: email,
              setValue: setEmail,
              isEditing: emailEditMode,
              toggleEdit: setEmailEditMode,
              handleSave: handleEmailChange,
              type: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Password",
              value: passwordEditMode ? password : "*********",
              setValue: setPassword,
              isEditing: passwordEditMode,
              toggleEdit: setPasswordEditMode,
              handleSave: handlePasswordChange,
              type: "password",
              placeholder: "Change your password",
            },
          ].map(
            ({
              label,
              value,
              setValue,
              isEditing,
              toggleEdit,
              handleSave,
              type,
              placeholder,
            }) => (
              <div key={label} className="flex flex-col gap-1 relative w-full">
                <label className="text-xs font-semibold text-gray-400 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  value={value}
                  disabled={!isEditing}
                  onChange={(e) => isEditing && setValue(e.target.value)}
                  placeholder={placeholder}
                  className={`bg-gray-800 p-3 rounded-lg text-base outline-none border transition ${
                    isEditing
                      ? "border-blue-500 text-gray-100 shadow-md"
                      : "border-gray-700 text-gray-400"
                  }`}
                />
                <button
                  onClick={() => {
                    toggleEdit(!isEditing);
                    if (isEditing) handleSave();
                  }}
                  className="absolute right-3 top-8 text-white p-1 rounded-lg hover:text-blue-400 transition cursor-pointer"
                  aria-label={isEditing ? "Save" : "Edit"}
                >
                  {isEditing ? <Save size={20} /> : <Edit size={20} />}
                </button>
              </div>
            )
          )}
        </div>

        {/* Metadata */}
        <div className="mt-8 text-xs text-gray-400 text-center">
          Member since{" "}
          {authUser?.createdAt
            ? timeAgo(new Date(authUser.createdAt))
            : "Loading..."}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mt-10 w-full">
          <button
            onClick={() => logout()}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 py-3 px-4 rounded-xl text-base font-semibold shadow-lg transition cursor-pointer"
          >
            <LogOut size={20} />
            Log out
          </button>
          <button
            onClick={handleDeleteAccount}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 py-3 px-4 rounded-xl text-base font-semibold shadow-lg transition cursor-pointer"
          >
            <Trash2 size={20} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${seconds} seconds ago`;
};

export default ProfilePage;
