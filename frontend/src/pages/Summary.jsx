// // // import { FileText, Download, Users, Image } from 'lucide-react';
// // // import { useState } from 'react';

// // // const Summary = () => {
// // //     const [isModalOpen, setIsModalOpen] = useState(false);
// // //     const [selectedFormat, setSelectedFormat] = useState("");

// // //     return (
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //             {/* Main Content */}
// // //             <div className="lg:col-span-2">
// // //                 {/* Project Information */}
// // //                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// // //                     <h2 className="text-gray-700 font-medium mb-4">Project Information</h2>
// // //                     <div className="mb-6">
// // //                         <h3 className="text-sm text-gray-500 mb-1">Description</h3>
// // //                         <p className="text-gray-700">demo description</p>
// // //                     </div>
// // //                     <div className="grid grid-cols-3 gap-4 mb-6">
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Status</h3>
// // //                             <span className="inline-flex items-center text-blue-500">
// // //                                 <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
// // //                                 deployed
// // //                             </span>
// // //                         </div>
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Questions</h3>
// // //                             <p>5</p>
// // //                         </div>
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Owner</h3>
// // //                             <p>me</p>
// // //                         </div>
// // //                     </div>
// // //                     <div className="grid grid-cols-3 gap-4 mb-6">
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Last modified</h3>
// // //                             <p>Last Wednesday at 1:35 PM</p>
// // //                         </div>
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Last deployed</h3>
// // //                             <p>February 5, 2025</p>
// // //                         </div>
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Latest submission</h3>
// // //                             <p>February 5, 2025</p>
// // //                         </div>
// // //                     </div>
// // //                     <div className="grid grid-cols-2 gap-4">
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Sector</h3>
// // //                             <p>Health Services / Public Health</p>
// // //                         </div>
// // //                         <div>
// // //                             <h3 className="text-sm text-gray-500 mb-1">Country</h3>
// // //                             <p>India</p>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* Submissions */}
// // //                 <div className="bg-white rounded-lg shadow-sm p-6">
// // //                     <h2 className="text-gray-700 font-medium mb-4">Submissions</h2>
// // //                     <div className="flex space-x-4 mb-8 overflow-x-auto">
// // //                         <button className="px-4 py-2 bg-blue-50 text-blue-500 rounded-full text-sm whitespace-nowrap">Past 7 days</button>
// // //                         <button className="px-4 py-2 text-gray-600 text-sm whitespace-nowrap">Past 31 days</button>
// // //                         <button className="px-4 py-2 text-gray-600 text-sm whitespace-nowrap">Past 3 months</button>
// // //                         <button className="px-4 py-2 text-gray-600 text-sm whitespace-nowrap">Past 12 months</button>
// // //                     </div>
// // //                     <div className="text-center py-8 text-gray-500">
// // //                         No chart data available for current period.
// // //                     </div>
// // //                     <div className="grid grid-cols-2 gap-4 mt-4">
// // //                         <div>
// // //                             <h3 className="text-4xl font-light mb-2">0</h3>
// // //                             <p className="text-gray-500">Feb 8, 2025 – Today</p>
// // //                         </div>
// // //                         <div>
// // //                             <h3 className="text-4xl font-light mb-2 text-blue-500">1</h3>
// // //                             <p className="text-gray-500">Total</p>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* Sidebar */}
// // //             <div className="lg:col-span-1">
// // //                 {/* Quick Links */}
// // //                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// // //                     <h2 className="text-gray-700 font-medium mb-4">Quick Links</h2>
// // //                     <div className="space-y-4">
// // //                         <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
// // //                             <FileText className="w-5 h-5 mr-3 text-gray-400" />
// // //                             <span>Collect data</span>
// // //                         </button>
// // //                         <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
// // //                             <Users className="w-5 h-5 mr-3 text-gray-400" />
// // //                             <span>Share project</span>
// // //                         </button>
// // //                     </div>
// // //                 </div>

// // //                 {/* Data */}
// // //                 <div className="bg-white rounded-lg shadow-sm p-6">
// // //                     <h2 className="text-gray-700 font-medium mb-4">Data</h2>
// // //                     <div className="space-y-4">
// // //                         <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
// // //                             <Image className="w-5 h-5 mr-3 text-gray-400" />
// // //                             <span>Gallery</span>
// // //                         </button>
// // //                         <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded" onClick={() => setIsModalOpen(true)}>
// // //                             <Download className="w-5 h-5 mr-3 text-gray-400" />
// // //                             <span>Downloads</span>
// // //                         </button>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //         </div>
// // //     );
// // // };

// // // export default Summary;

// // //.........................................................................................................//

// // import { FileText, Download, Users, Image, Copy } from "lucide-react";
// // import { useState } from "react";

// // const Summary = ({ data }) => {
// //   const project = data;
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedFormat, setSelectedFormat] = useState("");
// //   const [isCollectDataOpen, setIsCollectDataOpen] = useState(false);
// //   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
// //   const projectLink = `https://relearn-admin.vercel.app/form/${project.link}`; // Replace with actual project link

// //   const copyToClipboard = () => {
// //     navigator.clipboard.writeText(projectLink);
// //     alert("Link copied to clipboard!");
// //   };

// //   const handleCollectDataClick = () => {
// //     setIsCollectDataOpen(true);
// //   };

// //   // Function to get the response text for a question id
// //   const getResponseForQuestion = (questionId, responses) => {
// //     const response = responses.find((res) => res.questionId === questionId);
// //     return response ? response.answer : "No answer";
// //   };

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //       {/* Main Content */}
// //       <div className="lg:col-span-2">
// //         {/* Project Information */}
// //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// //           <h2 className="text-gray-700 font-medium mb-4">
// //             Project Information
// //           </h2>
// //           <div className="mb-6">
// //             <h3 className="text-sm text-gray-500 mb-1">Description</h3>
// //             <p className="text-gray-700">{project.description}</p>
// //           </div>
// //           <div className="grid grid-cols-3 gap-4 mb-6">
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Status</h3>
// //               <span className="inline-flex items-center text-blue-500">
// //                 <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
// //                 deployed
// //               </span>
// //             </div>
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Questions</h3>
// //               <p>5</p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Owner</h3>
// //               <p>me</p>
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-3 gap-4 mb-6">
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Last modified</h3>
// //               <p>
// //                 {new Date(project.updatedAt).toLocaleString("en-IN", {
// //                   timeZone: "Asia/Kolkata",
// //                   weekday: "long",
// //                   year: "numeric",
// //                   month: "long",
// //                   day: "numeric",
// //                   hour: "numeric",
// //                   minute: "numeric",
// //                   second: "numeric",
// //                 })}
// //               </p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Last deployed</h3>
// //               <p>February 5, 2025</p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Latest submission</h3>
// //               <p>
// //                 {new Date(project.createdAt).toLocaleString("en-IN", {
// //                   timeZone: "Asia/Kolkata",
// //                   weekday: "long",
// //                   year: "numeric",
// //                   month: "long",
// //                   day: "numeric",
// //                   hour: "numeric",
// //                   minute: "numeric",
// //                   second: "numeric",
// //                 })}
// //               </p>
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Sector</h3>
// //               <p>Health Services / Public Health</p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm text-gray-500 mb-1">Country</h3>
// //               <p>India</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Submissions */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <h2 className="text-gray-700 font-medium mb-4">Submissions</h2>
// //           <div className="flex space-x-4 mb-8 overflow-x-auto">
// //             <button className="px-4 py-2 bg-blue-50 text-blue-500 rounded-full text-sm whitespace-nowrap">
// //               Past 7 days
// //             </button>
// //             <button className="px-4 py-2 text-gray-600 text-sm whitespace-nowrap">
// //               Past 31 days
// //             </button>
// //             <button className="px-4 py-2 text-gray-600 text-sm whitespace-nowrap">
// //               Past 3 months
// //             </button>
// //             <button className="px-4 py-2 text-gray-600 text-sm whitespace-nowrap">
// //               Past 12 months
// //             </button>
// //           </div>
// //           <div className="text-center py-8 text-gray-500">
// //             No chart data available for current period.
// //           </div>
// //           <div className="grid grid-cols-2 gap-4 mt-4">
// //             <div>
// //               <h3 className="text-4xl font-light mb-2">0</h3>
// //               <p className="text-gray-500">Feb 8, 2025 – Today</p>
// //             </div>
// //             <div>
// //               <h3 className="text-4xl font-light mb-2 text-blue-500">1</h3>
// //               <p className="text-gray-500">Total</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Sidebar */}
// //       <div className="lg:col-span-1">
// //         {/* Quick Links */}
// //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// //           <h2 className="text-gray-700 font-medium mb-4">Quick Links</h2>
// //           <div className="space-y-4">
// //             <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded" onClick={handleCollectDataClick}>
// //               <FileText className="w-5 h-5 mr-3 text-gray-400" />
// //               <span>Collect data</span>
// //             </button>
// //             <button
// //               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
// //               onClick={() => setIsShareModalOpen(true)}
// //             >
// //               <Users className="w-5 h-5 mr-3 text-gray-400" />
// //               <span>Share project</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Data */}
// //         <div className="bg-white rounded-lg shadow-sm p-6">
// //           <h2 className="text-gray-700 font-medium mb-4">Data</h2>
// //           <div className="space-y-4">
// //             <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
// //               <Image className="w-5 h-5 mr-3 text-gray-400" />
// //               <span>Gallery</span>
// //             </button>
// //             <button
// //               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
// //               onClick={() => setIsModalOpen(true)}
// //             >
// //               <Download className="w-5 h-5 mr-3 text-gray-400" />
// //               <span>Downloads</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {isCollectDataOpen && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
// //           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
// //             <h3 className="text-lg font-semibold mb-4">Collected Data</h3>
// //             <div className="space-y-4">
// //               {project.sections.map((section) => (
// //                 <div key={section._id}>
// //                   <h4 className="text-sm font-semibold text-gray-700">{section.title}</h4>
// //                   {section.questions.map((question) => {
// //                     const responseText = getResponseForQuestion(question.id, project.responses[0]?.responses || []);
// //                     return (
// //                       <div key={question._id} className="mb-2">
// //                         <p className="text-gray-600">{question.text}</p>
// //                         <p className="text-gray-500 text-sm">Response: {responseText}</p>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="flex justify-end mt-4">
// //               <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsCollectDataOpen(false)}>
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Share Modal */}
// //       {isShareModalOpen && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
// //           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
// //             <h3 className="text-lg font-semibold mb-4">Share Project</h3>
// //             <div className="flex items-center border rounded p-2">
// //               <input
// //                 type="text"
// //                 className="w-full outline-none"
// //                 value={`https://relearn-admin.vercel.app/form/${project.link}`}
// //                 readOnly
// //               />
// //               <button
// //                 className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
// //                 onClick={copyToClipboard}
// //               >
// //                 <Copy className="w-4 h-4" />
// //               </button>
// //             </div>
// //             <div className="flex justify-end mt-4">
// //               <button
// //                 className="px-4 py-2 bg-gray-300 rounded"
// //                 onClick={() => setIsShareModalOpen(false)}
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Download */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
// //           <div className="bg-white p-6 w-[400px] rounded-lg shadow-lg">
// //             <h3 className="text-lg font-semibold mb-4">Select file format</h3>
// //             <select
// //               className="w-full p-2 border rounded"
// //               onChange={(e) => setSelectedFormat(e.target.value)}
// //             >
// //               <option value="">Choose format</option>
// //               <option value="csv">CSV</option>
// //               <option value="pdf">PDF</option>
// //               <option value="word">Word</option>
// //             </select>
// //             <div className="flex justify-end mt-4 space-x-2">
// //               <button
// //                 className="px-4 py-2 bg-gray-300 rounded"
// //                 onClick={() => setIsModalOpen(false)}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className={`px-4 py-2 bg-blue-500 text-white rounded ${
// //                   !selectedFormat ? "opacity-50 cursor-not-allowed" : ""
// //                 }`}
// //                 disabled={!selectedFormat}
// //               >
// //                 Download
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Summary;

// import { FileText, Download, Users, Image, Copy } from "lucide-react";
// import { useState } from "react";

// const Summary = ({ data }) => {
//   const project = data;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFormat, setSelectedFormat] = useState("");
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
//   const [selectedResponse, setSelectedResponse] = useState(null);
//   const [isCollectDataModalOpen, setIsCollectDataModalOpen] = useState(false); // State for the collect data modal
//   const projectLink = `http://localhost:5174/form/${project.link}`; // Replace with actual project link

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(projectLink);
//     alert("Link copied to clipboard!");
//   };

//   // Function to render responses
//   // const renderResponses = () => {
//   //   return (
//   //     <div
//   //       // key={}
//   //       className="fixed top-0 left-0 right-0 flex items-start justify-center h-[600px] pt-8 overflow  mb-4" // Added padding-top and margin-bottom
//   //       // style={{ top: `${index * 120}px` }} // Adjust vertical positioning of each response
//   //     >
//   //       <div className="bg-white p-6 rounded-lg shadow-lg overflow w-96">
//   //         <div className="flex justify-between items-center mb-4">
//   //           <h3 className="text-gray-700 font-medium">Response</h3>

//   //           <button
//   //             onClick={() => setIsResponseModalOpen(false)}
//   //             className="text-gray-600 text-2xl  hover:text-gray-900"
//   //           >
//   //             &times;
//   //           </button>
//   //         </div>

//   //         {selectedResponse.responses.map((response, index) => (
//   //           <>
//   //             <div className="mb-4">
//   //               <h4 className="text-lg font-semibold text-gray-800">
//   //                 Question:
//   //               </h4>
//   //               <p className="text-gray-700">{response.questionText}</p>
//   //             </div>

//   //             {/* Display Answer */}
//   //             <div className="mb-4">
//   //               <h4 className="text-lg font-semibold text-gray-800">Answer:</h4>
//   //               <p className="text-gray-700">
//   //                 {response.answer || "No Response"}
//   //               </p>
//   //             </div>
//   //             <hr />
//   //           </>
//   //         ))}
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   const renderResponses = () => {
//     return (
//       <div className="fixed top-0 left-0 right-0 flex items-start justify-center h-[600px] pt-8 mb-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-gray-700 font-medium">Response</h3>

//             <button
//               onClick={() => setIsResponseModalOpen(false)}
//               className="text-gray-600 text-2xl hover:text-gray-900"
//             >
//               &times;
//             </button>
//           </div>

//           {/* Make the content scrollable if it exceeds the height */}
//           <div className="overflow-y-auto h-[500px] scroll-hidden">
//             {" "}
//             {/* Adjust the height for scrolling area */}
//             {selectedResponse.responses.map((response, index) => (
//               <div key={index}>
//                 <div className="mb-4">
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     Question:
//                   </h4>
//                   <p className="text-gray-700">{response.questionText}</p>
//                 </div>

//                 {/* Display Answer */}
//                 <div className="mb-4">
//                   <h4 className="text-lg font-semibold text-gray-800">
//                     Answer:
//                   </h4>
//                   <p className="text-gray-700">
//                     {response.answer || "No Response"}
//                   </p>
//                 </div>
//                 <hr />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const openResponseModal = (response) => {
//     console.log("repsonses", response);
//     setSelectedResponse(response); // Set the selected response details
//     setIsResponseModalOpen(true); // Open the modal
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Main Content */}
//       <div className="lg:col-span-2">
//         {/* Project Information */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-gray-700 font-medium mb-4">
//             Project Information
//           </h2>
//           <div className="mb-6">
//             <h3 className="text-sm text-gray-500 mb-1">Description</h3>
//             <p className="text-gray-700">{project.description}</p>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Status</h3>
//               <span className="inline-flex items-center text-blue-500">
//                 <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                 deployed
//               </span>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Questions</h3>
//               <p>5</p>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Owner</h3>
//               <p>me</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Last modified</h3>
//               <p>
//                 {new Date(project.updatedAt).toLocaleString("en-IN", {
//                   timeZone: "Asia/Kolkata",
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "numeric",
//                   minute: "numeric",
//                   second: "numeric",
//                 })}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Last deployed</h3>
//               <p>February 5, 2025</p>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Latest submission</h3>
//               <p>
//                 {new Date(project.createdAt).toLocaleString("en-IN", {
//                   timeZone: "Asia/Kolkata",
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "numeric",
//                   minute: "numeric",
//                   second: "numeric",
//                 })}
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Sector</h3>
//               <p>Health Services / Public Health</p>
//             </div>
//             <div>
//               <h3 className="text-sm text-gray-500 mb-1">Country</h3>
//               <p>India</p>
//             </div>
//           </div>
//         </div>

//         {/* Responses */}
//         {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-gray-700 font-medium mb-4">Responses</h2>
//           <ul className="space-y-4">
//             {project.responses.map((response, index) => (
//               <li
//                 key={index}
//                 className="cursor-pointer text-blue-500 hover:underline"
//                 onClick={() => setIsCollectDataModalOpen(true)}
//               >
//                 Response {index + 1}
//               </li>
//             ))}
//           </ul>
//         </div> */}
//       </div>

//       {/* Sidebar */}
//       <div className="lg:col-span-1">
//         {/* Quick Links */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-gray-700 font-medium mb-4">Quick Links</h2>
//           <div className="space-y-4">
//             <button
//               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
//               onClick={() => setIsCollectDataModalOpen(true)}
//             >
//               <FileText className="w-5 h-5 mr-3 text-gray-400" />
//               <span>Collect data</span>
//             </button>
//             <button
//               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
//               onClick={() => setIsShareModalOpen(true)}
//             >
//               <Users className="w-5 h-5 mr-3 text-gray-400" />
//               <span>Share project</span>
//             </button>
//           </div>
//         </div>

//         {/* Data */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <h2 className="text-gray-700 font-medium mb-4">Data</h2>
//           <div className="space-y-4">
//             <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
//               <Image className="w-5 h-5 mr-3 text-gray-400" />
//               <span>Gallery</span>
//             </button>
//             <button
//               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <Download className="w-5 h-5 mr-3 text-gray-400" />
//               <span>Downloads</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Share Modal */}
//       {isShareModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-lg font-semibold mb-4">Share Project</h3>
//             <div className="flex items-center border rounded p-2">
//               <input
//                 type="text"
//                 className="w-full outline-none"
//                 value={`https://relearn-admin.vercel.app/form/${project.link}`}
//                 readOnly
//               />
//               <button
//                 className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
//                 onClick={copyToClipboard}
//               >
//                 <Copy className="w-4 h-4" />
//               </button>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setIsShareModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Collect Data Modal */}
//       {isCollectDataModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
//             <h3 className="text-lg font-semibold mb-4">{project.responses.length === 0 ?"No Response Found":'All Responses'}</h3>
//             {project.responses.length === 0 ? (
//               <> </>
//             ) : (
//               <>
//                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                   <h2 className="text-gray-700 font-medium mb-4">Responses</h2>
//                   <ul className="space-y-4">
//                     {project.responses.map((response, index) => (
//                       <li
//                         key={index}
//                         className="cursor-pointer text-blue-500 hover:underline"
//                         onClick={() => openResponseModal(response)}
//                       >
//                         Response {index + 1}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </>
//             )}
//             {/* <div>{renderResponses()}</div> */}
//             <div className="flex justify-end mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setIsCollectDataModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isResponseModalOpen && renderResponses()}
//       {/* Download Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
//           <div className="bg-white p-6 w-[400px] rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Select file format</h3>
//             <select
//               className="w-full p-2 border rounded"
//               onChange={(e) => setSelectedFormat(e.target.value)}
//             >
//               <option value="">Choose format</option>
//               <option value="csv">CSV</option>
//               <option value="pdf">PDF</option>
//               <option value="word">Word</option>
//             </select>
//             <div className="flex justify-end mt-4 space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={`px-4 py-2 bg-blue-500 text-white rounded ${
//                   !selectedFormat ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 disabled={!selectedFormat}
//               >
//                 Download
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Summary;

import { Download, Users, Copy, CheckCircle, Eye, FileSpreadsheet, FileText, FileType, Loader, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as Chart from "chart.js/auto";

// const shareLink = "http://localhost:5174"
const shareLink = "https://relearn-admin.vercel.app"

const Summary = () => {
  const location = useLocation();
  const projectData = location.state || {};
  const project = projectData.project || {}; // Use projectData to get the project object
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isCollectDataModalOpen, setIsCollectDataModalOpen] = useState(false); // State for the collect data modal
  const projectLink = `${shareLink}/form/${project.link}`; // Replace with actual project link
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("Today"); // Default to 'Today'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(projectLink);
    alert("Link copied to clipboard!");
  };

  // Helper function to get format information
  const getFormatInfo = (format) => {
    const formatMap = {
      csv: {
        name: "CSV",
        description: "Comma-separated values file, perfect for Excel and data analysis",
        icon: FileSpreadsheet,
        color: "text-green-600",
        bgColor: "bg-green-50",
        size: "Small file size"
      },
      pdf: {
        name: "PDF",
        description: "Professional report with formatting, ideal for sharing and printing",
        icon: FileText,
        color: "text-red-600",
        bgColor: "bg-red-50",
        size: "Medium file size"
      },
      word: {
        name: "Word Document",
        description: "Editable document format for further customization",
        icon: FileType,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        size: "Medium file size"
      }
    };
    return formatMap[format] || {};
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setSelectedFormat("");
    setIsDownloading(false);
    setDownloadProgress(0);
    setDownloadComplete(false);
    setShowPreview(false);
  };

  const renderResponses = () => {
    return (
      <div className="fixed top-0 left-0 right-0 flex items-start justify-center h-[600px] pt-8 mb-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-medium">Response</h3>

            <button
              onClick={() => setIsResponseModalOpen(false)}
              className="text-gray-600 text-2xl hover:text-gray-900"
            >
              &times;
            </button>
          </div>

          {/* Make the content scrollable if it exceeds the height */}
          <div className="overflow-y-auto h-[500px] scroll-hidden">
            {selectedResponse.responses.map((response, index) => {
              // Skip icon questions
              if (response.questionText && response.questionText.toLowerCase().includes('icon')) {
                return null;
              }

              const rawAnswerText = response.answer || "No Response";
              const formattedAnswer = filterAndFormatAnswer(response.questionText, rawAnswerText);
              const stringAnswer = String(rawAnswerText);
              const isFileUrl = stringAnswer && (stringAnswer.includes('http') || stringAnswer.includes('uploads/'));

              return (
                <div key={index}>
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Question:
                    </h4>
                    <p className="text-gray-700">{response.questionText}</p>
                  </div>

                  {/* Display Answer */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Answer:
                    </h4>
                    {isFileUrl ? (
                      <a 
                        href={rawAnswerText} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {formattedAnswer}
                      </a>
                    ) : (
                      <p className="text-gray-700">{formattedAnswer}</p>
                    )}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const openResponseModal = (response) => {
    console.log("repsonses", response);
    setSelectedResponse(response); // Set the selected response details
    setIsResponseModalOpen(true); // Open the modal
  };

  const handleDownload = async () => {
    if (!selectedFormat) return;

    const responses = project.allResponses || project.responses || [];
    
    if (responses.length === 0) {
      alert("No responses available to download.");
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadComplete(false);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      switch (selectedFormat) {
        case "csv":
          await downloadCSV(responses);
          break;
        case "pdf":
          await downloadPDF(responses);
          break;
        case "word":
          await downloadWord(responses);
          break;
        default:
          console.log("Unknown format selected");
      }
      
      clearInterval(progressInterval);
      setDownloadProgress(100);
      setDownloadComplete(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        resetModalState();
      }, 2000);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
      setDownloadProgress(0);
      alert("Download failed. Please try again.");
    }
  };

  // Helper function to filter out icon questions and format file answers
  const filterAndFormatAnswer = (questionText, answerText) => {
    // Skip icon-related questions
    if (questionText && questionText.toLowerCase().includes('icon')) {
      return null;
    }
    
    // Convert answerText to string if it's not already
    const stringAnswer = String(answerText || "No Response");
    
    // Format file/image answers to show only filename
    if (stringAnswer && (stringAnswer.includes('http') || stringAnswer.includes('uploads/'))) {
      // Extract filename from URL/path
      const filename = stringAnswer.split('/').pop() || stringAnswer;
      return filename;
    }
    
    return stringAnswer === "null" || stringAnswer === "undefined" ? "No Response" : stringAnswer;
  };

  const downloadCSV = async (responses) => {
    // Get all unique questions from all responses (excluding icon questions)
    const allQuestions = new Set();
    responses.forEach(response => {
      response.responses.forEach(r => {
        if (r.questionText && !r.questionText.toLowerCase().includes('icon')) {
          allQuestions.add(r.questionText);
        }
      });
    });

    const questionArray = Array.from(allQuestions);
    
    // Create CSV header
    const headers = ["Response ID", "Submission Date", ...questionArray];
    
    // Create CSV rows
    const csvRows = [headers.join(",")];
    
    responses.forEach((response, index) => {
      const row = [
        `Response ${index + 1}`,
        new Date(response.createdAt || Date.now()).toLocaleDateString()
      ];
      
      // Add answers for each question
      questionArray.forEach(question => {
        const answer = response.responses.find(r => r.questionText === question);
        const rawAnswerText = answer ? (answer.answer || answer.answerText || "No Response") : "No Response";
        const formattedAnswer = filterAndFormatAnswer(question, rawAnswerText);
        
        if (formattedAnswer !== null) {
          // Escape commas and quotes in CSV
          const escapedAnswer = String(formattedAnswer).replace(/"/g, '""');
          row.push(`"${escapedAnswer}"`);
        }
      });
      
      csvRows.push(row.join(","));
    });

    // Download CSV
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${project.title || 'form'}_responses.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = async (responses) => {
    // Dynamic import for jsPDF
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    let yPosition = 20;
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20;

    // Add title
    doc.setFontSize(16);
    doc.text(project.title || "Form Responses Report", 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 10;
    
    doc.text(`Total Responses: ${responses.length}`, 20, yPosition);
    yPosition += 20;

    responses.forEach((response, responseIndex) => {
      // Check if we need a new page
      if (yPosition > pageHeight - marginBottom - 60) {
        doc.addPage();
        yPosition = 20;
      }

      // Response header
      doc.setFontSize(14);
      doc.text(`Response ${responseIndex + 1}`, 20, yPosition);
      yPosition += 5;
      
      doc.setFontSize(10);
      doc.text(`Submitted: ${new Date(response.createdAt || Date.now()).toLocaleDateString()}`, 20, yPosition);
      yPosition += 10;

      // Response details (excluding icon questions)
      doc.setFontSize(12);
      response.responses.forEach((r) => {
        // Skip icon questions
        if (r.questionText && r.questionText.toLowerCase().includes('icon')) {
          return;
        }

        // Check if we need a new page
        if (yPosition > pageHeight - marginBottom - 30) {
          doc.addPage();
          yPosition = 20;
        }

        // Question
        doc.setFont(undefined, 'bold');
        const questionLines = doc.splitTextToSize(`Q: ${r.questionText}`, 170);
        doc.text(questionLines, 20, yPosition);
        yPosition += questionLines.length * 6;

        // Answer (format file URLs to show only filename)
        doc.setFont(undefined, 'normal');
        const rawAnswerText = r.answer || r.answerText || "No Response";
        const formattedAnswer = filterAndFormatAnswer(r.questionText, rawAnswerText);
        const answerLines = doc.splitTextToSize(`A: ${formattedAnswer}`, 170);
        doc.text(answerLines, 20, yPosition);
        yPosition += answerLines.length * 6 + 5;
      });
      
      yPosition += 10; // Space between responses
    });

    doc.save(`${project.title || 'form'}_responses.pdf`);
  };

  const downloadWord = async (responses) => {
    // Create HTML content for Word document
    let htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${project.title || 'Form'} Responses Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { color: #666; margin-top: 30px; }
            .response { margin-bottom: 30px; border: 1px solid #ddd; padding: 15px; }
            .question { font-weight: bold; color: #444; margin-top: 15px; }
            .answer { margin: 5px 0 15px 20px; color: #666; }
            .meta { font-style: italic; color: #888; font-size: 12px; }
            .file-link { color: #1e40af; text-decoration: underline; cursor: pointer; }
          </style>
        </head>
        <body>
          <h1>${project.title || 'Form'} Responses Report</h1>
          <p class="meta">Generated on: ${new Date().toLocaleDateString()}</p>
          <p class="meta">Total Responses: ${responses.length}</p>
    `;

    responses.forEach((response, index) => {
      htmlContent += `
        <div class="response">
          <h2>Response ${index + 1}</h2>
          <p class="meta">Submitted: ${new Date(response.createdAt || Date.now()).toLocaleDateString()}</p>
      `;

      response.responses.forEach((r) => {
        // Skip icon questions
        if (r.questionText && r.questionText.toLowerCase().includes('icon')) {
          return;
        }

        const rawAnswerText = r.answer || r.answerText || "No Response";
        const formattedAnswer = filterAndFormatAnswer(r.questionText, rawAnswerText);
        
        // Check if it's a file/image URL to make it clickable
        const stringAnswer = String(rawAnswerText);
        const isFileUrl = stringAnswer && (stringAnswer.includes('http') || stringAnswer.includes('uploads/'));
        
        htmlContent += `
          <div class="question">Q: ${r.questionText}</div>
          <div class="answer">A: ${
            isFileUrl 
              ? `<a href="${rawAnswerText}" class="file-link" target="_blank">${formattedAnswer}</a>`
              : formattedAnswer
          }</div>
        `;
      });

      htmlContent += `</div>`;
    });

    htmlContent += `
        </body>
      </html>
    `;

    // Create and download Word document
    const blob = new Blob([htmlContent], { 
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
    });
    
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${project.title || 'form'}_responses.doc`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Comprehensive submission data across different periods
  const submissionsData = {
    Today: {
      labels: ["Today"],
      data: [10, 2],
    },
    "Past 7 days": {
      labels: ["Feb 1-7", "Jan 25-31", "Jan 18-24", "Jan 11-17", "Jan 4-10"],
      data: [3, 0, 1, 0, 4],
    },
    "Past 31 days": {
      labels: ["Jan 1-7", "Dec 25-31", "Dec 18-24", "Dec 11-17", "Dec 4-10"],
      data: [1, 0, 0, 13, 0],
    },
    "Past 3 months": {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb"],
      data: [0, 2, 9, 9, 1],
    },
    "Past 12 months": {
      labels: [
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
        "Jul 2024",
        "Aug 2024",
        "Sep 2024",
        "Oct 2024",
        "Nov 2024",
        "Dec 2024",
        "Jan 2025",
        "Feb 2025",
      ],
      data: [5, 20, 8, 4, 0, 6, 0, 44, 0, 10, 0, 0],
    },
  };

  const updateChart = (period) => {
    if (chartRef.current && chartInstance) {
      const periodData = submissionsData[period];

      // Update labels and data
      chartInstance.data.labels = periodData.labels;
      chartInstance.data.datasets[0].data = periodData.data;

      // Calculate total submissions for the period
      const total = periodData.data.reduce((a, b) => a + b, 0);
      setTotalSubmissions(total);

      // Update chart
      chartInstance.update();

      return total;
    }
    return 0;
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    updateChart(period);
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create new chart with initial data
      const newChartInstance = new Chart.Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: submissionsData["Past 7 days"].labels,
          datasets: [
            {
              label: "Submissions",
              data: submissionsData["Past 7 days"].data,
              backgroundColor: "rgba(59, 130, 246, 0.7)", // Blue color
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      setChartInstance(newChartInstance);

      // Calculate initial total submissions
      const initialTotal = submissionsData["Past 7 days"].data.reduce(
        (a, b) => a + b,
        0
      );
      setTotalSubmissions(initialTotal);
    }

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Project Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-gray-700 font-medium mb-4">
            Project Information
          </h2>
          <div className="mb-6">
            <h3 className="text-sm text-gray-500 mb-1">Description</h3>
            <p className="text-gray-700">{project.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Status</h3>
              <span className="inline-flex items-center text-blue-500">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                deployed
              </span>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Questions</h3>
              <p>5</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Owner</h3>
              <p>me</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Last modified</h3>
              <p>
                {new Date(project.updatedAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Last deployed</h3>
              <p>February 5, 2025</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Latest submission</h3>
              <p>
                {new Date(project.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Sector</h3>
              <p>Health Services / Public Health</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Country</h3>
              <p>India</p>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
            <button
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Users className="w-5 h-5 mr-3 text-gray-400" />
              <span>Share project</span>
            </button>

            <button
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              <Download className="w-5 h-5 mr-3 text-gray-400" />
              <span>Downloads</span>
            </button>
          </div>
        </div>

        {/* Submissions */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl text-gray-700 font-semibold mb-4">
            Submissions
          </h2>
          <div className="flex space-x-4 mb-8 overflow-x-auto">
            {Object.keys(submissionsData).map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedPeriod === period
                    ? "bg-blue-50 text-blue-500"
                    : "text-gray-600"
                }`}
                onClick={() => handlePeriodChange(period)}
              >
                {period}
              </button>
            ))}
          </div>

          {/ *   Chart.js Bar Graph for Submissions * /}
          <div className="h-64 w-full">
            <canvas ref={chartRef}></canvas>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-4xl font-light mb-2">
                {selectedPeriod === "Today" ? "10" : totalSubmissions}
              </h3>
              <p className="text-gray-500">Feb 8, 2025 – Today</p>
            </div>
            <div>
              <h3 className="text-4xl font-light mb-2 text-blue-500">
                {totalSubmissions}
              </h3>
              <p className="text-gray-500">Total</p>
            </div>
          </div>
        </div> */}

        {/* Responses */}
        {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-gray-700 font-medium mb-4">Responses</h2>
          <ul className="space-y-4">
            {project.responses.map((response, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => setIsCollectDataModalOpen(true)}
              >
                Response {index + 1}
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Sidebar 
      <div className="lg:col-span-1">
        {/* Quick Links *
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-gray-700 font-medium mb-4">Quick Links</h2>
          <div className="space-y-4">
            <button
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
              onClick={() => setIsCollectDataModalOpen(true)}
            >
              <FileText className="w-5 h-5 mr-3 text-gray-400" />
              <span>Collect data</span>
            </button>
            <button
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Users className="w-5 h-5 mr-3 text-gray-400" />
              <span>Share project</span>
            </button>
          </div>
        </div>

        {/* 
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-gray-700 font-medium mb-4">Data</h2>
          <div className="space-y-4">
            <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded">
              <Image className="w-5 h-5 mr-3 text-gray-400" />
              <span>Gallery</span>
            </button>
            <button
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-50 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              <Download className="w-5 h-5 mr-3 text-gray-400" />
              <span>Downloads</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Share Project</h3>
            <div className="flex items-center border rounded p-2">
              <input
                type="text"
                className="w-full outline-none"
                value={`https://relearn-admin.vercel.app/form/${project.link}`}
                readOnly
              />
              <button
                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsShareModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collect Data Modal */}
      {isCollectDataModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {project.responses.length === 0
                ? "No Response Found"
                : "All Responses"}
            </h3>
            {project.responses.length === 0 ? (
              <> </>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-gray-700 font-medium mb-4">Responses</h2>
                  <ul className="space-y-4">
                    {project.responses.map((response, index) => (
                      <li
                        key={index}
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => openResponseModal(response)}
                      >
                        Response {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {/* <div>{renderResponses()}</div> */}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsCollectDataModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isResponseModalOpen && renderResponses()}
      {/* Enhanced Download Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
          onClick={(e) => e.target === e.currentTarget && resetModalState()}
        >
          <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[90vh] overflow-hidden"
               onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Download Report</h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Export {project.allResponses?.length || project.responses?.length || 0} responses
                  </p>
                </div>
                <button
                  onClick={resetModalState}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {!isDownloading && !downloadComplete && (
                <>
                  {/* Format Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select file format
                    </label>
                    <div className="space-y-3">
                      {['csv', 'pdf', 'word'].map((format) => {
                        const formatInfo = getFormatInfo(format);
                        const IconComponent = formatInfo.icon;
                        return (
                          <div
                            key={format}
                            className={`relative rounded-lg border-2 cursor-pointer transition-all ${
                              selectedFormat === format
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedFormat(format)}
                          >
                            <div className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${formatInfo.bgColor}`}>
                                    <IconComponent className={`w-6 h-6 ${formatInfo.color}`} />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">{formatInfo.name}</h4>
                                    <p className="text-sm text-gray-500">{formatInfo.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs text-gray-400">{formatInfo.size}</span>
                                  {selectedFormat === format && (
                                    <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preview Option */}
                  {selectedFormat && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Preview</span>
                        </div>
                        <button
                          onClick={togglePreview}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {showPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                      </div>
                      
                      {showPreview && (
                        <div className="mt-3 p-3 bg-white rounded border max-h-32 overflow-y-auto">
                          <div className="text-xs text-gray-600">
                            <div className="font-medium mb-1">Sample content for {getFormatInfo(selectedFormat).name}:</div>
                            {selectedFormat === 'csv' && (
                              <div className="font-mono">
                                Response ID, Submission Date, Question 1, Question 2...<br />
                                Response 1, {new Date().toLocaleDateString()}, Answer 1, Answer 2...
                              </div>
                            )}
                            {selectedFormat === 'pdf' && (
                              <div>
                                📄 Professional formatted report with headers, questions, and answers<br />
                                ✓ Ready for printing and sharing
                              </div>
                            )}
                            {selectedFormat === 'word' && (
                              <div>
                                📝 Editable document with styled formatting<br />
                                ✓ Compatible with Microsoft Word and Google Docs
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Download Progress */}
              {isDownloading && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Preparing your download...
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Processing {project.allResponses?.length || project.responses?.length || 0} responses
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{downloadProgress}% complete</p>
                </div>
              )}

              {/* Download Complete */}
              {downloadComplete && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Download Complete!
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your {getFormatInfo(selectedFormat).name} file has been downloaded successfully.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              {!isDownloading && !downloadComplete && (
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    onClick={resetModalState}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                      !selectedFormat ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!selectedFormat}
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {selectedFormat ? getFormatInfo(selectedFormat).name : ''}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
