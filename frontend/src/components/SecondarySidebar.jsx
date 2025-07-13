// import { Rocket, FileText, Archive } from "lucide-react"
// import { Link } from "react-router-dom"

// const SecondarySidebar = ({ activeSection, setIsNewProjectModalOpen, setIsNewProjectLibraryModalOpen, setIsClipboardTemplateOpen }) => {
//     const renderContent = () => {
//         switch (activeSection) {

//             case "book":
//                 return (
//                     <>

//                         <nav className="space-y-1">
//                             <span to="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
//                                 <Rocket className="h-5 w-5 text-gray-500" />
//                                 <span>Patient Data</span>
//                                 <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">1</span>
//                             </span>

//                         </nav>
//                     </>
//                 )
//             default:
//                 return (
//                     <>
//                         <button
//                             onClick={() => setIsNewProjectModalOpen(true)}
//                             className="w-full bg-blue-500 text-white rounded-md py-2 px-4 font-medium hover:bg-blue-400 transition-colors"
//                         >
//                             NEW
//                         </button>
//                         <nav className="space-y-1">
//                             <Link to="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
//                                 <Rocket className="h-5 w-5 text-gray-500" />
//                                 <span>Deployed</span>
//                                 <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">1</span>
//                             </Link>

//                             <Link to="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
//                                 <Archive className="h-5 w-5 text-gray-500" />
//                                 <span>Archived</span>
//                                 <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">0</span>
//                             </Link>
//                         </nav>
//                     </>
//                 )
//         }
//     }

//     return (
//         <aside className="w-60 bg-gray-50 border-r border-gray-300 shadow-xl hidden md:block">
//             <div className="p-4 space-y-6">{renderContent()}</div>
//         </aside>
//     )
// }

// export default SecondarySidebar

import { Rocket, Archive, Book } from "lucide-react"
import { useState } from "react"
import DeployedContent from "../pages/DeployedContent";
import ArchivedContent from "../pages/ArchivedContent";

const SecondarySidebar = ({ activeSection, setIsNewProjectModalOpen, setActiveSection, setIsNewProjectLibraryModalOpen, setIsClipboardTemplateOpen }) => {
    // State to track which section is active in the sidebar
    const [activeSidebarItem, setActiveSidebarItem] = useState("archived");

    const renderContent = () => {
        switch (activeSection) {
            case "book":
                return (
                    <>
                        <nav className="space-y-1">
                            <span className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                <Rocket className="h-5 w-5 text-gray-500" />
                                <span>Patient Data</span>
                                <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">1</span>
                            </span>
                        </nav>
                    </>
                )
            default:
                return (
                    <>
                        <button
                            onClick={() => setIsNewProjectModalOpen(true)}
                            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 font-medium hover:bg-blue-400 transition-colors"
                        >
                            NEW
                        </button>
                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveSidebarItem("deployed")}
                                className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md ${
                                    activeSidebarItem === "deployed" ? "bg-blue-50" : ""
                                }`}
                            >
                                <Rocket className="h-5 w-5 text-gray-500" />
                                <span>Deployed</span>
                                <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">1</span>
                            </button>

                            <button
                                onClick={() => setActiveSidebarItem("archived")}
                                className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md ${
                                    activeSidebarItem === "archived" ? "bg-blue-50" : ""
                                }`}
                            >
                                <Archive className="h-5 w-5 text-gray-500" />
                                <span>Archived</span>
                                <span className="ml-auto bg-gray-200 rounded-full px-2.5 py-0.5 text-sm">0</span>
                            </button>
                            
                            <button
                                onClick={() => setActiveSection("book")}
                                className={`flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 rounded-md ${
                                    activeSection === "book" ? "bg-blue-50" : ""
                                }`}
                            >
                                <Book className="h-5 w-5 text-gray-500" />
                                <span>Book</span>
                            </button>
                        </nav>
                    </>
                )
        }
    }

    return (
        <div className="flex w-full">
            <aside className="w-60 bg-gray-50 border-r border-gray-300 shadow-xl hidden md:block">
                <div className="p-4 space-y-6">{renderContent()}</div>
            </aside>

            {/* Content area (only show if not in book section and we're in the default case) */}
            {activeSection !== "book" && (
                <div className="flex-1 bg-white">
                    {activeSidebarItem === "deployed" ? <DeployedContent /> : <ArchivedContent />}
                </div>
            )}
        </div>
    );
}

export default SecondarySidebar