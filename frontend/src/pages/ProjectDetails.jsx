// import { useState } from 'react';
// import Summary from './Summary';
// import FormPage from './FormPage';
// import DataPage from './DataPage';
// import SettingsPage from './SettingPage';
// import { useLocation } from 'react-router-dom';

// const ProjectDashboard = () => {
//     const location = useLocation();
//     const {project}= location.state || {};
//     console.log(project)

//     const [activePage, setActivePage] = useState('SUMMARY');

//     // Render the active page based on state
//     const renderPage = () => {
//         switch (activePage) {
//             case 'SUMMARY':
//                 return <Summary data = {project}/>;
//             case 'REPORT':
//                 return <FormPage />;
//             default:
//                 return <Summary data = {project} />;
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-4">
//             <div className="max-w-6xl mx-auto">
//                 {/* Navigation Tabs */}
//                 <nav className="flex border-b mb-6 overflow-x-auto">
//                     {['SUMMARY', 'REPORT'].map((page) => (
//                         <button
//                             key={page}
//                             onClick={() => setActivePage(page)}
//                             className={`px-6 py-2 whitespace-nowrap ${activePage === page
//                                 ? 'text-blue-500 border-b-2 border-blue-500'
//                                 : 'text-gray-600'
//                                 }`}
//                         >
//                             {page}
//                         </button>
//                     ))}
//                 </nav>

//                 {/* Page Content */}
//                 {renderPage()}
//             </div>
//         </div>
//     );
// };

// export default ProjectDashboard;

import React from "react";
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Summary from "./Summary";
import FormPage from "./FormPage";
import CollectedData from "./CollectedData";
import Gallery from "./Gallery";
import { useLocation } from "react-router-dom";
import PermissionRequest from "./PermissionRequest";
import KeepNotes from "./KeepNotes";
import ReferenceNotes from "./ReferenceNotes";

const ProjectDashboard = () => {
  const location = useLocation();
  const { project } = location.state || {};

  console.log(project);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="mr-2" size={24} />
            <span>Back to Projects</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex border-b mb-6 overflow-x-auto">
          <NavLink
            to="/project-details/summary"
            className={({ isActive }) =>
              `px-6 py-2 whitespace-nowrap ${
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`
            }
            state={{ project }}
          >
            SUMMARY
          </NavLink>

          <NavLink
            to="/project-details/report"
            className={({ isActive }) =>
              `px-6 py-2 whitespace-nowrap ${
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`
            }
            state={{ project }}
          >
            REPORT
          </NavLink>

          <NavLink
            to="/project-details/collected-data"
            className={({ isActive }) =>
              `px-6 py-2 whitespace-nowrap ${
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`
            }
            state={{ project }}
          >
            COLLECTED DATA
          </NavLink>

          <NavLink
            to="/project-details/gallery"
            className={({ isActive }) =>
              `px-6 py-2 whitespace-nowrap ${
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`
            }
            state={{ project }}
          >
            GALLERY
          </NavLink>
          <NavLink
            to="/project-details/notes"
            className={({ isActive }) =>
              `px-6 py-2 whitespace-nowrap ${
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`
            }
            state={{ project }}
          >
            NOTES
          </NavLink>
          <NavLink
            to="/project-details/references"
            className={({ isActive }) =>
              `px-6 py-2 whitespace-nowrap ${
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`
            }
            state={{ project }}
          >
            REFERENCES
          </NavLink>
          <NavLink
            to="/project-details/request"
            className={({ isActive }) =>
              `px-6 py-2 whitespace-nowrap ${
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600"
              }`
            }
            state={{ project }}
          >
            PROJECT REQUEST
          </NavLink>
        </nav>

        {/* Page Content */}
        <Routes>
          <Route path="summary" element={<Summary data={project} />} />
          <Route
            path="collected-data"
            element={<CollectedData data={project} />}
          />
          <Route path="report" element={<FormPage />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="notes" element={<KeepNotes />} />
          <Route path="references" element={<ReferenceNotes />} />
          <Route path="request" element={<PermissionRequest />} />
          <Route path="" element={<Navigate to="summary" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProjectDashboard;
