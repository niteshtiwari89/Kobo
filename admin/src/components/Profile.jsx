import React, { useEffect, useState } from "react";
import { Mail, User, Globe } from "lucide-react";

const Profile = () => {
  const [adminData, setAdminData] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");

    setAdminData(parseJwt(token));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white">
            <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full overflow-hidden shadow-lg">
              <img
                src="/src/assets/profile-image.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{adminData.name}</h2>
            {/* <p className="text-blue-100 text-sm">Neurologist</p> */}
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-4">
            <ProfileDetail
              icon={<Mail className="text-blue-500" />}
              label="E-mail"
              value={adminData.email}
              type="email"
            />
            <ProfileDetail
              icon={<User className="text-green-500" />}
              label="Role"
              value={adminData.role}
            />
            <ProfileDetail
              icon={<Globe className="text-purple-500" />}
              label="Country"
              value={adminData.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Profile Detail Component
const ProfileDetail = ({ icon, label, value, type = "text" }) => {
  const renderValue = () => {
    if (type === "email") {
      return (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
        >
          {value}
        </a>
      );
    }
    return value;
  };

  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-gray-800 font-semibold">{renderValue()}</p>
      </div>
    </div>
  );
};

export default Profile;
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
