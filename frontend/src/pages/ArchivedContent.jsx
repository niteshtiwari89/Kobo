// import React, { useState } from 'react'
// import { Link } from "react-router-dom"
// import { Filter, Grid, Archive, Delete, Rocket, X } from "lucide-react"

// const ArchivedContent = () => {
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [isFieldsOpen, setIsFieldsOpen] = useState(false);
//     const [selectedFields, setSelectedFields] = useState([]);

//     return (
//         <div className="p-4 md:p-8">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Projects</h2>
//                 <div className="flex flex-wrap items-center gap-2">
//                     <button
//                         onClick={() => setIsFilterOpen(true)}
//                         className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
//                     >
//                         <Filter className="h-4 w-4" />
//                         <span>Filter</span>
//                     </button>
//                     <button
//                         onClick={() => setIsFieldsOpen(true)}
//                         className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
//                     >
//                         <Grid className="h-4 w-4" />
//                         <span>Fields</span>
//                     </button>
//                     <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
//                         <Archive className="h-4 w-4" />
//                         <span>Archive</span>
//                     </button>
//                     <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
//                         <Delete className="h-4 w-4" />
//                         <span>Delete</span>
//                     </button>
//                 </div>
//             </div>

//             <div className="overflow-x-auto bg-white rounded-lg shadow">
//                 <table className="w-full">
//                     <thead>
//                         <tr className="border-b">
//                             <th className="px-4 py-3 text-left">
//                                 <input type="checkbox" className="rounded border-gray-300" />
//                             </th>
//                             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Project name</th>
//                             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
//                             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date modified</th>
//                             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date deployed</th>
//                             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Submissions</th>
//                             <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Country</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* <tr className="border-b border-gray-200 hover:bg-gray-50">
//                             <td className="px-4 py-4">
//                                 <input type="checkbox" className="rounded border-gray-300" />
//                             </td>
//                             <td className="px-4 py-4">
//                                 <Link to="/project-details" className="text-blue-600 hover:underline">
//                                     Demo Project
//                                 </Link>
//                             </td>
//                             <td className="px-4 py-4">
//                                 <span className="flex items-center text-blue-600">
//                                     <Rocket className="h-4 w-4 mr-1" />
//                                     deployed
//                                 </span>
//                             </td>
//                             <td className="px-4 py-4">me</td>
//                             <td className="px-4 py-4">February 5, 2025</td>
//                             <td className="px-4 py-4">February 5, 2025</td>
//                             <td className="px-4 py-4">1</td>
//                         </tr> */}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Filter Popup */}
//             {isFilterOpen && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-95 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-lg font-semibold">Filter</h3>
//                             <button
//                                 onClick={() => setIsFilterOpen(false)}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Filter by
//                                 </label>
//                                 <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
//                                     <option>Select field</option>
//                                     <option>Project Name</option>
//                                     <option>Description</option>
//                                     <option>Owner</option>
//                                     <option>Date Modified</option>
//                                     <option>Date Deployed</option>
//                                     <option>Sector</option>
//                                     <option>Country</option>
//                                     <option>Languages</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Condition
//                                 </label>
//                                 <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
//                                     <option>Select condition</option>
//                                     <option>Contains</option>
//                                     <option>Does not contain</option>
//                                     <option>Ends with</option>
//                                     <option>Is</option>
//                                     <option>Is not</option>
//                                     <option>Starts with</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Value
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                                     placeholder="Enter value"
//                                 />
//                             </div>
//                             <div className="flex justify-end space-x-4">
//                                 <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
//                                     Reset
//                                 </button>
//                                 <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                                     Apply
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Fields Popup */}
//             {isFieldsOpen && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-95 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-lg font-semibold">Fields</h3>
//                             <button
//                                 onClick={() => setIsFieldsOpen(false)}
//                                 className="text-gray-500 hover:text-gray-700"
//                             >
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id="project-name"
//                                         className="rounded border-gray-300 mr-2"
//                                         checked={selectedFields.includes("Project Name")}
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedFields([...selectedFields, "Project Name"]);
//                                             } else {
//                                                 setSelectedFields(selectedFields.filter(field => field !== "Project Name"));
//                                             }
//                                         }}
//                                     />
//                                     <label htmlFor="project-name" className="text-sm text-gray-700">
//                                         Project Name
//                                     </label>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id="status"
//                                         className="rounded border-gray-300 mr-2"
//                                         checked={selectedFields.includes("Status")}
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedFields([...selectedFields, "Status"]);
//                                             } else {
//                                                 setSelectedFields(selectedFields.filter(field => field !== "Status"));
//                                             }
//                                         }}
//                                     />
//                                     <label htmlFor="status" className="text-sm text-gray-700">
//                                         Status
//                                     </label>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         id="owner"
//                                         className="rounded border-gray-300 mr-2"
//                                         checked={selectedFields.includes("Owner")}
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedFields([...selectedFields, "Owner"]);
//                                             } else {
//                                                 setSelectedFields(selectedFields.filter(field => field !== "Owner"));
//                                             }
//                                         }}
//                                     />
//                                     <label htmlFor="owner" className="text-sm text-gray-700">
//                                         Owner
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="flex justify-end space-x-4">
//                                 <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
//                                     Reset
//                                 </button>
//                                 <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                                     Apply
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ArchivedContent


import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Filter, Grid, RefreshCw, Delete, Archive, X } from "lucide-react"

const ArchivedContent = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isFieldsOpen, setIsFieldsOpen] = useState(false);
    const [selectedFields, setSelectedFields] = useState([
        "Project Name", "Status", "Owner", "Date modified", "Date archived", "Submissions", "Country"
    ]);

    // Sample archived project data - in a real app, this might come from props or an API
    const [allProjects, setAllProjects] = useState([
        {
            id: 1,
            name: "Legacy Website",
            status: "archived",
            owner: "me",
            dateModified: "January 10, 2025",
            dateArchived: "January 15, 2025",
            submissions: 12,
            country: "USA"
        },
        {
            id: 2,
            name: "Internal Tool",
            status: "archived",
            owner: "John",
            dateModified: "December 5, 2024",
            dateArchived: "February 1, 2025",
            submissions: 3,
            country: "UK"
        },
        {
            id: 3,
            name: "Mobile App",
            status: "archived",
            owner: "me",
            dateModified: "March 1, 2025",
            dateArchived: "March 5, 2025",
            submissions: 0,
            country: "Canada"
        }
    ]);

    // State to track checked projects
    const [checkedProjects, setCheckedProjects] = useState({});

    // Function to handle checking/unchecking all projects
    const handleCheckAll = (e) => {
        const isChecked = e.target.checked;
        const newCheckedState = {};

        filteredProjects.forEach(project => {
            newCheckedState[project.id] = isChecked;
        });

        setCheckedProjects(newCheckedState);
    };

    // Function to handle checking/unchecking individual project
    const handleCheckProject = (id, e) => {
        setCheckedProjects({
            ...checkedProjects,
            [id]: e.target.checked
        });
    };

    // Filter state
    const [filterField, setFilterField] = useState("");
    const [filterCondition, setFilterCondition] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [filteredProjects, setFilteredProjects] = useState(allProjects);

    // Apply filter function
    const applyFilter = () => {
        if (!filterField || !filterCondition || !filterValue) {
            // If any filter criteria is missing, show all projects
            setFilteredProjects(allProjects);
            setIsFilterOpen(false);
            return;
        }

        const filtered = allProjects.filter(project => {
            let fieldValue = "";

            // Map the filter field to the correct property
            switch (filterField) {
                case "Project Name":
                    fieldValue = project.name;
                    break;
                case "Status":
                    fieldValue = project.status;
                    break;
                case "Owner":
                    fieldValue = project.owner;
                    break;
                case "Date Modified":
                    fieldValue = project.dateModified;
                    break;
                case "Date Archived":
                    fieldValue = project.dateArchived;
                    break;
                case "Country":
                    fieldValue = project.country;
                    break;
                default:
                    fieldValue = "";
            }

            fieldValue = fieldValue.toLowerCase();
            const searchValue = filterValue.toLowerCase();

            // Apply the selected condition
            switch (filterCondition) {
                case "Contains":
                    return fieldValue.includes(searchValue);
                case "Does not contain":
                    return !fieldValue.includes(searchValue);
                case "Starts with":
                    return fieldValue.startsWith(searchValue);
                case "Ends with":
                    return fieldValue.endsWith(searchValue);
                case "Is":
                    return fieldValue === searchValue;
                case "Is not":
                    return fieldValue !== searchValue;
                default:
                    return true;
            }
        });

        setFilteredProjects(filtered);
        setIsFilterOpen(false);
    };

    // Reset filter function
    const resetFilter = () => {
        setFilterField("");
        setFilterCondition("");
        setFilterValue("");
        setFilteredProjects(allProjects);
    };

    // Apply selected fields
    const applyFields = () => {
        setIsFieldsOpen(false);
    };

    // Function to restore selected projects
    const restoreSelectedProjects = () => {
        // Get IDs of checked projects
        const projectsToRestore = Object.keys(checkedProjects)
            .filter(id => checkedProjects[id])
            .map(id => parseInt(id));

        if (projectsToRestore.length === 0) {
            alert("Please select at least one project to restore");
            return;
        }

        // Update status of selected projects to "active"
        const updatedProjects = allProjects.map(project => {
            if (projectsToRestore.includes(project.id)) {
                // Create a new object with updated status
                return { ...project, status: "active" };
            }
            return project;
        });

        // Update projects state
        setAllProjects(updatedProjects);

        // Update filtered projects
        setFilteredProjects(prev =>
            prev.filter(project => !projectsToRestore.includes(project.id))
        );

        // Reset checked projects
        setCheckedProjects({});

        // In a real app, you might want to:
        // 1. Make an API call to update project status in the backend
        // 2. Use a global state management solution to share data between components
        // 3. Use a notification system to inform the user that projects were restored

        alert(`Successfully restored ${projectsToRestore.length} project(s)`);
    };

    // Calculate if all visible projects are checked
    const areAllChecked = filteredProjects.length > 0 &&
        filteredProjects.every(project => checkedProjects[project.id]);

    // Calculate if any projects are checked
    const isAnyChecked = Object.values(checkedProjects).some(Boolean);

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Archived Projects</h2>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </button>
                    <button
                        onClick={() => setIsFieldsOpen(true)}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Grid className="h-4 w-4" />
                        <span>Fields</span>
                    </button>
                    <button
                        onClick={restoreSelectedProjects}
                        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md ${isAnyChecked
                            ? "text-blue-600 hover:bg-blue-50"
                            : "text-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!isAnyChecked}
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span>Restore</span>
                    </button>
                    <button
                        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md ${isAnyChecked
                            ? "text-red-600 hover:bg-red-50"
                            : "text-gray-400 cursor-not-allowed"
                            }`}
                        disabled={!isAnyChecked}
                    >
                        <Delete className="h-4 w-4" />
                        <span>Delete Permanently</span>
                    </button>
                </div>
            </div>

            {/* Filter status indicator */}
            {filterField && filterCondition && filterValue && (
                <div className="mb-4 px-4 py-2 bg-blue-50 rounded-md flex items-center justify-between">
                    <span className="text-blue-700">
                        Filtered by {filterField} {filterCondition.toLowerCase()} "{filterValue}"
                    </span>
                    <button
                        onClick={resetFilter}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-3 text-left">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    checked={areAllChecked}
                                    onChange={handleCheckAll}
                                />
                            </th>
                            {selectedFields.includes("Project Name") && (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Project name</th>
                            )}
                            {selectedFields.includes("Status") && (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                            )}
                            {selectedFields.includes("Owner") && (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Owner</th>
                            )}
                            {selectedFields.includes("Date modified") && (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date modified</th>
                            )}
                            {selectedFields.includes("Date archived") && (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date archived</th>
                            )}
                            {selectedFields.includes("Submissions") && (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Submissions</th>
                            )}
                            {selectedFields.includes("Country") && (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Country</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map(project => (
                                <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300"
                                            checked={!!checkedProjects[project.id]}
                                            onChange={(e) => handleCheckProject(project.id, e)}
                                        />
                                    </td>
                                    {selectedFields.includes("Project Name") && (
                                        <td className="px-4 py-4">
                                            <Link to="/project-details" className="text-blue-600 hover:underline">
                                                {project.name}
                                            </Link>
                                        </td>
                                    )}
                                    {selectedFields.includes("Status") && (
                                        <td className="px-4 py-4">
                                            <span className="flex items-center text-gray-600">
                                                <Archive className="h-4 w-4 mr-1" />
                                                {project.status}
                                            </span>
                                        </td>
                                    )}
                                    {selectedFields.includes("Owner") && (
                                        <td className="px-4 py-4">{project.owner}</td>
                                    )}
                                    {selectedFields.includes("Date modified") && (
                                        <td className="px-4 py-4">{project.dateModified}</td>
                                    )}
                                    {selectedFields.includes("Date archived") && (
                                        <td className="px-4 py-4">{project.dateArchived}</td>
                                    )}
                                    {selectedFields.includes("Submissions") && (
                                        <td className="px-4 py-4">{project.submissions}</td>
                                    )}
                                    {selectedFields.includes("Country") && (
                                        <td className="px-4 py-4">{project.country}</td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={selectedFields.length + 1} className="px-4 py-4 text-center text-gray-500">
                                    No archived projects match your filter criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Filter Popup */}
            {isFilterOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-95 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Filter</h3>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Filter by
                                </label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={filterField}
                                    onChange={(e) => setFilterField(e.target.value)}
                                >
                                    <option value="">Select field</option>
                                    <option>Project Name</option>
                                    <option>Status</option>
                                    <option>Owner</option>
                                    <option>Date Modified</option>
                                    <option>Date Archived</option>
                                    <option>Country</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Condition
                                </label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={filterCondition}
                                    onChange={(e) => setFilterCondition(e.target.value)}
                                >
                                    <option value="">Select condition</option>
                                    <option>Contains</option>
                                    <option>Does not contain</option>
                                    <option>Ends with</option>
                                    <option>Is</option>
                                    <option>Is not</option>
                                    <option>Starts with</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Value
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    placeholder="Enter value"
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={resetFilter}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={applyFilter}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fields Popup */}
            {isFieldsOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-95 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Fields</h3>
                            <button
                                onClick={() => setIsFieldsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="project-name"
                                        className="rounded border-gray-300 mr-2"
                                        checked={selectedFields.includes("Project Name")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedFields([...selectedFields, "Project Name"]);
                                            } else {
                                                setSelectedFields(selectedFields.filter(field => field !== "Project Name"));
                                            }
                                        }}
                                    />
                                    <label htmlFor="project-name" className="text-sm text-gray-700">
                                        Project Name
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="status"
                                        className="rounded border-gray-300 mr-2"
                                        checked={selectedFields.includes("Status")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedFields([...selectedFields, "Status"]);
                                            } else {
                                                setSelectedFields(selectedFields.filter(field => field !== "Status"));
                                            }
                                        }}
                                    />
                                    <label htmlFor="status" className="text-sm text-gray-700">
                                        Status
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="owner"
                                        className="rounded border-gray-300 mr-2"
                                        checked={selectedFields.includes("Owner")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedFields([...selectedFields, "Owner"]);
                                            } else {
                                                setSelectedFields(selectedFields.filter(field => field !== "Owner"));
                                            }
                                        }}
                                    />
                                    <label htmlFor="owner" className="text-sm text-gray-700">
                                        Owner
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="date-modified"
                                        className="rounded border-gray-300 mr-2"
                                        checked={selectedFields.includes("Date modified")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedFields([...selectedFields, "Date modified"]);
                                            } else {
                                                setSelectedFields(selectedFields.filter(field => field !== "Date modified"));
                                            }
                                        }}
                                    />
                                    <label htmlFor="date-modified" className="text-sm text-gray-700">
                                        Date Modified
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="date-archived"
                                        className="rounded border-gray-300 mr-2"
                                        checked={selectedFields.includes("Date archived")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedFields([...selectedFields, "Date archived"]);
                                            } else {
                                                setSelectedFields(selectedFields.filter(field => field !== "Date archived"));
                                            }
                                        }}
                                    />
                                    <label htmlFor="date-archived" className="text-sm text-gray-700">
                                        Date Archived
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="submissions"
                                        className="rounded border-gray-300 mr-2"
                                        checked={selectedFields.includes("Submissions")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedFields([...selectedFields, "Submissions"]);
                                            } else {
                                                setSelectedFields(selectedFields.filter(field => field !== "Submissions"));
                                            }
                                        }}
                                    />
                                    <label htmlFor="submissions" className="text-sm text-gray-700">
                                        Submissions
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="country"
                                        className="rounded border-gray-300 mr-2"
                                        checked={selectedFields.includes("Country")}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedFields([...selectedFields, "Country"]);
                                            } else {
                                                setSelectedFields(selectedFields.filter(field => field !== "Country"));
                                            }
                                        }}
                                    />
                                    <label htmlFor="country" className="text-sm text-gray-700">
                                        Country
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setSelectedFields([
                                        "Project Name", "Status", "Owner", "Date modified", "Date archived", "Submissions", "Country"
                                    ])}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={applyFields}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ArchivedContent