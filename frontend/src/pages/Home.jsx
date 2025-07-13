// import { useState, useEffect } from "react";
// import { X, Pencil, Rocket, Archive, Book } from "lucide-react";
// import Navbar from "../components/Navbar";
// import ClipboardContent from "../components/ClipboardContent";
// import BookContent from "../components/BookContent";
// import CreateProjectPopup from "../components/CreateProjectPopup";
// import ProjectPopup from "../components/ProjectPopup";
// import axios from "axios";
// import ArchivedContent from "./ArchivedContent"
// import { getAllForms } from "../api";
// import { Link, Route, Routes } from "react-router-dom";

// const Home = () => {
//   const [isBuildFromScratch, setIsBuildFromScratch] = useState(false);
//   const [createForm, setCreateForm] = useState([]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isFieldsOpen, setIsFieldsOpen] = useState(false);
//   const [selectedFields, setSelectedFields] = useState([]);
//   const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("clipboard");

//   const token = localStorage.getItem("token");
//   const [isCreateProjectPopupOpen, setIsCreateProjectPopupOpen] =
//     useState(false);
//   const [activeSidebarItem, setActiveSidebarItem] = useState("deployed");

//   useEffect(() => {
//     const getForm = async () => {
//       try {
//         const data = await getAllForms(token);
//         if (data.length === 0) {
//           setCreateForm([]);
//         } else {
//           setCreateForm(data);
//         }
//       } catch (error) {
//         console.log("Error Finding data", error);
//       }
//     };

//     getForm();
//   }, [token]);

//   const renderContent = () => {
//     switch (activeSection) {
//       case "clipboard":
//         return (
//           <ClipboardContent
//             data={createForm}
//             isFilterOpen={isFilterOpen}
//             setIsFilterOpen={setIsFilterOpen}
//             isFieldsOpen={isFieldsOpen}
//             setIsFieldsOpen={setIsFieldsOpen}
//             selectedFields={selectedFields}
//             setSelectedFields={setSelectedFields}
//           />
//         );
//       case "book":
//         return <BookContent />;
//       default:
//         return <ClipboardContent />;
//     }
//   };

//   const renderSidebarContent = () => {
//     switch (activeSection) {
//       case "book":
//         return (
//           <>
//             <nav className="space-y-1">
//               <span className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
//                 <Rocket className="h-5 w-5 text-gray-500" />
//                 <span>Patient Data</span>
//                 <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">
//                   1
//                 </span>
//               </span>
//             </nav>
//           </>
//         );
//       default:
//         return (
//           <>
//             <button
//               onClick={() => setIsNewProjectModalOpen(true)}
//               className="w-full bg-blue-500 text-white rounded-md py-2 px-4 font-medium hover:bg-blue-400 transition-colors"
//             >
//               NEW
//             </button>
//             <nav className="space-y-1">
//               <Link to="/home/deployed">
//               <button
//                 // onClick={() => setActiveSidebarItem("deployed")}
//                 className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md ${
//                   activeSidebarItem === "deployed" ? "bg-blue-50" : ""
//                 }`}
//               >
//                 <Rocket className="h-5 w-5 text-gray-500" />
//                 <span>Deployed</span>
//                 <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">
//                 {createForm?.length}
//                 </span>
//               </button></Link>

//             <Link to="/home/archived">

//             <button
//                 // onClick={() => setActiveSidebarItem("archived")}
//                 className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md ${
//                   activeSidebarItem === "archived" ? "bg-blue-50" : ""
//                 }`}
//               >
//                 <Archive className="h-5 w-5 text-gray-500" />
//                 <span>Archived</span>
//                 <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">
//                   0
//                 </span>
//               </button>
//               </Link>

//               {/* <button
//                 onClick={() => setActiveSection("book")}
//                 className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md ${
//                   activeSection === "book" ? "bg-blue-50" : ""
//                 }`}
//               >
//                 <Book className="h-5 w-5 text-gray-500" />
//                 <span>Book</span>
//               </button> */}
//             </nav>
//           </>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       <div className="flex flex-1">
//         {/* Left Sidebar */}
//         <aside className="w-60 bg-gray-50 border-r border-gray-300 shadow-xl hidden md:block">
//           <div className="p-4 space-y-6">{renderSidebarContent()}</div>
//         </aside>

//         {/* Secondary Sidebar Content Area
//         <div className="flex-1 bg-white">
//           {activeSidebarItem === "deployed" ? <DeployedContent /> : <ArchivedContent />}
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 overflow-x-hidden">
//           {/* {renderContent()} */}
//           <Routes>
//             <Route
//               path="deployed"
//               element={
//                 <ClipboardContent
//                   data={createForm}
//                   setFormData={setCreateForm}
//                   isFilterOpen={isFilterOpen}
//                   setIsFilterOpen={setIsFilterOpen}
//                   isFieldsOpen={isFieldsOpen}
//                   setIsFieldsOpen={setIsFieldsOpen}
//                   selectedFields={selectedFields}
//                   setSelectedFields={setSelectedFields}
//                 />
//               }
//             />
//             <Route path="archived" element={<ArchivedContent/>} />
//           </Routes>
//         </main>
//       </div>

//       {/* Modals */}
//       {isNewProjectModalOpen && (
//         <div className="fixed inset-0 bg-gray-300 bg-opacity-95 flex items-start justify-center pt-16 z-50">
//           <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
//             <div className="flex items-center bg-blue-400 justify-between p-6 border-b">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Create project: Choose a source
//               </h2>
//               <button
//                 onClick={() => setIsNewProjectModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="p-6">
//               <p className="text-gray-600 mb-8">
//                 Choose one of the options below to continue. You will be
//                 prompted to enter name and other details in further steps.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <button
//                   className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left flex flex-col items-center"
//                   onClick={() => setIsBuildFromScratch(true)}
//                 >
//                   <Pencil className="w-8 h-8 text-gray-600 mb-4" />
//                   <h3 className="text-lg font-medium text-gray-700">
//                     Build from scratch
//                   </h3>
//                 </button>
//                 {isBuildFromScratch && (
//                   <ProjectPopup onClose={() => setIsBuildFromScratch(false)} />
//                 )}

//                 <button
//                   className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left flex flex-col items-center"
//                   onClick={() => setIsCreateProjectPopupOpen(true)}
//                 >
//                   <div className="w-8 h-8 bg-gray-600 text-white flex items-center justify-center font-bold rounded mb-4">
//                     T
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-700">
//                     Use a template
//                   </h3>
//                 </button>
//                 {isCreateProjectPopupOpen && (
//                   <CreateProjectPopup
//                     onClose={() => setIsCreateProjectPopupOpen(false)}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filter Popup */}
//       {isFilterOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-95 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Filter</h3>
//               <button
//                 onClick={() => setIsFilterOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               {/* Filter form content */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Filter by
//                 </label>
//                 <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
//                   <option>Select field</option>
//                   <option>Project Name</option>
//                 </select>
//               </div>
//               {/* More filter form elements */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from "react";
import {
  X,
  Pencil,
  Rocket,
  Archive,
  Book,
  Clipboard,
  Library,
  Menu,
} from "lucide-react"; // Ensure Menu is imported
import Navbar from "../components/Navbar"; // Assuming Navbar component exists
import ClipboardContent from "../components/ClipboardContent"; // Assuming component exists
import CreateProjectPopup from "../components/CreateProjectPopup"; // Assuming component exists
import ProjectPopup from "../components/ProjectPopup"; // Assuming component exists
import ArchivedContent from "./ArchivedContent"; // Assuming component exists (or ../pages/ArchivedContent)
import MyLibraryContent from "../components/MyLibraryContent.jsx"; // Assuming component exists
import PublicLibraryContent from "../components/PublicLibraryContent.jsx"; // Assuming component exists
import { getAllForms } from "../api"; // Assuming API function exists
import {
  Link,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LibraryPopup from "../components/LibraryPopup.jsx";
import ImportProjectByLink from "../components/ImportProjectByLink.jsx";

const Home = () => {
  // --- State ---
  const [activeView, setActiveView] = useState("clipboard"); // Tracks 'clipboard' or 'book' view
  const [isBuildFromScratch, setIsBuildFromScratch] = useState(false);
  const [isBuildLibraryFromScratch, setIsBuildLibraryFromScratch] = useState(false);
  const [createForm, setCreateForm] = useState([]); // Stores fetched form/project data
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFieldsOpen, setIsFieldsOpen] = useState(false); // Assuming this state is used somewhere
  const [selectedFields, setSelectedFields] = useState([]); // Assuming this state is used somewhere
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNewLibraryModalOpen, setIsNewLibraryModalOpen] = useState(false);
  const [isCreateProjectPopupOpen, setIsCreateProjectPopupOpen] =
    useState(false);
  const [isImportByShareableLink, setIsImportByShareableLink] =
    useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Controls mobile sidebar visibility

  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  // --- Determine active sidebar item based on URL ---
  const getCurrentActiveSidebarItem = () => {
    const path = location.pathname;
    if (path.includes("/home/deployed")) return "deployed";
    if (path.includes("/home/archived")) return "archived";
    if (path.includes("/home/my-library")) return "my-library";
    if (path.includes("/home/public-library")) return "public-library";
    if (activeView === "clipboard") return "deployed";
    if (activeView === "book") return "my-library";
    return "deployed"; // Sensible default
  };
  const activeSidebarItem = getCurrentActiveSidebarItem();

  // --- Fetch Forms Effect ---
  useEffect(() => {
    const getForm = async () => {
      try {
        if (token) {
          const data = await getAllForms(token);
          setCreateForm(Array.isArray(data) ? data : []);
          console.log("Fetched forms:", data);
        } else {
          console.log("No token found, skipping form fetch.");
          setCreateForm([]);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching forms:", error);

        // Check for invalid or expired JWT (you can customize this based on your API's error structure)
        if (
          error.response?.status === 401 ||
          error.response?.status === 403 ||
          error.message.includes("jwt")
        ) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setCreateForm([]);
        }
      }
    };
    getForm();
  }, [token]);

  // --- Set Active View based on URL & Close Mobile Sidebar on Nav ---
  useEffect(() => {
    const path = location.pathname;
    if (
      path.startsWith("/home/my-library") ||
      path.startsWith("/home/public-library")
    ) {
      setActiveView("book");
    } else if (
      path.startsWith("/home/deployed") ||
      path.startsWith("/home/archived")
    ) {
      setActiveView("clipboard");
    } else if (path === "/home" || path === "/home/") {
      setActiveView("clipboard");
    }
    // Close mobile sidebar on any navigation change
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // --- Function to close mobile sidebar ---
  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // --- Render Sidebar Content Function ---
  const renderSidebarContent = (isMobile = false) => {
    const handleLinkClick = (originalOnClick = () => {}) => {
      return () => {
        originalOnClick();
        if (isMobile) {
          closeMobileSidebar();
        }
      };
    };

    if (activeView === "book") {
      return (
        <nav className="space-y-1">
          <button
            onClick={handleLinkClick(() => setIsNewLibraryModalOpen(true))}
            className="w-full bg-blue-600 text-white rounded-md py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors mb-4 text-sm tracking-wide shadow-sm"
          >
            New Library
          </button>
          <Link to="/home/my-library" onClick={handleLinkClick()}>
            <button
              className={`flex items-center space-x-3 px-4 py-2 w-full text-left rounded-md transition-colors duration-150 ${
                activeSidebarItem === "my-library"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Book
                className={`h-5 w-5 ${
                  activeSidebarItem === "my-library"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
              <span>My Library</span>
            </button>
          </Link>
          <Link to="/home/public-library" onClick={handleLinkClick()}>
            <button
              className={`flex items-center space-x-3 px-4 py-2 w-full text-left rounded-md transition-colors duration-150 ${
                activeSidebarItem === "public-library"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Library
                className={`h-5 w-5 ${
                  activeSidebarItem === "public-library"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
              <span>Public Library</span>
            </button>
          </Link>
        </nav>
      );
    }

    // activeView === "clipboard"
    return (
      <>
        <button
          onClick={handleLinkClick(() => setIsNewProjectModalOpen(true))}
          className="w-full bg-blue-600 text-white rounded-md py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors mb-4 text-sm tracking-wide shadow-sm"
        >
          NEW PROJECT
        </button>
        <nav className="space-y-1">
          <Link to="/home/deployed" onClick={handleLinkClick()}>
            <button
              className={`flex items-center space-x-3 px-4 py-2 w-full text-left rounded-md transition-colors duration-150 ${
                activeSidebarItem === "deployed"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Rocket
                className={`h-5 w-5 ${
                  activeSidebarItem === "deployed"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
              <span>Deployed</span>
              <span
                className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  activeSidebarItem === "deployed"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {createForm?.filter((form) => !form.archived).length || 0}
              </span>
            </button>
          </Link>
          <Link to="/home/archived" onClick={handleLinkClick()}>
            <button
              className={`flex items-center space-x-3 px-4 py-2 w-full text-left rounded-md transition-colors duration-150 ${
                activeSidebarItem === "archived"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Archive
                className={`h-5 w-5 ${
                  activeSidebarItem === "archived"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              />
              <span>Archived</span>
              <span
                className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  activeSidebarItem === "archived"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {createForm?.filter((form) => form.archived).length || 0}
              </span>
            </button>
          </Link>
        </nav>
      </>
    );
  };

  // --- Render Icon Bar Content ---
  const renderIconBarContent = (isMobile = false) => {
    const handleIconClick = (view) => {
      return () => {
        setActiveView(view);
      };
    };

    return (
      <div
        className={`flex ${
          isMobile
            ? "flex-row justify-around items-center w-full border-b border-gray-200 py-2"
            : "flex-col items-center space-y-4 py-4"
        }`}
      >
        <Link
          to={
            activeSidebarItem === "deployed" || activeSidebarItem === "archived"
              ? location.pathname
              : "/home/deployed"
          }
          onClick={handleIconClick("clipboard")}
          title="Projects"
        >
          <button
            className={`p-2 rounded-md transition-colors duration-150 ${
              activeView === "clipboard"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            <Clipboard className="h-6 w-6" />
          </button>
        </Link>
        <Link
          to={
            activeSidebarItem === "my-library" ||
            activeSidebarItem === "public-library"
              ? location.pathname
              : "/home/my-library"
          }
          onClick={handleIconClick("book")}
          title="Library"
        >
          <button
            className={`p-2 rounded-md transition-colors duration-150 ${
              activeView === "book"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            <Book className="h-6 w-6" />
          </button>
        </Link>
      </div>
    );
  };

  // --- Main Return JSX ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {" "}
      {/* Use relative for potential absolute children if needed */}
      {/* Navbar */}
      <Navbar>
        {/* Mobile Toggle Button (in Navbar) */}
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-2"
          aria-label="Open sidebar"
          aria-expanded={isMobileSidebarOpen}
          aria-controls="mobile-sidebar" // Controls the mobile sidebar
        >
          <Menu className="h-6 w-6" />
        </button>
        {/* Add other Navbar items here */}
      </Navbar>
      <div className="flex flex-1 overflow-hidden">
        {" "}
        {/* Main layout container */}
        {/* --- Mobile Sidebar (Sliding Drawer) --- */}
        {/* Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" // Appear only on mobile when open
            onClick={closeMobileSidebar} // Click overlay to close
            aria-hidden="true"
          ></div>
        )}
        {/* Sidebar Container */}
        <aside
          id="mobile-sidebar" // Added ID for aria-controls
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-xl transform ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full" // Slide animation
          } transition-transform duration-300 ease-in-out md:hidden flex flex-col border-r border-gray-200`} // Only on mobile
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 h-16">
            {" "}
            {/* Header */}
            <span className="font-semibold text-lg text-gray-800">Menu</span>
            <button
              onClick={closeMobileSidebar}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Mobile Icon Bar Section */}
          {renderIconBarContent(true)} {/* Icons horizontal */}
          {/* Mobile Detail Sidebar Section */}
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {" "}
            {/* Scrollable content */}
            {renderSidebarContent(true)} {/* isMobile=true */}
          </div>
        </aside>
        {/* --- Desktop Sidebars --- */}
        {/* Icon Sidebar (Desktop) */}
        <aside className="w-16 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex flex-col shadow-sm">
          {renderIconBarContent(false)} {/* Icons vertical */}
        </aside>
        {/* Inner Sidebar (Desktop) */}
        <aside className="w-60 bg-white border-r border-gray-200 shadow-lg flex-shrink-0 hidden md:block">
          <div className="p-4 space-y-4 h-full overflow-y-auto">
            {" "}
            {/* Scrollable content */}
            {renderSidebarContent(false)} {/* isMobile=false */}
          </div>
        </aside>
        {/* --- Main Content Area --- */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-50">
          <Routes>
            {/* Project Routes */}
            <Route
              path="deployed"
              element={
                <ClipboardContent
                  data={createForm?.filter((form) => !form.archived)}
                  setFormData={setCreateForm}
                  // Pass other needed props like setIsFilterOpen if managed here
                />
              }
            />
            <Route
              path="archived"
              element={
                <ArchivedContent
                  data={createForm?.filter((form) => form.archived)}
                  setFormData={setCreateForm}
                />
              }
            />
            {/* Library Routes */}
            <Route path="my-library" element={<MyLibraryContent />} />
            <Route path="public-library" element={<PublicLibraryContent />} />
            {/* Default & Fallback Routes */}
            <Route path="/" element={<Navigate to="deployed" replace />} />
            <Route path="*" element={<Navigate to="deployed" replace />} />{" "}
            {/* Fallback */}
          </Routes>
        </main>
      </div>
      {/* --- Modals (z-50) --- */}
      {/* New Project Choice Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-auto shadow-xl animate-fade-in-scale">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Create Project
              </h2>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-sm">
                Choose how you want to start your new project. You can provide
                details like name and description in the next step.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-200 text-left flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                  onClick={() => {
                    setIsNewProjectModalOpen(false);
                    setIsBuildFromScratch(true);
                  }}
                >
                  <Pencil className="w-10 h-10 text-blue-600 mb-3 transition-transform group-hover:scale-110" />
                  <h3 className="text-lg text-center font-medium text-gray-800">
                    Build from scratch
                  </h3>
                  <p className="text-xs text-center text-gray-500 mt-1">
                    Start with a blank canvas.
                  </p>
                </button>
                <button
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-200 text-left flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                  onClick={() => {
                    setIsNewProjectModalOpen(false);
                    setIsCreateProjectPopupOpen(true);
                  }}
                >
                  <Library className="w-10 h-10 text-blue-600 mb-3 transition-transform group-hover:scale-110" />
                  <h3 className="text-lg text-center font-medium text-gray-800">
                    Use a template
                  </h3>
                  <p className="text-xs text-center text-gray-500 mt-1">
                    Choose from existing templates.
                  </p>
                </button>
                <button
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-200 text-left flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                  onClick={() => {
                    setIsNewProjectModalOpen(false);
                    setIsImportByShareableLink(true);
                  }}
                >
                  <Library className="w-10 h-10 text-blue-600 mb-3 transition-transform group-hover:scale-110" />
                  <h3 className="text-lg text-center font-medium text-gray-800">
                    Import From Shareable Link
                  </h3>
                  <p className="text-xs text-center text-gray-500 mt-1">
                    Import a project from a shareable link.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       {isNewLibraryModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-xl animate-fade-in-scale">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Create Project
              </h2>
              <button
                onClick={() => setIsNewLibraryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6 text-sm">
              {/* Choose how you want to start your new entry in the library. You can provide
                details like name and description in the next step. */}
                Choose how you want to start your new question. You can provide details like the question text, options, and explanation in the next step.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <button
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-200 text-left flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                  onClick={() => {
                    setIsNewLibraryModalOpen(false);
                    setIsBuildLibraryFromScratch(true);
                  }}
                >
                  <Pencil className="w-10 h-10 text-blue-600 mb-3 transition-transform group-hover:scale-110" />
                  <h3 className="text-lg font-medium text-gray-800">
                    Build from scratch
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Start with a blank canvas.
                  </p>
                </button>
                
                {/* <button
                  className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-200 text-left flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
                  onClick={() => {
                    setIsNewProjectModalOpen(false);
                    setIsCreateProjectPopupOpen(true);
                  }}
                >
                  <Library className="w-10 h-10 text-blue-600 mb-3 transition-transform group-hover:scale-110" />
                  <h3 className="text-lg font-medium text-gray-800">
                    Use a template
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose from existing templates.
                  </p>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Project Popup (Build from scratch) */}
      {isBuildFromScratch && (
        <ProjectPopup onClose={() => setIsBuildFromScratch(false)} /> // Assume z-50 inside
      )}
      {isBuildLibraryFromScratch && (
        <LibraryPopup onClose={() => setIsBuildLibraryFromScratch(false)} /> // Assume z-50 inside
      )}
      {/* Create Project Popup (Template) */}
      {isCreateProjectPopupOpen && (
        <CreateProjectPopup
          onClose={() => setIsCreateProjectPopupOpen(false)}
        /> // Assume z-50 inside
      )}
      {isImportByShareableLink && (
        <ImportProjectByLink 
        onClose={()=>setIsImportByShareableLink(false)}
        />
      )}
      {/* Filter Popup */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-xl animate-fade-in-scale">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Filter Projects
              </h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Filter controls */}
              <div>
                <label
                  htmlFor="filter-field"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Filter by
                </label>
                <select
                  id="filter-field"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
                >
                  <option>Select field</option>
                  <option>Project Name</option>
                  <option>Date Created</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="filter-value"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Value
                </label>
                <input
                  type="text"
                  id="filter-value"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
                  placeholder="Enter filter value..."
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end pt-4 space-x-2 border-t border-gray-200 mt-4">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Applying filter...");
                    setIsFilterOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- Floating Mobile Toggle Button (z-20) --- */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className={`fixed top-2 left-2 z-20 md:hidden p-3 bg-[#2F3542] text-white rounded-full  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out ${
          isMobileSidebarOpen ? "rotate-90 scale-110" : "" // Optional animation
        }`}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileSidebarOpen}
        aria-controls="mobile-sidebar" // Controls the mobile sidebar <aside>
      >
        {/* Icon changes based on state */}
        {isMobileSidebarOpen ? (
          <X className="h-6 w-6 transition-transform duration-300" />
        ) : (
          <Menu className="h-6 w-6 transition-transform duration-300" />
        )}
      </button>
      {/* --- End Floating Mobile Toggle Button --- */}
    </div> // End of main container div
  );
};

export default Home;
