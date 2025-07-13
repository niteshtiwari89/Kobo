// // import { useState } from "react";

// // const patients = [
// //     {
// //         id: 1,
// //         name: "Amit Desai",
// //         age: 45,
// //         gender: "Male",
// //         contact: "+91 9876543210",
// //         address: "123 Mumbai Street, Mumbai",
// //         medicalHistory: "Hypertension, Diabetes",
// //         lastVisit: "2024-03-15",
// //         doctor: "Dr. Sharma",
// //         organization: "City Hospital"
// //     },
// //     {
// //         id: 2,
// //         name: "Neha Joshi",
// //         age: 32,
// //         gender: "Female",
// //         contact: "+91 8765432109",
// //         address: "456 Pune Road, Pune",
// //         medicalHistory: "Migraine, Allergies",
// //         lastVisit: "2024-02-20",
// //         doctor: "Dr. Verma",
// //         organization: "Metro Healthcare"
// //     },
// //     {
// //         id: 3,
// //         name: "Deepak Singh",
// //         age: 55,
// //         gender: "Male",
// //         contact: "+91 7654321098",
// //         address: "789 Delhi Avenue, Delhi",
// //         medicalHistory: "Arthritis, High Cholesterol",
// //         lastVisit: "2024-01-10",
// //         doctor: "Dr. Singh",
// //         organization: "Wellness Clinic"
// //     },
// //     {
// //         id: 4,
// //         name: "Ravi Shinde",
// //         age: 28,
// //         gender: "Male",
// //         contact: "+91 9087654321",
// //         address: "321 Bangalore Lane, Bangalore",
// //         medicalHistory: "Asthma",
// //         lastVisit: "2024-03-05",
// //         doctor: "Dr. Rao",
// //         organization: "Central Medical Center"
// //     },
// //     {
// //         id: 5,
// //         name: "Pooja Verma",
// //         age: 38,
// //         gender: "Female",
// //         contact: "+91 8976543210",
// //         address: "654 Kolkata Road, Kolkata",
// //         medicalHistory: "Thyroid Disorder",
// //         lastVisit: "2024-02-15",
// //         doctor: "Dr. Sharma",
// //         organization: "City Hospital"
// //     }
// // ];

// // export default function PatientDetailsPage() {
// //     const [selectedPatient, setSelectedPatient] = useState(null);

// //     return (
// //         <div className="bg-gray-100 p-4 md:p-6 flex flex-col h-screen">
// //             <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
// //                 Patient Information
// //             </h1>

// //             <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
// //                 {/* Patient List */}
// //                 <div className="bg-white shadow-lg p-4 rounded-lg w-full md:w-1/3 flex flex-col min-h-0">
// //                     <h2 className="text-lg font-semibold mb-2 text-center md:text-left">
// //                         Patient List
// //                     </h2>
// //                     <div className="overflow-y-auto flex-1">
// //                         {patients.map((patient) => (
// //                             <div
// //                                 key={patient.id}
// //                                 className={`p-3 border-b cursor-pointer hover:bg-gray-200 ${selectedPatient?.id === patient.id ? "bg-gray-300" : ""
// //                                     }`}
// //                                 onClick={() => setSelectedPatient(patient)}
// //                             >
// //                                 <div className="font-medium">{patient.name}</div>

// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {/* Patient Details */}
// //                 <div className="bg-white shadow-lg p-4 rounded-lg w-full md:flex-1 flex flex-col min-h-0 overflow-auto">
// //                     {selectedPatient ? (
// //                         <div>
// //                             <h2 className="text-xl font-bold mb-4 border-b pb-2">
// //                                 Patient Details
// //                             </h2>
// //                             <div className="grid md:grid-cols-2 gap-4">
// //                                 <div>
// //                                     <p className="text-gray-700 mb-2">
// //                                         <strong>Name:</strong> {selectedPatient.name}
// //                                     </p>
// //                                     <p className="text-gray-700 mb-2">
// //                                         <strong>Age:</strong> {selectedPatient.age}
// //                                     </p>
// //                                     <p className="text-gray-700 mb-2">
// //                                         <strong>Gender:</strong> {selectedPatient.gender}
// //                                     </p>
// //                                 </div>
// //                                 <div>
// //                                     <p className="text-gray-700 mb-2">
// //                                         <strong>Contact:</strong> {selectedPatient.contact}
// //                                     </p>
// //                                     <p className="text-gray-700 mb-2">
// //                                         <strong>Address:</strong> {selectedPatient.address}
// //                                     </p>
// //                                 </div>
// //                             </div>
// //                             <div className="mt-4">
// //                                 <h3 className="text-lg font-semibold mb-2 border-b pb-1">
// //                                     Medical Information
// //                                 </h3>
// //                                 <p className="text-gray-700 mb-2">
// //                                     <strong>Medical History:</strong> {selectedPatient.medicalHistory}
// //                                 </p>
// //                                 <p className="text-gray-700 mb-2">
// //                                     <strong>Last Visit:</strong> {selectedPatient.lastVisit}
// //                                 </p>
// //                             </div>
// //                         </div>
// //                     ) : (
// //                         <div className="flex items-center justify-center h-full text-gray-500">
// //                             Select a patient to view details
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import { Download } from "lucide-react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import moment from "moment";
// import { jsPDF } from "jspdf";

// export default function PatientDetailsPage() {
//   const location = useLocation();

//   const patients = location.state?.project?.groupedResponses || [];

//   console.log("Patients data:", patients);

//   // const [selectedPatient, setSelectedPatient] = useState(null);

//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   console.log("Patients data:", patients);
//   useEffect(() => {
//     if (patients.length) {
//       generateChartData();
//     }
//   }, [patients, fromDate, toDate]);

//   const generateChartData = () => {
//     const today = moment().startOf("day");
//     const startOfWeek = moment().startOf("week");
//     const startOfMonth = moment().startOf("month");
//     const startOfYear = moment().startOf("year");

//     let todayCount = 0;
//     let weeklyCount = 0;
//     let monthlyCount = 0;
//     let yearlyCount = 0;
//     let customCount = 0;

//     patients.forEach((p) => {
//       const createdAt = moment(p.createdAt);

//       if (createdAt.isSame(today, "day")) {
//         todayCount++;
//       }
//       if (createdAt.isSameOrAfter(startOfWeek)) {
//         weeklyCount++;
//       }
//       if (createdAt.isSameOrAfter(startOfMonth)) {
//         monthlyCount++;
//       }
//       if (createdAt.isSameOrAfter(startOfYear)) {
//         yearlyCount++;
//       }
//       // Custom range filter
//       if (fromDate && toDate) {
//         const from = moment(fromDate).startOf("day");
//         const to = moment(toDate).endOf("day");
//         if (createdAt.isBetween(from, to, null, "[]")) {
//           // inclusive
//           customCount++;
//         }
//       }
//     });

//     const labels = ["Today", "Weekly", "Monthly", "Yearly"];
//     const data = [todayCount, weeklyCount, monthlyCount, yearlyCount];

//     if (fromDate && toDate) {
//       labels.push(
//         `Custom (${moment(fromDate).format("MM/DD")} - ${moment(toDate).format(
//           "MM/DD"
//         )})`
//       );
//       data.push(customCount);
//     }

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Patient Submissions",
//           data,
//           backgroundColor: [
//             "rgba(255, 99, 132, 0.6)",
//             "rgba(54, 162, 235, 0.6)",
//             "rgba(255, 206, 86, 0.6)",
//             "rgba(75, 192, 192, 0.6)",
//             "rgba(153, 102, 255, 0.6)", // extra color for custom range
//           ],
//           borderColor: [
//             "rgba(255, 99, 132, 1)",
//             "rgba(54, 162, 235, 1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(75, 192, 192, 1)",
//             "rgba(153, 102, 255, 1)", // extra border color
//           ],
//           borderWidth: 1,
//         },
//       ],
//     });
//   };

//   const handleDownload = () => {
//     const doc = new jsPDF();
//     let yPosition = 10;

//     // Add title
//     doc.setFontSize(16);
//     doc.text("Patient Responses", 10, yPosition);
//     yPosition += 10; // Move to next line

//     console.log("Selected Patient:");
//     if (selectedPatient && selectedPatient.responses) {
//       selectedPatient.responses.forEach((response) => {
//         doc.setFontSize(12);
//         // Add question
//         doc.text(`Question: ${response.questionText}`, 10, yPosition);
//         yPosition += 8; // Add some space between lines

//         // Add answer
//         let answerText =
//           typeof response.answer === "object"
//             ? Object.entries(response.answer)
//                 .map(([key, val]) => `${key} → ${val}`)
//                 .join(", ")
//             : response.answer;

//         doc.text(`Answer: ${answerText}`, 10, yPosition);
//         yPosition += 15; // Add space after each question-answer pair

//         // Check if the content goes beyond the page height, then add a new page
//         if (yPosition > 280) {
//           doc.addPage();
//           yPosition = 10; // Reset position for new page
//         }
//       });
//     }

//     // Save the PDF
//     doc.save(`${selectedPatient.responses[0].answer}_responses.pdf`);
//   };

//   return (
//     <div className="bg-gray-100 p-4 md:p-6 flex flex-col min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
//         Patient Information
//       </h1>

//       <div className="bg-white shadow-lg p-4 rounded-lg w-full mb-6 flex flex-col min-h-0">
//         <h2 className="text-xl font-bold mb-4 border-b pb-2 sticky top-0 bg-white z-10">
//           Patient Submission Graph (Today / Weekly / Monthly / Yearly)
//         </h2>

//         {/* Date Pickers */}
//         <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="border rounded px-2 py-1"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-sm font-medium">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="border rounded px-2 py-1"
//             />
//           </div>
//         </div>

//         {/* Bar Graph */}
//         <div className="flex justify-center items-center">
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               scales: {
//                 y: {
//                   ticks: {
//                     stepSize: 1,
//                     beginAtZero: true,
//                     precision: 0, // ensure no decimal points
//                   },
//                 },
//               },
//             }}
//           />
//           ``
//         </div>
//       </div>
//       <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
//         {/* Patient List */}
//         <div className="bg-white shadow-lg p-4 rounded-lg w-full md:w-1/3 flex flex-col">
//           <h2 className="text-lg font-semibold mb-2 text-center md:text-left">
//             Patient List
//           </h2>
//           <div className="overflow-y-auto max-h-[calc(100vh-250px)] flex-1">
//             {patients?.length === 0 ? (
//               <>No Patients responses</>
//             ) : (
//               <>
//                 {patients?.map((patient) => (
//                   <div
//                     key={patient.id}
//                     className={`p-3 border-b cursor-pointer hover:bg-gray-200 ${
//                       selectedPatient?.id === patient.id ? "bg-gray-300" : ""
//                     }`}
//                     onClick={() => setSelectedPatient(patient)}
//                   >
//                     <div className="font-medium">
//                       {typeof patient.responses[0].answer === "object" &&
//                       patient.responses[0].answer !== null
//                         ? "No name"
//                         : patient.responses[0].answer}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {typeof patient.responses[0].answer === "object" &&
//                       patient.responses[0].answer !== null
//                         ? "No name"
//                         : patient.responses[0].answer}

//                       {console.log(
//                         "Pateint Id",
//                         typeof patient.responses[0].answer === "object" &&
//                           patient.responses[0].answer !== null
//                           ? "No name"
//                           : patient.responses[0].answer
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//         </div>

//         {/* Patient Details */}
//         <div className="bg-white shadow-lg p-4 rounded-lg w-full md:flex-1 flex flex-col min-h-0">
//           {selectedPatient ? (
//             <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
//               <div className="flex justify-between border-b mb-4 pb-2">
//                 <h2 className="text-xl font-bold sticky top-0 bg-white z-10">
//                   Patient Responses
//                 </h2>
//                 <div className="text-xl font-bold">
//                   <button onClick={handleDownload}>
//                     <Download />
//                   </button>
//                 </div>
//               </div>

//               {selectedPatient.responses?.map((response) => (
//                 <div key={response._id} className="border-b py-2">
//                   <p className="text-gray-700">
//                     <strong>Question:</strong> {response.questionText}
//                   </p>
//                   <p className="text-gray-700">
//                     <strong>Answer:</strong>{" "}
//                     {/* {typeof response.answer === "object"
//                       ? Object.entries(response.answer)
//                           .map(([key, val]) => `${key} → ${val}`)
//                           .join(", ")
//                       : response.answer}
//                    */}
//                     {Array.isArray(response.answer) ? (
//                       response.answer.map((imgUrl, idx) => (
//                         <img
//                           key={idx}
//                           src={imgUrl}
//                           alt={`Uploaded response ${idx}`}
//                           className="mt-2 max-w-xs rounded shadow"
//                         />
//                       ))
//                     ) : typeof response.answer === "string" &&
//                       (response.answer.startsWith("http://") ||
//                         response.answer.startsWith("https://")) &&
//                       /\.(jpg|jpeg|png|gif|webp)$/.test(response.answer) ? (
//                       <img
//                         src={response.answer}
//                         alt="Uploaded response"
//                         className="mt-2 max-w-xs rounded shadow"
//                       />
//                     ) : typeof response.answer === "object" ? (
//                       Object.entries(response.answer)
//                         .map(([key, val]) => `${key} → ${val}`)
//                         .join(", ")
//                     ) : (
//                       response.answer
//                     )}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               Select a patient to view details
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";
// import Download from "./Download"; // Your Download icon/component

export default function PatientDetailsPage() {
  const location = useLocation();

  // Memoize patients to prevent unnecessary re-renders
  const patients = useMemo(() => {
    const patientData = location.state?.project?.groupedResponses || [];
    console.log('CollectedData - Patient data structure:', patientData);
    return patientData;
  }, [location.state?.project?.groupedResponses]);

  // console.log(  "Patients data:", location.state?.project?.link);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);

  // For your chart (keeping your existing code)
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const generateChartData = () => {
      const today = moment().startOf("day");
      const startOfWeek = moment().startOf("week");
      const startOfMonth = moment().startOf("month");
      const startOfYear = moment().startOf("year");

      let todayCount = 0;
      let weeklyCount = 0;
      let monthlyCount = 0;
      let yearlyCount = 0;
      let customCount = 0;

      patients.forEach((p) => {
        p.visits.forEach((visit) => {
          const createdAt = moment(visit.date);

          if (createdAt.isSame(today, "day")) {
            todayCount++;
          }
          if (createdAt.isSameOrAfter(startOfWeek)) {
            weeklyCount++;
          }
          if (createdAt.isSameOrAfter(startOfMonth)) {
            monthlyCount++;
          }
          if (createdAt.isSameOrAfter(startOfYear)) {
            yearlyCount++;
          }
          if (fromDate && toDate) {
            const from = moment(fromDate).startOf("day");
            const to = moment(toDate).endOf("day");
            if (createdAt.isBetween(from, to, null, "[]")) {
              customCount++;
            }
          }
        });
      });

      const labels = ["Today", "Weekly", "Monthly", "Yearly"];
      const data = [todayCount, weeklyCount, monthlyCount, yearlyCount];

      if (fromDate && toDate) {
        labels.push(
          `Custom (${moment(fromDate).format("MM/DD")} - ${moment(toDate).format(
            "MM/DD"
          )})`
        );
        data.push(customCount);
      }

      setChartData({
        labels,
        datasets: [
          {
            label: "Patient Submissions",
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    };

    if (patients.length) {
      generateChartData();
    }
  }, [patients, fromDate, toDate]);

  // Helper function to extract patient name robustly
  const getPatientName = (patient) => {
    if (!patient || !patient.visits || !patient.visits[0] || !patient.visits[0].formResponses) {
      return patient?.patient || 'Unknown Patient';
    }
    
    // More robust name extraction - look for name-related questions
    const nameResponse = patient.visits[0].formResponses.find(r => 
      r.questionText && (
        r.questionText.toLowerCase().includes('name') ||
        r.questionText.toLowerCase() === 'name' ||
        r.questionText.toLowerCase().startsWith('name') ||
        r.questionText.toLowerCase().includes('patient name') ||
        r.questionText.toLowerCase().includes('full name')
      )
    );
    
    const extractedName = nameResponse?.answer || nameResponse?.answerText;
    
    console.log('getPatientName debug:', {
      originalPatientValue: patient?.patient,
      nameResponse,
      extractedName,
      isEmail: extractedName ? extractedName.includes('@') : false
    });
    
    // If we found a valid name that's not an email, use it
    if (extractedName && 
        typeof extractedName === 'string' && 
        extractedName.trim() !== '' && 
        !extractedName.includes('@')) {
      return extractedName.trim();
    }
    
    // Fallback to the original patient.patient value
    return patient?.patient || 'Unknown Patient';
  };

  // Helper function to extract icon from patient's form responses
  const getPatientIcon = (patient) => {
    if (!patient || !patient.visits || !patient.visits[0] || !patient.visits[0].formResponses) {
      return null;
    }
    
    const iconResponse = patient.visits[0].formResponses.find(response => 
      response.questionText && 
      (response.questionText.toLowerCase().includes("icon") || 
       response.questionText.toLowerCase().includes("set your icon") ||
       response.questionText.toLowerCase().includes("your icon"))
    );
    
    // Return the icon if it exists and is not empty
    const icon = iconResponse?.answer;
    return (icon && icon.trim() !== '') ? icon : null;
  };

  // Helper function to render icon as image or emoji
  const renderPatientIcon = (patient, sizeClass = "w-6 h-6") => {
    const icon = getPatientIcon(patient);
    const patientName = getPatientName(patient);
    
    // If no icon is set, show patient's first letter as fallback
    if (!icon) {
      return (
        <div 
          className={`${sizeClass} rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-semibold border border-blue-300`}
        >
          {patientName?.charAt(0)?.toUpperCase() || '?'}
        </div>
      );
    }

    // Check if the icon is a URL (image)
    if (typeof icon === "string" && 
        (icon.startsWith("http://") || icon.startsWith("https://")) &&
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(icon)) {
      return (
        <div className="relative">
          <img
            src={icon}
            alt="Patient Icon"
            className={`${sizeClass} rounded-full object-cover border border-gray-300`}
            onError={(e) => {
              // Fallback to showing first letter of patient name if image fails
              const fallbackEl = e.target.nextElementSibling;
              if (fallbackEl) {
                fallbackEl.style.display = 'flex';
              }
              e.target.style.display = 'none';
            }}
          />
          <div 
            className={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold border border-gray-300 hidden`}
            style={{display: 'none'}}
          >
            {patientName?.charAt(0)?.toUpperCase() || '?'}
          </div>
        </div>
      );
    }
    
    // If it's not a URL, treat it as emoji/text
    return <span className="text-lg">{icon}</span>;
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    let yPosition = 10;

    doc.setFontSize(16);
    doc.text("Patient Visit Responses", 10, yPosition);
    yPosition += 10;

    if (selectedVisit && selectedVisit.formResponses) {
      selectedVisit.formResponses.forEach((response) => {
        if (response.questionText === "Visit Number") {
          return; // skip this iteration
        }
        doc.setFontSize(12);
        doc.text(`Question: ${response.questionText}`, 10, yPosition);
        yPosition += 8;

        let answerText =
          typeof response.answer === "object"
            ? Object.entries(response.answer)
                .map(([key, val]) => `${key} → ${val}`)
                .join(", ")
            : response.answer || "(No answer)";

        doc.text(`Answer: ${answerText}`, 10, yPosition);
        yPosition += 15;

        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
      });
    }

    doc.save(
      `${getPatientName(selectedPatient) || "patient"}_visit_${
        selectedVisit?.visitNumber || 0
      }_responses.pdf`
    );
  };

  const handleAddVisit = (patient) => {
    // Get the most recent visit data to extract patient information
    const latestVisit = patient.visits[patient.visits.length - 1];
    const formResponses = latestVisit.formResponses;
    
    // Extract all patient data from the latest visit
    const patientData = {
      // Basic contact information
      email: formResponses.find(q => q.questionText?.toLowerCase() === "email")?.answerText?.trim() ||
             formResponses.find(q => q.questionText?.toLowerCase() === "email")?.answer?.toString().trim() || "",
      
      phone: formResponses.find(q => q.questionText?.toLowerCase().includes("phone"))?.answerText?.trim() ||
             formResponses.find(q => q.questionText?.toLowerCase().includes("phone"))?.answer?.toString().trim() || "",
      
      // Patient name
      name: formResponses.find(q => 
        q.questionText && (
          q.questionText.toLowerCase().includes('name') ||
          q.questionText.toLowerCase() === 'name' ||
          q.questionText.toLowerCase().startsWith('name') ||
          q.questionText.toLowerCase().includes('patient name') ||
          q.questionText.toLowerCase().includes('full name')
        )
      )?.answerText?.trim() || 
      formResponses.find(q => 
        q.questionText && (
          q.questionText.toLowerCase().includes('name') ||
          q.questionText.toLowerCase() === 'name' ||
          q.questionText.toLowerCase().startsWith('name') ||
          q.questionText.toLowerCase().includes('patient name') ||
          q.questionText.toLowerCase().includes('full name')
        )
      )?.answer?.toString().trim() || "",
      
      // Additional common fields
      age: formResponses.find(q => q.questionText?.toLowerCase().includes("age"))?.answerText?.trim() ||
           formResponses.find(q => q.questionText?.toLowerCase().includes("age"))?.answer?.toString().trim() || "",
      
      gender: formResponses.find(q => q.questionText?.toLowerCase().includes("gender"))?.answerText?.trim() ||
              formResponses.find(q => q.questionText?.toLowerCase().includes("gender"))?.answer?.toString().trim() || "",
      
      address: formResponses.find(q => q.questionText?.toLowerCase().includes("address"))?.answerText?.trim() ||
               formResponses.find(q => q.questionText?.toLowerCase().includes("address"))?.answer?.toString().trim() || "",
      
      // Include all form responses for comprehensive data
      allResponses: formResponses.reduce((acc, response) => {
        if (response.questionText && 
            !response.questionText.toLowerCase().includes("visit number") &&
            !response.questionText.toLowerCase().includes("icon")) {
          acc[response.questionText] = response.answerText || response.answer || "";
        }
        return acc;
      }, {})
    };

    console.log("Complete patient data to send:", patientData);
      
    const newWindow = window.open(`https://relearn-admin.vercel.app/form/${location.state?.project?.link}`, "_blank");

    // Wait until new window is fully loaded before sending data
    const interval = setInterval(() => {
      if (newWindow && newWindow.postMessage) {
        newWindow.postMessage(patientData, `https://relearn-admin.vercel.app/form/${location.state?.project?.link}`);
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div className="bg-gray-100 p-4 md:p-6 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Patient Information
      </h1>

      {/* Chart Section */}
      <div className="bg-white shadow-lg p-4 rounded-lg w-full mb-6 flex flex-col min-h-0">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 sticky top-0 bg-white z-10">
          Patient Submission Graph (Today / Weekly / Monthly / Yearly)
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Main Section: Patients → Visits → Details */}
      <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
        {/* Patient List */}
        <div className="bg-white shadow-lg p-4 rounded-lg w-full md:w-1/3 flex flex-col">
          <h2 className="text-lg font-semibold mb-2 text-center md:text-left">
            Patient List
          </h2>
          <div className="overflow-y-auto max-h-[calc(100vh-250px)] flex-1">
            {patients.length === 0 ? (
              <>No Patients responses</>
            ) : (
              patients.map((patient, idx) => (
                <div key={idx}>
                  <div
                    className={`flex justify-between items-center p-3 border-b cursor-pointer hover:bg-gray-200 ${
                      selectedPatient?.patient === patient.patient
                        ? "bg-gray-300"
                        : ""
                    }`}
                    // className="flex justify-between items-center"
                  >
                    <div
                      // className={`p-3 border-b cursor-pointer hover:bg-gray-200 ${
                      //   selectedPatient?.patient === patient.patient
                      //     ? "bg-gray-300"
                      //     : ""
                      // }`}
                      className="w-[50%] flex items-center gap-2"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setSelectedVisit(null);
                      }}
                    >
                      {renderPatientIcon(patient, "w-8 h-8")}
                      <span className="font-medium">{getPatientName(patient)}</span>
                    </div>
                    <div
                      className="bg-green-200 p-2 rounded-lg"
                      onClick={() => handleAddVisit(patient)}
                    >
                      Add Visit
                    </div>
                  </div>

                  {/* Show Visits for selected patient */}
                  {selectedPatient?.patient === patient.patient &&
                    patient.visits.map((visit, vIdx) => (
                      <>
                        <div
                          key={vIdx}
                          className={`ml-6 p-2 border-l border-gray-300 cursor-pointer hover:bg-gray-100 rounded flex items-center gap-2 ${
                            selectedVisit?.visitNumber === visit.visitNumber
                              ? "bg-green-200"
                              : ""
                          }`}
                          onClick={() => setSelectedVisit(visit)}
                        >
                          {renderPatientIcon(selectedPatient, "w-5 h-5")}
                          <span>
                            Visit #{visit.visitNumber} —{" "}
                            {moment(visit.date).format("MM/DD/YYYY")}
                          </span>
                        </div>
                      </>
                    ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Visit Details */}
        <div className="bg-white shadow-lg p-4 rounded-lg w-full md:flex-1 flex flex-col min-h-0">
          {selectedVisit ? (
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <div className="flex justify-between border-b mb-4 pb-2">
                <h2 className="text-xl font-bold sticky top-0 bg-white z-10 flex items-center gap-2">
                  {renderPatientIcon(selectedPatient, "w-10 h-10")}
                  Patient: {getPatientName(selectedPatient)} - Visit #
                  {selectedVisit.visitNumber}
                </h2>
                <button className="text-xl font-bold" onClick={handleDownload}>
                  {/* <Download /> */}Download
                </button>
              </div>

              {selectedVisit.formResponses.length === 0 ? (
                <p>No responses for this visit</p>
              ) : (
                selectedVisit.formResponses.map((response) => {
                  if (response.questionText === "Visit Number") {
                    return; // skip this iteration
                  }
                  return (
                    <div key={response._id} className="border-b py-2">
                      <p className="text-gray-700">
                        <strong>Question:</strong> {response.questionText}
                      </p>
                      <p className="text-gray-700">
                        <strong>Answer:</strong>{" "}
                        {Array.isArray(response.answer) ? (
                          response.answer.map((imgUrl, idx) => (
                            <img
                              key={idx}
                              src={imgUrl}
                              alt={`Uploaded response ${idx}`}
                              className="mt-2 max-w-xs rounded shadow"
                            />
                          ))
                        ) : typeof response.answer === "string" &&
                          (response.answer.startsWith("http://") ||
                            response.answer.startsWith("https://")) &&
                          /\.(jpg|jpeg|png|gif|webp)$/.test(response.answer) ? (
                          <img
                            src={response.answer}
                            alt="Uploaded response"
                            className="mt-2 max-w-xs rounded shadow"
                          />
                        ) : typeof response.answer === "object" ? (
                          Object.entries(response.answer)
                            .map(([key, val]) => `${key} → ${val}`)
                            .join(", ")
                        ) : (
                          response.answer
                        )}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a patient visit to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
