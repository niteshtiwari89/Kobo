// import { useState } from "react";
// import { Search, Settings, LogOut, X } from "lucide-react";
// import Logo from "/logo1.png";
// import { toast } from "react-toastify";
// import {useNavigate} from 'react-router-dom'
// import { useEffect } from "react";

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({});
// useEffect(()=>{
  
//   const token = localStorage.getItem('token')

//   setUserData(parseJwt(token))
// },[])

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     toast.success("Logout Successful");
//     navigate('/')
//     window.location.href = "/";
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//   };

//   return (
//     <header className="bg-[#2F3542] text-white p-4">
//       <div className="container mx-auto flex items-center justify-between px-2">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center">
//             <img src={Logo} alt="" className="h-8 w-8" />
//             <span className="text-2xl font-bold text-[#29ABE2] ml-2">Relearn</span>
//           </div>
//           <div className="relative hidden md:block">
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-[400px] bg-[#404857] rounded-md pl-10 pr-4 py-2 focus:outline-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="flex items-center space-x-4 relative">
//           <button
//             onClick={toggleProfile}
//             className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors"
//           >
//             <span className="text-white font-semibold">V</span>
//           </button>

//           {isProfileOpen && (
//             <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
//               <button
//                 onClick={() => {
//                   setIsModalOpen(true);
//                   setIsProfileOpen(false); // Close dropdown after clicking
//                 }}
//                 className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
//               >
//                 <Settings className="h-4 w-4 mr-2" />
//                 Account Settings
//               </button>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsProfileOpen(false); // Close dropdown after clicking
//                 }}
//                 className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
//               >
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Account Settings</h2>
//               <button onClick={() => setIsModalOpen(false)}>
//                 <X className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//             <div className="space-y-2">
//               <label className="block text-gray-700">Name:</label>
//               <input
//                 type="text"
//                 className="w-full px-3 text-black py-2 border rounded-md"
//                 value={userData.name}
//                 onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//                 disabled={!isEditing}
//               />
//               <label className="block text-gray-700">E-mail:</label>
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 border rounded-md text-black"
//                 value={userData.email}
//                 onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//                 disabled={!isEditing}
//               />
//               <label className="block text-gray-700">Specialization:</label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-md text-black"
//                 value={userData.sector}
//                 onChange={(e) => setUserData({ ...userData, specialization: e.target.value })}
//                 disabled={!isEditing}
//               />
//               <label className="block text-gray-700">Country:</label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 border rounded-md text-black"
//                 value={userData.country}
//                 onChange={(e) => setUserData({ ...userData, country: e.target.value })}
//                 disabled={!isEditing}
//               />
//             </div>
//             <div className="mt-4 flex justify-end space-x-2">
//               {isEditing ? (
//                 <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
//               ) : (
//                 <button onClick={handleEdit} className="px-4 py-2 bg-gray-600 text-white rounded-md">Edit</button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


// function parseJwt (token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }


import { useState } from "react";
import { Search, Settings, LogOut, X } from "lucide-react";
// import Logo from "/logo1.png";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
useEffect(()=>{
  
  const token = localStorage.getItem('token')

  setUserData(parseJwt(token))
},[])

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate('/')
    window.location.href = "/";
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <header className="bg-[#2F3542] text-white p-4">
      <div className="container mx-auto flex items-center justify-between px-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {/* <img src={Logo} alt="" className="h-8 w-8" /> */}
            <span className="text-2xl font-bold text-[#29ABE2] ml-10">Relearn</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 relative">
          <button
            onClick={toggleProfile}
            className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors"
          >
            <span className="text-white font-semibold">
              {userData?.name ? 
                userData.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2) 
                : 'U'}
            </span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsProfileOpen(false); // Close dropdown after clicking
                }}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsProfileOpen(false); // Close dropdown after clicking
                }}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Account Settings</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                className="w-full px-3 text-black py-2 border rounded-md"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                disabled={!isEditing}
              />
              <label className="block text-gray-700">E-mail:</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md text-black"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                disabled={!isEditing}
              />
              <label className="block text-gray-700">Specialization:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md text-black"
                value={userData.sector}
                onChange={(e) => setUserData({ ...userData, specialization: e.target.value })}
                disabled={!isEditing}
              />
              <label className="block text-gray-700">Country:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md text-black"
                value={userData.country}
                onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              {isEditing ? (
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
              ) : (
                <button onClick={handleEdit} className="px-4 py-2 bg-gray-600 text-white rounded-md">Edit</button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}