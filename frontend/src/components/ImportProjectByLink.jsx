// // // import React from 'react'

// // // const ImportProjectByLink = ({onClose}) => {
// // //   return (
// // //     <div>
      
// // //     </div>
// // //   )
// // // }

// // // export default ImportProjectByLink


// // import React, { useState } from "react";
// // import axios from "axios";

// // const ImportProjectByLink = ({ onClose }) => {
// //   const [link, setLink] = useState(""); // For storing the inputted link
// //   const [message, setMessage] = useState(""); // To show messages (success or error)
// //   const [loading, setLoading] = useState(false); // To show loading state

// //   const handleLinkChange = (e) => {
// //     setLink(e.target.value);
// //   };

// //   const handleImport = async () => {
// //     if (!link) {
// //       setMessage("Please enter a valid link.");
// //       return;
// //     }

// //     setLoading(true);
// //     setMessage("");

// //     try {
// //       // Make a request to check if the link is valid
// //       const response = await axios.get(`/api/form/link/${link}`);
// //       const formId = response.data.formId;

// //       // Send a permission request for the form
// //       await axios.post(`/form/${formId}/request-permission`);

// //       setMessage("Permission request sent successfully!");
// //       setLoading(false);
      
// //       // Optionally close the modal
// //       onClose();

// //     } catch (error) {
// //       setLoading(false);
// //       if (error.response?.status === 404) {
// //         setMessage("Form not found or invalid link.");
// //       } else {
// //         setMessage("An error occurred. Please try again.");
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h3>Import Project by Link</h3>
      
// //       <div>
// //         <label htmlFor="link">Enter Shareable Link:</label>
// //         <input
// //           type="text"
// //           id="link"
// //           value={link}
// //           onChange={handleLinkChange}
// //           placeholder="Paste the shareable link here"
// //         />
// //       </div>

// //       <button onClick={handleImport} disabled={loading}>
// //         {loading ? "Requesting..." : "Import Project"}
// //       </button>

// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // };

// // export default ImportProjectByLink;


// import React, { useState } from "react";
// import axios from "axios";
// // import { Layout, CheckCircle2 } from "react-icons"; // Assuming you're using icons, you can replace with others

// const ImportProjectByLink = ({ onClose }) => {
//   const [link, setLink] = useState(""); // Store the entered link
//   const [message, setMessage] = useState(""); // Show success or error messages
//   const [loading, setLoading] = useState(false); // Loading state for request

//   const handleLinkChange = (e) => {
//     setLink(e.target.value);
//   };

//   const handleImport = async () => {
//     if (!link) {
//       setMessage("Please enter a valid link.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       // Validate the link by checking against the backend
//       const response = await axios.get(`/api/form/link/${link}`);
//       const formId = response.data.formId;

//       // Send a permission request to the backend to access the form
//       await axios.post(`/form/${formId}/request-permission`);

//       setMessage("Permission request sent successfully!");
//       setLoading(false);

//       // Optionally close the modal after successful request
//       onClose();
//     } catch (error) {
//       setLoading(false);
//       if (error.response?.status === 404) {
//         setMessage("Form not found or invalid link.");
//       } else {
//         setMessage("An error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10">
//       <div className="bg-white shadow-lg w-[650px] flex flex-col max-h-[90vh]">
//         {/* Header */}
//         <div className="bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Import Project by Link</h2>
//           <button onClick={onClose} className="text-white text-xl">
//             &times;
//           </button>
//         </div>

//         {/* Body - Made scrollable */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="p-4">
//             <label htmlFor="link" className="block text-gray-700 mb-2">
//               Enter Shareable Link:
//             </label>
//             <input
//               type="text"
//               id="link"
//               value={link}
//               onChange={handleLinkChange}
//               className="w-full p-2 border border-gray-300 rounded-md mb-4"
//               placeholder="Paste the shareable link here"
//             />
//             <button
//               onClick={handleImport}
//               className={`w-full py-2.5 mt-4 flex items-center justify-center gap-2 ${loading ? "bg-gray-300" : "bg-blue-500"} text-white rounded-lg hover:bg-blue-600 transition-all duration-200`}
//               disabled={loading}
//             >
//               {loading ? "Requesting..." : "Import Project"}
//             </button>
//             {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end px-4 py-3 mt-auto">
//           <button
//             className="px-4 py-2 text-blue-500 rounded-md mr-2 hover:bg-gray-300"
//             onClick={onClose}
//           >
//             Back
//           </button>
//           <button
//             className="px-4 py-2 text-white bg-blue-400 rounded-md cursor-not-allowed"
//             disabled
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImportProjectByLink;


import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ImportProjectByLink = ({ onClose }) => {
  const [url, setUrl] = useState(""); // Store full URL
  const [formId, setFormId] = useState(""); // Store extracted form ID
  const [message, setMessage] = useState(""); // Display success/error message
  const [loading, setLoading] = useState(false); // Loading state for request
const tokenId = parseJwt(localStorage.getItem("token"))
  // Handle input change
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

   const extractFormId = (url) => {
    try {
      // Parse the URL
      const parsedUrl = new URL(url);
      const pathParts = parsedUrl.pathname.split("/");

        console.log(pathParts)
      // The form ID will be the last segment of the path
      const formId = pathParts[pathParts.length - 1];

      console.log(formId)

      return formId;
    } catch (error) {
      return null;
    }
  };

  // Handle import action
  const handleImport = async () => {
    if (!url) {
      setMessage("Please enter a valid form URL.");
      return;
    }

    const extractedFormId = extractFormId(url);

    if (!extractedFormId) {
      setMessage("Invalid URL format. Could not extract form ID.");
      return;
    }


    setLoading(true);
    setMessage(""); // Clear previous messages
    setFormId(extractedFormId); 

    try {
        // Call the backend API with the full URL
        const response = await axios.get(`https://relearn-backend.vercel.app/api/forms/link/${formId}`);
        console.log(response.data)
        console.log(tokenId.userId)
    if(tokenId.userId === response.data.userId)
    {
        setMessage("Cannot Assign Project to Ourself")
        return toast.error("Cannot Assign Project to Ourself");
    }
    //   if (response.status === 200) {
    //     // Form found, request permission
    //     await axios.post(`http://localhost:5001/api/forms/form/${response.data._id}/request-permission`,{},{headers:{
    //             Authorization:`Bearer ${tokenId}`
    //     }});

    //     setMessage("Permission request sent successfully!");
    //     setLoading(false);

    //     // Close the modal after success
    //     onClose();
    //   }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 404) {
        setMessage("Form not found.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
    finally{
        setLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10">
      <div className="bg-white shadow-lg w-[650px] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Import Project by Link</h2>
          <button onClick={onClose} className="text-white text-xl">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <label htmlFor="url" className="block text-gray-700 mb-2">
              Enter Shareable Link:
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={handleUrlChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Paste the shareable link here"
            />
            <button
              onClick={handleImport}
              className={`w-full py-2.5 mt-4 flex items-center justify-center gap-2 ${loading ? "bg-gray-300" : "bg-blue-500"} text-white rounded-lg hover:bg-blue-600 transition-all duration-200`}
              disabled={loading}
            >
              {loading ? "Requesting..." : "Import Project"}
            </button>
            {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}
          </div>
        </div>

        {/* Footer */}
        {/* <div className="flex justify-end px-4 py-3 mt-auto">
          <button
            className="px-4 py-2 text-blue-500 rounded-md mr-2 hover:bg-gray-300"
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-400 rounded-md cursor-not-allowed"
            disabled
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ImportProjectByLink;


function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}