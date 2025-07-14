// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getFormByLink, submitFormResponse } from "../api";

// const FormFill = () => {
//   const { link } = useParams();
//   const [form, setForm] = useState(null);
//   const [responses, setResponses] = useState({});

//   console.log(responses)
//   useEffect(() => {
//     const fetchForm = async () => {
//       const data = await getFormByLink(link);
//       setForm(data);
//     };
//     fetchForm();
//   }, [link]);

//   // const handleChange = (questionId, value, type) => {
//   //   setResponses((prevResponses) => {
//   //     if (type === "Checkbox") {
//   //       // Ensure it's stored as an array for checkboxes
//   //       const selectedOptions = prevResponses[questionId] || [];
//   //       const updatedSelections = selectedOptions.includes(value)
//   //         ? selectedOptions.filter((option) => option !== value) // Remove if already selected
//   //         : [...selectedOptions, value]; // Add if not selected

//   //       return { ...prevResponses, [questionId]: updatedSelections };
//   //     }

//   //     return { ...prevResponses, [questionId]: value }; // Store other input types normally
//   //   });
//   // };

//   const handleChange = (questionId, value, type) => {
//     setResponses((prevResponses) => {
//         if (type === "Checkbox") {
//             // Handle checkboxes as an array (multiple selections allowed)
//             const selectedOptions = prevResponses[questionId] || [];
//             const updatedSelections = selectedOptions.includes(value)
//                 ? selectedOptions.filter((option) => option !== value) // Remove if already selected
//                 : [...selectedOptions, value]; // Add if not selected

//             return { ...prevResponses, [questionId]: updatedSelections };
//         }

//         // For other question types (e.g., Short Answer, Long Answer, etc.), store as a single value
//         return { ...prevResponses, [questionId]: value };
//     });
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(responses)
//     const responseData = {
//       formLink: link,
//       responses: Object.keys(responses).map((questionId) => {
//         const question = form.sections
//           .flatMap((section) => section.questions)
//           .find((q) => q._id === questionId); // Find the question based on its ID
//           console.log(form.sections.flatMap((section) => section.questions.find((q) => q.id === questionId)))
//         return {
//           questionId,
//           questionText: question ? question.text : "Unknown Question", // Handle case if question is not found
//           answer: responses[questionId],
//         };
//       }),
//     };
//     console.log(responseData)
//     // await submitFormResponse(responseData);
//     alert("Form submitted successfully!");
//   };

//   if (!form) {
//     return <div>Loading...</div>;
//   }

//   // Function to check if a section should be visible
//   const isSectionVisible = (section) => {
//     if (!section.visibilityCondition) return true; // No condition → Always visible

//     const { questionId, optionId } = section.visibilityCondition;
//     const selectedOptions = responses[questionId] || []; // Get selected options (array for checkboxes)

//     return selectedOptions.includes(optionId); // Section visible if the required option is selected
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
//           {form.title}
//         </h1>
//         <p className="text-gray-600 mb-8 text-center text-lg">
//           {form.description}
//         </p>

//         <form onSubmit={handleSubmit}>
//           {/* {form.sections
//             .filter(isSectionVisible) // Filter sections based on visibility
//             .map((section, sectionIndex) => (
//               <div key={sectionIndex} className="mb-8">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>

//                 {section.questions.map((question, questionIndex) => (
//                   <div key={questionIndex} className="mb-6">
//                     <label className="block text-gray-700 mb-2">{question.text}</label>

//                     {question.type === "Short Answer" && (
//                       <input
//                         type="text"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) => handleChange(question._id, e.target.value)}
//                       />
//                     )}

//                     {question.type === "Long Answer" && (
//                       <textarea
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         rows="4"
//                         onChange={(e) => handleChange(question._id, e.target.value)}
//                       />
//                     )}

//                     {(question.type === "Multiple Choice" || question.type === "Checkbox") && (
//                       <div className="space-y-2">
//                         {question.options.map((option, optionIndex) => (
//                           <div key={optionIndex._id} className="flex items-center">
//                             <input
//                               type={question.type === "Multiple Choice" ? "radio" : "radio"}
//                               className="mr-2"
//                               name={question._id}
//                               value={option._id}
//                               checked={(responses[question._id] || []).includes(option._id)}
//                               onChange={(e) => handleChange(question._id, e.target.value,question.type)}
//                             />
//                             <label className="text-gray-700">{option.text}</label>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {question.type === "Decimal" && (
//                       <input
//                         type="number"
//                         step="0.01"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) => handleChange(question._id, e.target.value)}
//                       />
//                     )}

//                     {question.type === "Number" && (
//                       <input
//                         type="number"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) => handleChange(question._id, e.target.value)}
//                       />
//                     )}

//                     {question.type === "File" && (
//                       <input
//                         type="file"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) => handleChange(question._id, e.target.files[0])}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))} */}
//           {form.sections.map((section, sectionIndex) => {
//             if (!isSectionVisible(section)) return null; // Hide section if not visible
//             return (
//               <div key={sectionIndex} className="mb-8">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                   {section.title}
//                 </h2>

//                 {section.questions.map((question, questionIndex) => (
//                   <div key={questionIndex} className="mb-6">
//                     <label className="block text-gray-700 mb-2">
//                       {question.text}
//                     </label>

//                     {question.type === "Short Answer" && (
//                       <input
//                         type="text"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) =>
//                           handleChange(question._id, e.target.value)
//                         }
//                       />
//                     )}

//                     {question.type === "Long Answer" && (
//                       <textarea
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         rows="4"
//                         onChange={(e) =>
//                           handleChange(question._id, e.target.value)
//                         }
//                       />
//                     )}

//                     {(question.type === "Multiple Choice" ||
//                       question.type === "Checkbox") && (
//                       <div className="space-y-2">
//                         {question.options.map((option, optionIndex) => (
//                           <div
//                             key={optionIndex._id}
//                             className="flex items-center"
//                           >
//                             <input
//                               type={
//                                 question.type === "Multiple Choice"
//                                   ? "radio"
//                                   : "checkbox"
//                               }
//                               className="mr-2"
//                               name={question.id}
//                               value={option.id}
//                               checked={
//                                 question.type === "Checkbox"
//                                   ? (responses[question.id] || []).includes(option.id.toString()) // Convert ID to string
//                                   : responses[question.id] === option.id.toString() // Convert for radio too
//                               }
//                               onChange={(e) =>
//                                 handleChange(
//                                   question.id,
//                                   e.target.value,
//                                   question.type
//                                 )
//                               }
//                             />

//                             <label className="text-gray-700">
//                               {option.text}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {question.type === "Decimal" && (
//                       <input
//                         type="number"
//                         step="0.01"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) =>
//                           handleChange(question._id, e.target.value)
//                         }
//                       />
//                     )}

//                     {question.type === "Number" && (
//                       <input
//                         type="number"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) =>
//                           handleChange(question._id, e.target.value)
//                         }
//                       />
//                     )}

//                     {question.type === "File" && (
//                       <input
//                         type="file"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                         onChange={(e) =>
//                           handleChange(question._id, e.target.files[0])
//                         }
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             );
//           })}

//           <button
//             type="submit"
//             className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-lg font-medium flex items-center justify-center gap-2 mb-8"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FormFill;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFormByLink, submitFormResponse } from "../api";

const FormFill = () => {
  const { link } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [patientData, setPatientData] = useState(null);
   useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://relearn-frontend.vercel.app") return; // security check
      setPatientData(event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  console.log("Getting From URL",patientData)
  console.log(responses)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormByLink(link);
        setForm(data);
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [link]);
  console.log(form);
  // When patientData changes, update responses
useEffect(() => {
  if (!patientData || !form) return;

  // Helper to find question _id by question text (case-insensitive)
  const findQuestionIdByText = (searchText) => {
    const lowerSearch = searchText.toLowerCase();
    for (const section of form.sections) {
      for (const question of section.questions) {
        if (question.text.toLowerCase().includes(lowerSearch)) {
          return question._id;
        }
      }
    }
    return null;
  };

  setResponses((prevResponses) => {
    const updatedResponses = { ...prevResponses };
    
    // Map basic patient data fields
    if (patientData.email) {
      const emailId = findQuestionIdByText("email");
      if (emailId) updatedResponses[emailId] = patientData.email;
    }
    
    if (patientData.phone) {
      const phoneId = findQuestionIdByText("phone");
      if (phoneId) updatedResponses[phoneId] = patientData.phone;
    }
    
    if (patientData.name) {
      const nameId = findQuestionIdByText("name");
      if (nameId) updatedResponses[nameId] = patientData.name;
    }
    
    if (patientData.age) {
      const ageId = findQuestionIdByText("age");
      if (ageId) updatedResponses[ageId] = patientData.age;
    }
    
    if (patientData.gender) {
      const genderId = findQuestionIdByText("gender");
      if (genderId) updatedResponses[genderId] = patientData.gender;
    }
    
    if (patientData.address) {
      const addressId = findQuestionIdByText("address");
      if (addressId) updatedResponses[addressId] = patientData.address;
    }
    
    // Map all other responses from allResponses field
    if (patientData.allResponses) {
      Object.entries(patientData.allResponses).forEach(([questionText, answer]) => {
        // Skip empty answers and already mapped fields
        if (!answer || 
            questionText.toLowerCase().includes("email") ||
            questionText.toLowerCase().includes("phone") ||
            questionText.toLowerCase().includes("name") ||
            questionText.toLowerCase().includes("age") ||
            questionText.toLowerCase().includes("gender") ||
            questionText.toLowerCase().includes("address") ||
            questionText.toLowerCase().includes("visit number") ||
            questionText.toLowerCase().includes("icon")) {
          return;
        }
        
        // Find the question ID for this question text
        const questionId = findQuestionIdByText(questionText);
        if (questionId) {
          updatedResponses[questionId] = answer;
        }
      });
    }
    
    console.log('Updated responses with patient data:', updatedResponses);
    return updatedResponses;
  });


  // const newResponses = { ...responses };

  // // Map patientData keys to questions
  // if (patientData.email) {
  //   const emailId = findQuestionIdByText("email");
  //   if (emailId) newResponses[emailId] = patientData.email;
  // }

  // if (patientData.phone) {
  //   const phoneId = findQuestionIdByText("phone");
  //   if (phoneId) newResponses[phoneId] = patientData.phone;
  // }

  // // Add more fields as needed, e.g. name, address, etc.

  // setResponses(newResponses);
}, [patientData, form]); // 

  const handleChange = (questionId, optionId, type, queId, value, text) => {
    console.log(questionId, optionId, type, queId, value, text);
    let queID = questionId;
    
    console.log("queID:", queID);
    setResponses((prevResponses) => {
      if (type === "Checkbox") {
        // Handle checkboxes as an array (multiple selections allowed)
        const selectedOptions = prevResponses[questionId] || []; // Get the existing selected options for the question

        // Toggle the selected option text for `questionId` (store actual text, not ID)
        const updatedSelections = selectedOptions.includes(text)
          ? selectedOptions.filter((option) => option !== text) // Remove option text if already selected
          : [...selectedOptions, text]; // Add option text if not selected

        return {
          ...prevResponses,
          [questionId]: updatedSelections, // Update selected options for questionId with actual text
        };
      } else if (type === "Multiple Choice") {
        // Handle single selection for radio buttons (store actual text, not ID)
        return {
          ...prevResponses,
          [questionId]: text, // Store selected option text for the multiple-choice question
        };
      }

      // For other question types (e.g., Short Answer, Long Answer, etc.), store as a single value
      return { ...prevResponses, [questionId]: value };
    });
  };

  console.log(responses)

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setLoading(true)
  //   console.log(responses);
  //   // MongoDB ObjectId regular expression (24 hexadecimal characters)
  //   const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  //   const missingRequiredFields = form.sections.flatMap((section) =>
  //     section.questions
  //       .filter((question) => question.isRequired && !responses[question._id])
  //       .map((question) => question._id)
  //   );

  //   console.log(missingRequiredFields);

  //   // If there are any missing fields, show alert
  //   if (missingRequiredFields.length > 0) {
  //     alert("Please fill in all required fields.");
  //     return; // Don't submit the form if there are missing required fields
  //   }

  //   const responseData = {
  //     formLink: link,
  //     responses: Object.keys(responses)
  //       .map((questionId) => {
  //         const question = form.sections
  //           .flatMap((section) => section.questions)
  //           .find((q) => q._id === questionId); // Find the question based on its _id

  //         // Check if the questionId matches the ObjectId format
  //         if (!objectIdRegex.test(questionId)) {
  //           return null; // Skip invalid questionIds (not a valid ObjectId)
  //         }

  //         if (question.type === "Multiple Choice Grid") {
  //           // For Multiple Choice Grid, format the response correctly
  //           return {
  //             questionId,
  //             questionText: question.text,
  //             answer: Object.keys(responses[questionId] || {}).reduce(
  //               (acc, rowId) => {
  //                 // Assuming responses[questionId] stores the selected option for each row
  //                 acc[rowId] = responses[questionId][rowId];
  //                 return acc;
  //               },
  //               {}
  //             ),
  //           };
  //         }

  //         const response = {
  //           questionId,
  //           questionText: question ? question.text : "Unknown Question", // Handle case if question is not found
  //           answer: responses[questionId],
  //         };

  //         console.log(response);
  //         return response;
  //       })
  //       .filter((response) => response !== null), // Remove null responses (invalid ObjectIds)
  //   };
  //   // Send the response data to the API
  //   await submitFormResponse(responseData);
  //   alert("Form submitted successfully!");
  //   setResponses({});
  // };


// console.log(allQuestions);


const arrangeResponses = (form, responses) => {
    const responseObj = {};

    form.forEach(question => {
        const questionId = question._id; // Question ID
        const response = responses[questionId]; // Find the response using the question ID
        
        if (response !== undefined) {
            // Add the response to the output object using questionId as the key
            responseObj[questionId] = response;
        }
    });

    return responseObj;
};



//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // MongoDB ObjectId regular expression (24 hexadecimal characters)
//     const objectIdRegex = /^[0-9a-fA-F]{24}$/;

//     const missingRequiredFields = form.sections.flatMap((section) =>
//       section.questions
//         .filter((question) => question.isRequired && !responses[question._id])
//         .map((question) => question._id)
//     );

//     // If there are any missing fields, show alert
//     if (missingRequiredFields.length > 0) {
//       alert("Please fill in all required fields.");
//       return; // Don't submit the form if there are missing required fields
//     }

    
// const allQuestions = form.sections.reduce((acc, section) => {
//     return acc.concat(section.questions);
// }, []);

// const arrangedResponses = arrangeResponses(allQuestions, responses);
// console.log(arrangedResponses);
//     try {
//       setLoading(true);
//       const responseData = {
//         formLink: link,
//         responses: Object.keys(arrangedResponses)
//           .map((questionId) => {
//             const question = form.sections
//               .flatMap((section) => section.questions)
//               .find((q) => q._id === questionId); // Find the question based on its _id

//             // Check if the questionId matches the ObjectId format
//             if (!objectIdRegex.test(questionId)) {
//               return null; // Skip invalid questionIds (not a valid ObjectId)
//             }

//             if (question.type === "Multiple Choice Grid") {
//               // For Multiple Choice Grid, format the response correctly
//               return {
//                 questionId,
//                 questionText: question.text,
//                 answer: Object.keys(responses[questionId] || {}).reduce(
//                   (acc, rowId) => {
//                     // Assuming responses[questionId] stores the selected option for each row
//                     acc[rowId] = responses[questionId][rowId];
//                     return acc;
//                   },
//                   {}
//                 ),
//               };
//             }

//             const response = {
//               questionId,
//               questionText: question ? question.text : "Unknown Question", // Handle case if question is not found
//               answer: responses[questionId],
//             };

//             return response;
//           })
//           .filter((response) => response !== null), // Remove null responses (invalid ObjectIds)
//       };

//       // Send the response data to the API
//       await submitFormResponse(responseData);
//       setFormSubmitted(true);
//       setResponses({});
//     } catch (error) {
//       alert("Error submitting form. Please try again.");
//       console.error("Error submitting form:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  const missingRequiredFields = form.sections.flatMap((section) =>
    section.questions
      .filter((question) => question.isRequired && !responses[question._id])
      .map((question) => question._id)
  );

  if (missingRequiredFields.length > 0) {
    alert("Please fill in all required fields.");
    return;
  }

  const allQuestions = form.sections.reduce(
    (acc, section) => acc.concat(section.questions),
    []
  );
  const arrangedResponses = arrangeResponses(allQuestions, responses);

  console.log(arrangedResponses);

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("formLink", link);

    const answers = [];

    for (const [questionId, answer] of Object.entries(arrangedResponses)) {
      const question = allQuestions.find((q) => q._id === questionId);
      if (!question || !objectIdRegex.test(questionId)) continue;

      // If it's a file question, append file directly
      if (question.type === "File") {
        formData.append(`file-${questionId}`, answer); // file input
        answers.push({
          questionId,
          questionText: question.text,
          answer: `file-${questionId}`, // backend should map this key to actual file
          type: "File",
        });
      } else if (question.type === "Multiple Choice Grid") {
        answers.push({
          questionId,
          questionText: question.text,
          answer,
          answerText:answer
        });
      } else {
        answers.push({
          questionId,
          questionText: question.text,
          answer,
        });
      }
    }

    console.log("Prepared Answers:", answers);

    // Append answers JSON separately
    formData.append("responses", JSON.stringify(answers));

    // Now call an updated API that accepts FormData
    await submitFormResponse(formData); // make sure this API supports multipart/form-data

    setFormSubmitted(true);
    setResponses({});
  } catch (error) {
    alert("Error submitting form. Please try again.");
    console.error("Error submitting form:", error);
  } finally {
    setLoading(false);
  }
};



  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading form...</p>
        </div>
      </div>
    );
  }

  // Function to check if a section should be visible
  const isSectionVisible = (section) => {
    if (!section.visibilityCondition) return true; // No condition → Always visible

    const { questionId, optionId } = section.visibilityCondition;
    const selectedOptions = responses[questionId] || []; // Get selected options (array for checkboxes)

    return selectedOptions.includes(optionId); // Section visible if the required option is selected
  };

  const handleGridChange = (questionId, rowId, selectedOptionId, rowText, optionText) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [rowText]: optionText, // Store row text as key and option text as value
      },
    }));
  };

  const handleFileChange = (questionId, file) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: file,
    }));
  }; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      {formSubmitted ? (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Form Submitted Successfully!</h2>
          <p className="text-lg text-gray-600 mb-8">Thank you for completing the form. Your response has been recorded.</p>
          {/* <button
            onClick={handleResetForm}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
          >
            Fill Another Response
          </button> */}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 sm:px-10 sm:py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
              {form?.title || "Loading form..."}
            </h1>
            <p className="text-blue-100 text-lg">
              {form?.description}
            </p>
            {patientData && (
              <div className="mt-4 px-4 py-2 bg-green-100 bg-opacity-20 border border-green-300 border-opacity-30 rounded-lg">
                <p className="text-green-100 text-sm">
                  ✓ Patient data has been pre-filled for {patientData.name || 'this patient'}
                </p>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {form?.sections.map((section, sectionIndex) => {
                if (!isSectionVisible(section)) return null;
                return (
                  <div
                    key={sectionIndex}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                      {section.title}
                    </h2>

                    {/* Display section image if exists */}
                    {section.image && (
                      <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <img
                          src={section.image.url || section.image}
                          alt="Section visual"
                          className="max-w-full h-auto max-h-80 rounded-lg shadow-sm mx-auto object-contain"
                          onError={(e) => {
                            console.log('Failed to load section image:', section.image);
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="space-y-8">
                      {section.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="transition-all duration-200 hover:bg-gray-50 p-4 rounded-lg -mx-4">
                          <label className="block text-gray-800 font-medium mb-3 text-lg flex items-center">
                            {question.text}
                            {question.isRequired && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>

                          {/* Display question image if exists */}
                          {question.image && (
                            <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                              <img
                                src={question.image.url || question.image}
                                alt="Question visual"
                                className="max-w-full h-auto max-h-60 rounded-lg shadow-sm mx-auto object-contain"
                                onError={(e) => {
                                  console.log('Failed to load question image:', question.image);
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}

                          {question.type === "Short Answer" && (
                            <input
                              // type="text"
                              type={(question.text.toLowerCase() === "email") ? "email" : "text"}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                              placeholder="Your answer"
                              value={responses[question._id] || ""}
                              onChange={(e) =>
                                handleChange(
                                  question._id,
                                  e.target.value,
                                  "Short Answer",
                                  question.type,
                                  e.target.value
                                )
                              }
                            />
                          )}

                          {question.type === "Long Answer" && (
                            <textarea
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                              rows="4"
                              placeholder="Your answer"
                              onChange={(e) =>
                                handleChange(
                                  question._id,
                                  e.target.value,
                                  "Long Answer",
                                  question.type,
                                  e.target.value
                                )
                              }
                            />
                          )}

                          {(question.type === "Multiple Choice" ||
                            question.type === "Checkbox") && (
                              <div className="space-y-3 mt-2">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors duration-150">
                                    <input
                                      type={
                                        question.type === "Multiple Choice"
                                          ? "radio"
                                          : "checkbox"
                                      }
                                      className={`${question.type === "Multiple Choice"
                                          ? "h-5 w-5 text-blue-600 border-gray-300"
                                          : "h-5 w-5 rounded text-blue-600 border-gray-300"
                                        } focus:ring-blue-500 cursor-pointer`}
                                      name={question.id}
                                      value={option.id}
                                      checked={
                                        question.type === "Checkbox"
                                          ? (responses[question._id] || []).includes(
                                            option.text // Check for option text instead of ID
                                          )
                                          : responses[question._id] ===
                                          option.text // Check for option text instead of ID
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          question._id,
                                          option._id,
                                          question.type,
                                          question.id,
                                          e.target.value,
                                          option.text
                                        )
                                      }
                                    />
                                    <label className="ml-3 text-gray-700 font-medium">
                                      {option.text}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}

                          {question.type === "File" && (
                            <div className="mt-2">
                              <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <div className="w-full sm:w-auto">
                                  <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg border border-blue-200 transition-colors duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Choose File
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                          handleFileChange(question._id, file);
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                                {responses[question._id] && (
                                  <span className="text-sm text-gray-600 py-2 px-3 bg-gray-100 rounded-lg truncate max-w-full">
                                    {responses[question._id].name}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {question.type === "Decimal" && (
                            <input
                              type="number"
                              step="0.01"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                              placeholder="0.00"
                              onChange={(e) =>
                                handleChange(
                                  question._id,
                                  e.target.value,
                                  "Decimal",
                                  question.type,
                                  e.target.value
                                )
                              }
                            />
                          )}

                          {question.type === "Number" && (
                            <input
                              type="number"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                              placeholder="0"
                              onChange={(e) =>
                                handleChange(
                                  question._id,
                                  e.target.value,
                                  "Number",
                                  question.type,
                                  e.target.value
                                )
                              }
                            />
                          )}

                          {question.type === "Multiple Choice Grid" && (
                            <div className="mt-3 overflow-x-auto -mx-4 sm:mx-0">
                              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                                <thead>
                                  <tr className="bg-gray-50">
                                    <th className="px-4 py-3 border-b border-r border-gray-200 text-gray-600 font-medium text-sm">
                                      {" "}
                                    </th>
                                    {question.gridOptions?.map((option) => (
                                      <th
                                        key={option.id}
                                        className="px-4 py-3 border-b border-r border-gray-200 text-gray-600 font-medium text-sm"
                                      >
                                        {option.text}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {question.gridRows?.map((row, rowIndex) => (
                                    <tr
                                      key={row.id}
                                      className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-blue-50 transition-colors duration-150`}
                                    >
                                      <td className="px-4 py-3 border-r border-gray-200 text-gray-700 font-medium text-sm">
                                        {row.text}
                                      </td>
                                      {question.gridOptions?.map((option) => (
                                        <td
                                          key={option.id}
                                          className="text-center px-4 py-3 border-r border-gray-200"
                                        >
                                          <div className="flex justify-center">
                                            <input
                                              type="radio"
                                              name={`grid-${question.id}-${row.id}`}
                                              value={option.id}
                                              checked={
                                                (responses[question._id]?.[row.text] ||
                                                  "") === option.text
                                              }
                                              onChange={() =>
                                                handleGridChange(
                                                  question._id,
                                                  row.id,
                                                  option.id.toString(),
                                                  row.text, // Pass row text
                                                  option.text // Pass option text
                                                )
                                              }
                                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                          </div>
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-3 px-8 rounded-full text-lg font-medium text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-200 
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500"}`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Submit Form"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} • All responses will be recorded
      </div>
    </div>
  </div>
  );
};

export default FormFill;
