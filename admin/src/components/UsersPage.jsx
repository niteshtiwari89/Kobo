// // import React, { useState, useEffect } from "react";
// // import { Search } from "lucide-react";
// // import { getAllUsers, deleteUserById, logout } from "../api";
// // import { useNavigate } from "react-router-dom";

// // const UsersPage = () => {
// //   const [search, setSearch] = useState("");
// //   const [users, setUsers] = useState([]);
// //   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
// //   const [userToDelete, setUserToDelete] = useState(null);
// //   const navigate = useNavigate();

// //   const fetchUsers = async () => {
// //     try {
// //       const data = await getAllUsers();
// //       // Sort users by createdAt or _id if it's a MongoDB ObjectId (which includes a timestamp)
// //       const sortedUsers = data.sort((a, b) => {
// //         // If your user object has a createdAt field, use that
// //         if (a.createdAt && b.createdAt) {
// //           return new Date(b.createdAt) - new Date(a.createdAt);
// //         }
// //         // If your user object has an _id from MongoDB, we can use that as it contains a timestamp
// //         if (a._id && b._id) {
// //           return b._id.localeCompare(a._id);
// //         }
// //         // Fallback to keeping the order as is
// //         return 0;
// //       });

// //       setUsers(sortedUsers);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     }
// //   };

// //   const openDeleteModal = (user) => {
// //     setUserToDelete(user);
// //     setDeleteModalOpen(true);
// //   };

// //   const closeDeleteModal = () => {
// //     setDeleteModalOpen(false);
// //     setUserToDelete(null);
// //   };

// //   const confirmDelete = async () => {
// //     if (!userToDelete) return;

// //     try {
// //       await deleteUserById(userToDelete._id);
// //       fetchUsers(); // Refresh the user list after deletion
// //       closeDeleteModal();
// //     } catch (error) {
// //       console.error("Error deleting user:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //     const interval = setInterval(fetchUsers, 5000); // Poll every 5 seconds
// //     return () => clearInterval(interval); // Cleanup interval on component unmount
// //   }, []);

// //   const filteredUsers = users.filter((user) =>
// //     user.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h1 className="text-2xl font-semibold mb-4">Users</h1>

// //       {/* Search Bar */}
// //       <div className="mb-4 flex items-center bg-white shadow-sm rounded-lg px-4 py-2 w-80">
// //         <Search className="text-gray-500 mr-2" size={20} />
// //         <input
// //           type="text"
// //           placeholder="Search"
// //           className="w-full outline-none"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //       </div>

// //       {/* Users Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {filteredUsers.map((user, index) => (
// //           <div
// //             key={index}
// //             className="bg-white shadow-md p-6 rounded-lg relative"
// //           >
// //             <div className="text-gray-700">
// //               <h2 className="font-semibold text-lg">{user.name}</h2>
// //               <p className="text-sm text-gray-500">E-mail</p>
// //               <p className="mb-2">{user.email}</p>
// //               <p className="text-sm text-gray-500">Specialization</p>
// //               <p className="mb-2">{user.sector}</p>
// //               <p className="text-sm text-gray-500">Country</p>
// //               <p className="mb-4">{user.country}</p>
// //               <button
// //                 onClick={() => openDeleteModal(user)}
// //                 className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Delete Confirmation Modal */}
// //       {deleteModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
// //             <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
// //             <p className="mb-6">
// //               Are you sure you want to delete the user &quot;{userToDelete?.name}&quot;? This action cannot be undone.
// //             </p>
// //             <div className="flex justify-end space-x-3">
// //               <button
// //                 onClick={closeDeleteModal}
// //                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={confirmDelete}
// //                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UsersPage;

// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import { getAllUsers, deleteUserById, logout } from "../api";
// import { useNavigate } from "react-router-dom";

// const UsersPage = () => {
//   const [search, setSearch] = useState("");
//   const [users, setUsers] = useState([]);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [detailsModalOpen, setDetailsModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     try {
//       const data = await getAllUsers();
//       // Sort users by createdAt or _id if it's a MongoDB ObjectId (which includes a timestamp)
//       const sortedUsers = data.sort((a, b) => {
//         // If your user object has a createdAt field, use that
//         if (a.createdAt && b.createdAt) {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         }
//         // If your user object has an _id from MongoDB, we can use that as it contains a timestamp
//         if (a._id && b._id) {
//           return b._id.localeCompare(a._id);
//         }
//         // Fallback to keeping the order as is
//         return 0;
//       });

//       setUsers(sortedUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const openDeleteModal = (user, e) => {
//     e.stopPropagation(); // Prevent the card click event from triggering
//     setUserToDelete(user);
//     setDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   const openDetailsModal = (user) => {
//     setSelectedUser(user);
//     setDetailsModalOpen(true);
//   };

//   const closeDetailsModal = () => {
//     setDetailsModalOpen(false);
//     setSelectedUser(null);
//   };

//   const confirmDelete = async () => {
//     if (!userToDelete) return;

//     try {
//       await deleteUserById(userToDelete._id);
//       fetchUsers(); // Refresh the user list after deletion
//       closeDeleteModal();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     const interval = setInterval(fetchUsers, 5000); // Poll every 5 seconds
//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, []);

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-semibold mb-4">Users</h1>

//       {/* Search Bar */}
//       <div className="mb-4 flex items-center bg-white shadow-sm rounded-lg px-4 py-2 w-80">
//         <Search className="text-gray-500 mr-2" size={20} />
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Users Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredUsers.map((user, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md p-6 rounded-lg relative cursor-pointer hover:shadow-lg transition-shadow"
//             onClick={() => openDetailsModal(user)}
//           >
//             <div className="text-gray-700">
//               <h2 className="font-semibold text-lg">{user.name}</h2>
//               <p className="text-sm text-gray-500">E-mail</p>
//               <p className="mb-2">{user.email}</p>
//               <p className="text-sm text-gray-500">Specialization</p>
//               <p className="mb-2">{user.sector}</p>
//               <p className="text-sm text-gray-500">Country</p>
//               <p className="mb-4">{user.country}</p>
//               <button
//                 onClick={(e) => openDeleteModal(user, e)}
//                 className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {deleteModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
//             <p className="mb-6">
//               Are you sure you want to delete the user &quot;{userToDelete?.name}&quot;? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={closeDeleteModal}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Details Modal */}
//       {detailsModalOpen && selectedUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">User Details</h2>
//               <button
//                 onClick={closeDetailsModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-500">Name</p>
//                 <p className="font-medium">{selectedUser.name}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-medium">{selectedUser.email}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Specialization</p>
//                 <p className="font-medium">{selectedUser.sector}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Country</p>
//                 <p className="font-medium">{selectedUser.country}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Username</p>
//                 <p className="font-medium">{selectedUser.username || "Not available"}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Organization</p>
//                 <p className="font-medium">{selectedUser.organization || "Not available"}</p>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={closeDetailsModal}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersPage;



// import React, { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import { getAllUsers, deleteUserById, logout } from "../api";
// import { useNavigate } from "react-router-dom";

// const UsersPage = () => {
//   const [search, setSearch] = useState("");
//   const [users, setUsers] = useState([]);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [detailsModalOpen, setDetailsModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const navigate = useNavigate();

//   const fetchUsers = async () => {
//     try {
//       const data = await getAllUsers();
//       // Sort users by createdAt or _id if it's a MongoDB ObjectId (which includes a timestamp)
//       const sortedUsers = data.sort((a, b) => {
//         // If your user object has a createdAt field, use that
//         if (a.createdAt && b.createdAt) {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         }
//         // If your user object has an _id from MongoDB, we can use that as it contains a timestamp
//         if (a._id && b._id) {
//           return b._id.localeCompare(a._id);
//         }
//         // Fallback to keeping the order as is
//         return 0;
//       });

//       setUsers(sortedUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const openDeleteModal = (user, e) => {
//     if (e) {
//       e.stopPropagation(); // Prevent the card click event from triggering
//     }
//     setUserToDelete(user);
//     setDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   const openDetailsModal = (user) => {
//     setSelectedUser(user);
//     setDetailsModalOpen(true);
//   };

//   const closeDetailsModal = () => {
//     setDetailsModalOpen(false);
//     setSelectedUser(null);
//   };

//   const confirmDelete = async () => {
//     if (!userToDelete) return;

//     try {
//       await deleteUserById(userToDelete._id);
//       fetchUsers(); // Refresh the user list after deletion
//       closeDeleteModal();

//       // If we're deleting a user that's currently being viewed in the details modal, close that modal too
//       if (detailsModalOpen && selectedUser && selectedUser._id === userToDelete._id) {
//         closeDetailsModal();
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     const interval = setInterval(fetchUsers, 5000); // Poll every 5 seconds
//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, []);

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-semibold mb-4">Users</h1>

//       {/* Search Bar */}
//       <div className="mb-4 flex items-center bg-white shadow-sm rounded-lg px-4 py-2 w-80">
//         <Search className="text-gray-500 mr-2" size={20} />
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Users Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredUsers.map((user, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-md p-6 rounded-lg relative cursor-pointer hover:shadow-lg transition-shadow"
//             onClick={() => openDetailsModal(user)}
//           >
//             <div className="text-gray-700">
//               <h2 className="font-semibold text-lg">{user.name}</h2>
//               <p className="text-sm text-gray-500">E-mail</p>
//               <p className="mb-2">{user.email}</p>
//               <p className="text-sm text-gray-500">Specialization</p>
//               <p className="mb-2">{user.sector}</p>
//               <p className="text-sm text-gray-500">Country</p>
//               <p className="mb-4">{user.country}</p>
//               <button
//                 onClick={(e) => openDeleteModal(user, e)}
//                 className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {deleteModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
//             <p className="mb-6">
//               Are you sure you want to delete the user &quot;{userToDelete?.name}&quot;? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={closeDeleteModal}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Details Modal */}
//       {detailsModalOpen && selectedUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">User Details</h2>
//               <button 
//                 onClick={closeDetailsModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm text-gray-500">Name</p>
//                 <p className="font-medium">{selectedUser.name}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-medium">{selectedUser.email}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Specialization</p>
//                 <p className="font-medium">{selectedUser.sector}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Country</p>
//                 <p className="font-medium">{selectedUser.country}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Username</p>
//                 <p className="font-medium">{selectedUser.username || "Not available"}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Organization</p>
//                 <p className="font-medium">{selectedUser.organization || "Not available"}</p>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <button
//                 onClick={() => openDeleteModal(selectedUser)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Delete User
//               </button>

//               <button
//                 onClick={closeDetailsModal}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UsersPage;




import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getAllUsers, deleteUserById, logout } from "../api";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      // Sort users by createdAt or _id if it's a MongoDB ObjectId (which includes a timestamp)
      const sortedUsers = data.sort((a, b) => {
        // If your user object has a createdAt field, use that
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        // If your user object has an _id from MongoDB, we can use that as it contains a timestamp
        if (a._id && b._id) {
          return b._id.localeCompare(a._id);
        }
        // Fallback to keeping the order as is
        return 0;
      });

      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const openDeleteModal = (user, e) => {
    if (e) {
      e.stopPropagation(); // Prevent the card click event from triggering
    }
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedUser(null);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUserById(userToDelete._id);
      fetchUsers(); // Refresh the user list after deletion
      closeDeleteModal();

      // If we're deleting a user that's currently being viewed in the details modal, close that modal too
      if (detailsModalOpen && selectedUser && selectedUser._id === userToDelete._id) {
        closeDetailsModal();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {/* Search Bar */}
      <div className="mb-4 flex items-center bg-white shadow-sm rounded-lg px-4 py-2 w-80">
        <Search className="text-gray-500 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg relative cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openDetailsModal(user)}
          >
            <div className="text-gray-700">
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">E-mail</p>
              <p className="mb-2">{user.email}</p>
              <p className="text-sm text-gray-500">Specialization</p>
              <p className="mb-2">{user.sector}</p>
              <p className="text-sm text-gray-500">Country</p>
              <p className="mb-4">{user.country}</p>
              {/* Delete button removed from here */}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete the user &quot;{userToDelete?.name}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {detailsModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Details</h2>
              <button
                onClick={closeDetailsModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{selectedUser.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-medium">{selectedUser.sector}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{selectedUser.country}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{selectedUser.username || "Not available"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Organization</p>
                <p className="font-medium">{selectedUser.organization || "Not available"}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => openDeleteModal(selectedUser)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete User
              </button>

              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;