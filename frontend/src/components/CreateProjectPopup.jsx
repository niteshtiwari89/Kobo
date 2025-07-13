// import axios from "axios";
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { PlusCircle, Layout, CheckCircle2 } from "lucide-react";
// const USER_API_URL = "https://relearn-backend.vercel.app";

// const CreateProjectPopup = ({ onClose }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchTemplateData = async () => {
//       const response = await axios.get(`${USER_API_URL}/api/templates`);
//       setData(response.data);

//       console.log("Mera Table hai", data);
//     };

//     fetchTemplateData();
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10">
//       <div className="bg-white  shadow-lg w-[650px]">
//         {/* Header */}
//         <div className=" bg-blue-400 text-white px-4 py-3 flex justify-between items-center ">
//           <h2 className="text-lg font-semibold">
//             Create project: Choose template
//           </h2>
//           <button onClick={onClose} className="text-white text-xl">
//             &times;
//           </button>
//         </div>

//         {/* Body */}
//         <div className="flex flex-wrap items-center w-full">
//         {data.length == 0 ? (
//           <>
//             <div className="p-2">
//               <p className="text-gray-700">
//                 You have no templates. Go to Library and create some.
//               </p>
//             </div>
//           </>
//         ) : (
//           <>
//             {data.map((data) => (
//               <div
//                 key={data._id}
//                 className="w-1/2 p-2  hover:shadow-md transition-all duration-300"
//               >
//                 <div className="p-2 border border-gray-200 overflow-hidden rounded-xl shadow-sm">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
//                       <Layout className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {data.name}
//                       </h3>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-4">
//                     {data.description ||
//                       "A customizable template for your workflow"}
//                   </p>
//                   <button
//                     // onClick={() =>
//                     //   navigate(
//                     //     `/create-template-form/${project.name}/${project._id}/${project.description}`
//                     //   )
//                     // }
//                     className="w-full py-2.5 mt-2 flex items-center justify-center gap-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     <CheckCircle2 className="w-4 h-4" />
//                     Use this template
//                 </button>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end px-4 py-3 rounded-b-lg">
//           <button
//             className="px-4 py-2 text-blue-500    rounded-md mr-2 hover:bg-gray-300"
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

// export default CreateProjectPopup;


// import axios from "axios";
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { PlusCircle, Layout, CheckCircle2 } from "lucide-react";
// const USER_API_URL = "https://relearn-backend.vercel.app";

// const CreateProjectPopup = ({ onClose }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchTemplateData = async () => {
//       const response = await axios.get(`${USER_API_URL}/api/templates`);
//       setData(response.data);

//       console.log("Mera Table hai", data);
//     };

//     fetchTemplateData();
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10">
//       <div className="bg-white  shadow-lg w-[650px]">
//         {/* Header */}
//         <div className=" bg-blue-400 text-white px-4 py-3 flex justify-between items-center ">
//           <h2 className="text-lg font-semibold">
//             Create project: Choose template
//           </h2>
//           <button onClick={onClose} className="text-white text-xl">
//             &times;
//           </button>
//         </div>

//         {/* Body */}
//         <div className="flex flex-wrap items-center w-full">
//         {data.length == 0 ? (
//           <>
//             <div className="p-2">
//               <p className="text-gray-700">
//                 You have no templates. Go to Library and create some.
//               </p>
//             </div>
//           </>
//         ) : (
//           <>
//             {data.map((data) => (
//               <div
//                 key={data._id}
//                 className="w-1/2 p-2  hover:shadow-md transition-all duration-300"
//               >
//                 <div className="p-2 border border-gray-200 overflow-hidden rounded-xl shadow-sm">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
//                       <Layout className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {data.name}
//                       </h3>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-4">
//                     {data.description ||
//                       "A customizable template for your workflow"}
//                   </p>
//                   <button
//                     // onClick={() =>
//                     //   navigate(
//                     //     `/create-template-form/${project.name}/${project._id}/${project.description}`
//                     //   )
//                     // }
//                     className="w-full py-2.5 mt-2 flex items-center justify-center gap-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     <CheckCircle2 className="w-4 h-4" />
//                     Use this template
//                 </button>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end px-4 py-3 rounded-b-lg">
//           <button
//             className="px-4 py-2 text-blue-500    rounded-md mr-2 hover:bg-gray-300"
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

// export default CreateProjectPopup;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { Layout, CheckCircle2 } from "lucide-react";
const USER_API_URL = "https://relearn-backend.vercel.app";
// const USER_API_URL = "http://localhost:5001";
import {useNavigate} from 'react-router-dom'

const CreateProjectPopup = ({ onClose }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplateData = async () => {
      const response = await axios.get(`${USER_API_URL}/api/templates`);
      setData(response.data);

      console.log("Mera Table hai", data);
    };

    fetchTemplateData();
  }, []);

  const handleTemplateSelect = (template) => {
    console.log(template)
    // Navigate to CreateForm page with the selected template
    navigate("/create-form", {
      state: { template }, // Pass the template as state
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-10">
      <div className="bg-white shadow-lg w-[650px] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-blue-400 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Create project: Choose template
          </h2>
          <button onClick={onClose} className="text-white text-xl">
            &times;
          </button>
        </div>

        {/* Body - Made scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-wrap items-center w-full">
            {data.length === 0 ? (
              <div className="p-4 w-full">
                <p className="text-gray-700">
                  You have no templates. Go to Library and create some.
                </p>
              </div>
            ) : (
              <>
                {data.map((item) => (
                  <div
                    key={item._id}
                    className="w-1/2 p-2 hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-2 border border-gray-200 overflow-hidden rounded-xl shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                          <Layout className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {item.description ||
                          "A customizable template for your workflow"}
                      </p>
                      <button
                      onClick={()=>handleTemplateSelect(item)}
                        className="w-full py-2.5 mt-2 flex items-center justify-center gap-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Use this template
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 py-3 mt-auto">
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
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPopup;