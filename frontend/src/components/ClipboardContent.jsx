// import { Filter, Grid, Archive, Delete,Eye, Rocket } from "lucide-react";
// import { Link , useNavigate} from "react-router-dom";
// import { useState } from "react";

// const ClipboardContent = ({
//   isFilterOpen,
//   setIsFilterOpen,
//   isFieldsOpen,
//   setIsFieldsOpen,
//   selectedFields,
//   setSelectedFields,
//   data,
// }) => {

//   const navigate = useNavigate();
//     const formData = data;
//   const [isEditing, setIsEditing] = useState(false); // To track if editing is active
//   const [editingProject, setEditingProject] = useState(null); // To store the project being edited

//   // const handleEditButtonClick = (project) => {
//   //   setEditingProject(project); // Set the project for editing
//   //   console.log(project)
//   //   setIsEditing(true); // Activate editing mode
//   // };

//   const handleSaveProject = () => {
//     // Here you would typically make an API call to save the updated project
//     console.log("Saving project:", editingProject);
//     setIsEditing(false); // After saving, deactivate editing mode
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false); // Deactivate editing mode without saving
//     setEditingProject(null); // Reset the project being edited
//   };

//   const handleFieldChange = (field, value) => {
//     setEditingProject({ ...editingProject, [field]: value }); // Update the specific field being edited
//   };

//   const handleEditButtonClick = (project) => {
//     navigate('/create-form', { state: { project } });
//   };

//   const handlePreviewClick = (project) =>{

//     navigate(`/preview-form/${project._id}`)
//   }
//   return (
//     <div className="p-4 md:p-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
//           My Projects
//         </h2>
//         <div className="flex flex-wrap items-center gap-2">
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
//           >
//             <Filter className="h-4 w-4" />
//             <span>Filter</span>
//           </button>

//           <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
//             <Archive className="h-4 w-4" />
//             <span>Archive</span>
//           </button>
//           <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
//             <Delete className="h-4 w-4" />
//             <span>Delete</span>
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="px-4 py-3 text-left">
//                 <input type="checkbox" className="rounded border-gray-300" />
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
//                 Project name
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
//                 Owner
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
//                 Date modified
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
//                 Date deployed
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
//                 Submissions
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           {formData.length == 0 ? (
//             <>
//               <tbody>
//                 <tr>
//                   <td colSpan="7" className="px-4 py-4 text-center">
//                     No data found
//                   </td>
//                 </tr>
//               </tbody>
//             </>
//           ) : (
//             formData.map((item) => {
//               return (
//                 <tbody key={item._id}>
//                   <tr className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="px-4 py-4">
//                       <input
//                         type="checkbox"
//                         className="rounded border-gray-300"
//                       />
//                     </td>
//                     <td className="px-4 py-4">
//                       <Link
//                         to="/project-details"
//                         className="text-blue-600 hover:underline"
//                       >
//                         {item.title}
//                       </Link>
//                     </td>

//                     <td className="px-4 py-4">{item.userId}</td>
//                     <td className="px-4 py-4">
//                       {convertUtcToIst(item.updatedAt)}
//                     </td>
//                     <td className="px-4 py-4">
//                       {convertUtcToIst(item.createdAt)}
//                     </td>
//                     <td className="px-4 py-4">1</td>
//                     <td className="px-4 py-4">
//                     <button
//                       onClick={() => handlePreviewClick(item)}
//                       className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
//                     >
//                       <Eye className="h-5 w-5" />
//                     </button>
//                   </td>
//                     <td>
//                       <button
//                         className="py-2 bg-blue-400 rounded-2xl px-5"
//                         onClick={() => handleEditButtonClick(item)} // Set the project for editing
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               );
//             })
//           )}
//         </table>
//       </div>

//       {/* Editing Modal */}
//       {isEditing && editingProject && (
//         <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-[2px] z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-4">Edit Project</h3>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">
//                 Project Name
//               </label>
//               <input
//                 type="text"
//                 value={editingProject.title}
//                 onChange={(e) => handleFieldChange("title", e.target.value)} // Update project title
//                 className="mt-2 px-4 py-2 border rounded w-full"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">
//                 Owner
//               </label>
//               <input
//                 type="text"
//                 value={editingProject.userId}
//                 onChange={(e) => handleFieldChange("userId", e.target.value)} // Update project owner
//                 className="mt-2 px-4 py-2 border rounded w-full"
//               />
//             </div>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={handleCancelEdit}
//                 className="px-4 py-2 bg-gray-300 rounded text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveProject}
//                 className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClipboardContent;

// function convertUtcToIst(utcTimeStr) {
//   const utcDate = new Date(utcTimeStr);
//   const istOffset = 5.5 * 60; // IST is UTC + 5 hours 30 minutes
//   const localTime = new Date(utcDate.getTime() + istOffset * 60 * 1000);
//   const formattedTime = localTime.toISOString().slice(0, 19).replace("T", " ");

//   return formattedTime;
// }

import { Delete, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteManyForm } from "../api";
import { toast } from "react-toastify";

const ClipboardContent = ({ data, setFormData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const token = parseJwt(localStorage.getItem("token"))

  const formData = data;
  console.log("Data", data);
  console.log("formData", formData);
  // Filter projects based on search term

  
  const filteredProjects = formData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProject = () => {
    console.log("Saving project:", editingProject);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProject(null);
  };

  const handleEditButtonClick = (project) => {
    navigate("/create-form", { state: { project } });
  };
  // const handleProjectDetails = (project) => {
  //   console.log("project",project)
  //   navigate("/project-details", { state: { project } });
  // };

  const handlePreviewClick = (project) => {
    navigate(`/preview-form/${project._id}`);
  };

  // Handle selecting or deselecting all checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProjects(filteredProjects.map((item) => item._id));
    } else {
      setSelectedProjects([]);
    }
  };

  // Handle individual checkbox selection/deselection
  const handleCheckboxChange = (e, projectId) => {
    if (e.target.checked) {
      setSelectedProjects([...selectedProjects, projectId]);
    } else {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    }
  };

  const handleDeleteMany = async (ids) => {
    // Call the delete API
    await deleteManyForm(ids);

    // Update the state after deletion
    setFormData((prevData) =>
      prevData.filter((item) => !ids.includes(item._id))
    );
    setSelectedProjects([]); // Clear selected projects
  };
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          My Projects
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => handleDeleteMany(selectedProjects)}
            className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md ${
              selectedProjects.length > 0
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            disabled={selectedProjects.length === 0}
          >
            <Delete className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={handleSelectAll}
                  checked={selectedProjects.length === filteredProjects.length}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Project name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Date modified
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Date deployed
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Submissions
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Preview
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          {filteredProjects.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center">
                  {searchTerm
                    ? "No projects found matching your search"
                    : "No data found"}
                </td>
              </tr>
            </tbody>
          ) : (
            filteredProjects.map((item) => (
              <tbody key={item._id}>
                {console.log(filteredProjects)}
                {console.log(parseJwt(localStorage.getItem("token")))}
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedProjects.includes(item._id)}
                      onChange={(e) => handleCheckboxChange(e, item._id)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to="/project-details/summary"
                      // to="/project-details"
                      state={{ project: item }}
                      className="text-blue-600 hover:underline"
                    >
                      {/* <button onClick={() => handleProjectDetails(item)}> */}
                      {item.title}
                      {/* </button> */}
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    {convertUtcToIst(item.updatedAt)}
                  </td>
                  <td className="px-4 py-4">
                    {convertUtcToIst(item.createdAt)}
                  </td>
                  <td className="px-4 py-4">1</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handlePreviewClick(item)}
                      className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="py-2 bg-blue-400 rounded-2xl px-5"
                      onClick={() => {if(token?.userId === item.userId){handleEditButtonClick(item)}else{ 
                        toast.error("You Don't Have Permission to Edit this form")
                      }}}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          )}
        </table>
      </div>
    </div>
  );
};

export default ClipboardContent;

function convertUtcToIst(utcTimeStr) {
  const utcDate = new Date(utcTimeStr);
  const istOffset = 5.5 * 60; // IST is UTC + 5 hours 30 minutes
  const localTime = new Date(utcDate.getTime() + istOffset * 60 * 1000);
  const formattedTime = localTime.toISOString().slice(0, 19).replace("T", " ");

  return formattedTime;
}



function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}