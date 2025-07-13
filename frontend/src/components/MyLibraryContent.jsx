// // // // // import React from 'react'

// // // // // const MyLibraryContent = () => {
// // // // //   return (
// // // // //     <div>
// // // // //       Working
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default MyLibraryContent

// // // // import React, { useState } from "react";

// // // // // Main Library Section Component
// // // // const LibrarySection = () => {
// // // //   const [forms, setForms] = useState([]); // Stores all the forms
// // // //   const [currentFormIndex, setCurrentFormIndex] = useState(null); // Tracks the current form being viewed
// // // //   const [formQuestions, setFormQuestions] = useState([]); // Stores the questions for the current form
// // // //   const [formTitle, setFormTitle] = useState(""); // Title of the form
// // // //   const [isCreatingForm, setIsCreatingForm] = useState(false); // Toggle form creation

// // // //   const addForm = () => {
// // // //     setForms([...forms, { title: formTitle || `Form ${forms.length + 1}`, questions: [] }]);
// // // //     setFormTitle("");
// // // //     setIsCreatingForm(false);
// // // //   };

// // // //   const addQuestion = (type = "Short Answer") => {
// // // //     setFormQuestions([
// // // //       ...formQuestions,
// // // //       { question: "", type, options: [], gridRows: [], gridColumns: [] },
// // // //     ]);
// // // //   };

// // // //   const updateQuestion = (index, field, value) => {
// // // //     const updatedQuestions = [...formQuestions];
// // // //     updatedQuestions[index][field] = value;
// // // //     setFormQuestions(updatedQuestions);
// // // //   };

// // // //   const saveForm = () => {
// // // //     const updatedForms = [...forms];
// // // //     updatedForms[currentFormIndex].questions = formQuestions;
// // // //     setForms(updatedForms);
// // // //     setIsCreatingForm(false);
// // // //   };

// // // //   const viewForm = (index) => {
// // // //     setCurrentFormIndex(index);
// // // //     setFormQuestions(forms[index].questions);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-100 p-8">
// // // //       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
// // // //         <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

// // // //         {isCreatingForm ? (
// // // //           <div>
// // // //             <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Enter form title" className="w-full p-2 mb-4 border rounded" />
// // // //             <button onClick={() => addForm()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Create Form</button>

// // // //             <button onClick={() => addQuestion()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Add Question</button>
// // // //             <button onClick={() => addQuestion("Multiple Choice Grid")} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Add Multiple Choice Grid</button>

// // // //             {formQuestions.map((question, index) => (
// // // //               <div key={index} className="mb-4 p-4 border rounded">
// // // //                 <input type="text" placeholder="Enter question" value={question.question} onChange={(e) => updateQuestion(index, "question", e.target.value)} className="w-full p-2 mb-2 border rounded" />

// // // //                 {question.type === "Multiple Choice Grid" ? (
// // // //                   <div>
// // // //                     <h4 className="font-semibold">Grid Rows:</h4>
// // // //                     {question.gridRows?.map((row, rIndex) => (
// // // //                       <input key={rIndex} type="text" placeholder="Row Label" value={row.text} onChange={(e) => { question.gridRows[rIndex].text = e.target.value; updateQuestion(index, "gridRows", question.gridRows); }} className="w-full p-2 mb-2 border rounded" />
// // // //                     ))}
// // // //                     <button onClick={() => { question.gridRows.push({ text: "" }); updateQuestion(index, "gridRows", question.gridRows); }} className="text-blue-500">+ Add Row</button>

// // // //                     <h4 className="font-semibold mt-4">Grid Columns:</h4>
// // // //                     {question.gridColumns?.map((col, cIndex) => (
// // // //                       <input key={cIndex} type="text" placeholder="Column Label" value={col.text} onChange={(e) => { question.gridColumns[cIndex].text = e.target.value; updateQuestion(index, "gridColumns", question.gridColumns); }} className="w-full p-2 mb-2 border rounded" />
// // // //                     ))}
// // // //                     <button onClick={() => { question.gridColumns.push({ text: "" }); updateQuestion(index, "gridColumns", question.gridColumns); }} className="text-blue-500">+ Add Column</button>
// // // //                   </div>
// // // //                 ) : null}
// // // //               </div>
// // // //             ))}

// // // //             <button onClick={saveForm} className="bg-green-600 text-white px-4 py-2 rounded">Save Form</button>
// // // //           </div>
// // // //         ) : (
// // // //           <div>
// // // //             <button onClick={() => setIsCreatingForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Create New Form</button>
// // // //             <h2 className="text-xl font-semibold">Existing Forms</h2>
// // // //             <ul>
// // // //               {forms.map((form, index) => (
// // // //                 <li key={index} className="mb-2">
// // // //                   <button onClick={() => viewForm(index)} className="text-blue-600 hover:underline">{form.title}</button>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>

// // // //             {currentFormIndex !== null && (
// // // //               <div>
// // // //                 <h2 className="text-xl font-bold mb-4">Form Preview</h2>
// // // //                 {forms[currentFormIndex].questions.map((question, index) => (
// // // //                   <div key={index} className="mb-4">
// // // //                     <p className="font-semibold">{question.question}</p>
// // // //                     {question.type === "Multiple Choice Grid" && (
// // // //                       <table className="w-full border">
// // // //                         <thead>
// // // //                           <tr>
// // // //                             <th></th>
// // // //                             {question.gridColumns?.map((col, cIndex) => (
// // // //                               <th key={cIndex} className="border p-2">{col.text}</th>
// // // //                             ))}
// // // //                           </tr>
// // // //                         </thead>
// // // //                         <tbody>
// // // //                           {question.gridRows?.map((row, rIndex) => (
// // // //                             <tr key={rIndex}>
// // // //                               <td className="border p-2">{row.text}</td>
// // // //                               {question.gridColumns?.map((_, cIndex) => (
// // // //                                 <td key={cIndex} className="border p-2"><input type="radio" name={`grid-${index}-${rIndex}`} /></td>
// // // //                               ))}
// // // //                             </tr>
// // // //                           ))}
// // // //                         </tbody>
// // // //                       </table>
// // // //                     )}
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default LibrarySection;

// // // import React, { useState } from "react";

// // // // Main Library Section Component
// // // const LibrarySection = () => {
// // //   const [forms, setForms] = useState([]); // Stores all the forms
// // //   const [currentFormIndex, setCurrentFormIndex] = useState(null); // Tracks the current form being viewed
// // //   const [formQuestions, setFormQuestions] = useState([]); // Stores the questions for the current form
// // //   const [formTitle, setFormTitle] = useState(""); // Title of the form
// // //   const [isCreatingForm, setIsCreatingForm] = useState(false); // Toggle form creation

// // //   const addForm = () => {
// // //     setForms([...forms, { title: formTitle || `Form ${forms.length + 1}`, questions: [] }]);
// // //     setFormTitle("");
// // //     setIsCreatingForm(false);
// // //   };

// // //   const addQuestion = () => {
// // //     setFormQuestions([
// // //       ...formQuestions,
// // //       { question: "", type: "Short Answer", options: [], gridRows: [], gridColumns: [] },
// // //     ]);
// // //   };

// // //   const updateQuestion = (index, field, value) => {
// // //     const updatedQuestions = [...formQuestions];
// // //     updatedQuestions[index][field] = value;
// // //     setFormQuestions(updatedQuestions);
// // //   };

// // //   const saveForm = () => {
// // //     const updatedForms = [...forms];
// // //     updatedForms[currentFormIndex].questions = formQuestions;
// // //     setForms(updatedForms);
// // //     setIsCreatingForm(false);
// // //   };

// // //   const viewForm = (index) => {
// // //     setCurrentFormIndex(index);
// // //     setFormQuestions(forms[index].questions);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 p-8">
// // //       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
// // //         <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

// // //         {isCreatingForm ? (
// // //           <div>
// // //             <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Enter form title" className="w-full p-2 mb-4 border rounded" />
// // //             <button onClick={() => addForm()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Create Form</button>

// // //             <button onClick={addQuestion} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Add Question</button>

// // //             {formQuestions.map((question, index) => (
// // //               <div key={index} className="mb-4 p-4 border rounded">
// // //                 <input type="text" placeholder="Enter question" value={question.question} onChange={(e) => updateQuestion(index, "question", e.target.value)} className="w-full p-2 mb-2 border rounded" />

// // //                 <select value={question.type} onChange={(e) => updateQuestion(index, "type", e.target.value)} className="w-full p-2 mb-2 border rounded">
// // //                   <option>Short Answer</option>
// // //                   <option>Long Answer</option>
// // //                   <option>Multiple Choice</option>
// // //                   <option>Checkbox</option>
// // //                   <option>Decimal</option>
// // //                   <option>Number</option>
// // //                   <option>File</option>
// // //                   <option>Multiple Choice Grid</option>
// // //                 </select>

// // //                 {question.type === "Multiple Choice Grid" && <div>Multiple Choice Grid settings here...</div>}
// // //               </div>
// // //             ))}

// // //             <button onClick={saveForm} className="bg-green-600 text-white px-4 py-2 rounded">Save Form</button>
// // //           </div>
// // //         ) : (
// // //           <div>
// // //             <button onClick={() => setIsCreatingForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Create New Form</button>
// // //             <h2 className="text-xl font-semibold">Existing Forms</h2>
// // //             <ul>
// // //               {forms.map((form, index) => (
// // //                 <li key={index} className="mb-2">
// // //                   <button onClick={() => viewForm(index)} className="text-blue-600 hover:underline">{form.title}</button>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LibrarySection;

// // import React, { useState } from "react";

// // // Main Library Section Component
// // const LibrarySection = () => {
// //   const [forms, setForms] = useState([]); // Stores all the forms
// //   const [currentFormIndex, setCurrentFormIndex] = useState(null);
// //   const [formQuestions, setFormQuestions] = useState([]);
// //   const [formTitle, setFormTitle] = useState("");
// //   const [isCreatingForm, setIsCreatingForm] = useState(false);

// //   const addForm = () => {
// //     setForms([...forms, { title: formTitle || `Form ${forms.length + 1}`, questions: [] }]);
// //     setFormTitle("");
// //     setIsCreatingForm(false);
// //   };

// //   const addQuestion = () => {
// //     setFormQuestions([
// //       ...formQuestions,
// //       { question: "", type: "Short Answer", options: [], gridRows: [], gridColumns: [] },
// //     ]);
// //   };

// //   const updateQuestion = (index, field, value) => {
// //     const updatedQuestions = [...formQuestions];
// //     updatedQuestions[index][field] = value;
// //     setFormQuestions(updatedQuestions);
// //   };

// //   const saveForm = () => {
// //     const updatedForms = [...forms];
// //     updatedForms[currentFormIndex].questions = formQuestions;
// //     setForms(updatedForms);
// //     setIsCreatingForm(false);
// //   };

// //   const viewForm = (index) => {
// //     setCurrentFormIndex(index);
// //     setFormQuestions(forms[index].questions);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-8">
// //       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
// //         <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

// //         {isCreatingForm ? (
// //           <div>
// //             <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Enter form title" className="w-full p-2 mb-4 border rounded" />
// //             <button onClick={() => addForm()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Create Form</button>

// //             <button onClick={addQuestion} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Add Question</button>

// //             {formQuestions.map((question, index) => (
// //               <div key={index} className="mb-4 p-4 border rounded">
// //                 <input type="text" placeholder="Enter question" value={question.question} onChange={(e) => updateQuestion(index, "question", e.target.value)} className="w-full p-2 mb-2 border rounded" />

// //                 <select value={question.type} onChange={(e) => updateQuestion(index, "type", e.target.value)} className="w-full p-2 mb-2 border rounded">
// //                   <option>Short Answer</option>
// //                   <option>Long Answer</option>
// //                   <option>Multiple Choice</option>
// //                   <option>Checkbox</option>
// //                   <option>Decimal</option>
// //                   <option>Number</option>
// //                   <option>File</option>
// //                   <option>Multiple Choice Grid</option>
// //                 </select>

// //                 {/* Multiple Choice and Checkbox Settings */}
// //                 {["Multiple Choice", "Checkbox"].includes(question.type) && (
// //                   <div className="mt-4">
// //                     {question.options.map((opt, optIndex) => (
// //                       <div key={optIndex} className="flex gap-2 mb-2">
// //                         <input
// //                           type="text"
// //                           placeholder="Option text"
// //                           value={opt.text}
// //                           onChange={(e) => {
// //                             const updatedOptions = [...question.options];
// //                             updatedOptions[optIndex].text = e.target.value;
// //                             updateQuestion(index, "options", updatedOptions);
// //                           }}
// //                           className="flex-1 p-2 border rounded"
// //                         />
// //                         <button onClick={() => {
// //                           const updatedOptions = question.options.filter((_, i) => i !== optIndex);
// //                           updateQuestion(index, "options", updatedOptions);
// //                         }} className="text-red-500">Remove</button>
// //                       </div>
// //                     ))}
// //                     <button onClick={() => {
// //                       const updatedOptions = [...question.options, { text: "" }];
// //                       updateQuestion(index, "options", updatedOptions);
// //                     }} className="text-blue-500">+ Add Option</button>
// //                   </div>
// //                 )}

// //                 {/* Multiple Choice Grid Settings */}
// //                 {question.type === "Multiple Choice Grid" && (
// //                  <>
// //                   <div className="mt-4">
// //                     <h4 className="font-semibold mb-2">Grid Rows:</h4>
// //                     {question.gridRows.map((row, rowIndex) => (
// //                       <div key={rowIndex} className="mb-2 flex gap-2">
// //                         <input
// //                           type="text"
// //                           placeholder="Row Label"
// //                           value={row.text}
// //                           onChange={(e) => {
// //                             const updatedRows = [...question.gridRows];
// //                             updatedRows[rowIndex].text = e.target.value;
// //                             updateQuestion(index, "gridRows", updatedRows);
// //                           }}
// //                           className="flex-1 p-2 border rounded"
// //                         />
// //                         <button onClick={() => {
// //                           const updatedRows = question.gridRows.filter((_, i) => i !== rowIndex);
// //                           updateQuestion(index, "gridRows", updatedRows);
// //                         }} className="text-red-500">Remove</button>
// //                       </div>
// //                     ))}
// //                     <button onClick={() => {
// //                       const updatedRows = [...question.gridRows, { text: "" }];
// //                       updateQuestion(index, "gridRows", updatedRows);
// //                     }} className="text-blue-500">+ Add Row</button>
// //                   </div>
// //                   <div className="mt-4">
// //                   <h4 className="font-semibold mb-2">Grid Columns:</h4>
// //                   {question.gridColumns.map((col, colIndex) => (
// //                     <div key={colIndex} className="flex gap-2 mb-2">
// //                       <input
// //                         type="text"
// //                         placeholder="Column Label"
// //                         value={col.text}
// //                         onChange={(e) => {
// //                           const updatedCols = [...question.gridColumns];
// //                           updatedCols[colIndex].text = e.target.value;
// //                           updateQuestion(index, "gridColumns", updatedCols);
// //                         }}
// //                         className="flex-1 p-2 border rounded"
// //                       />
// //                       <button onClick={() => {
// //                         const updatedCols = question.gridColumns.filter((_, i) => i !== colIndex);
// //                         updateQuestion(index, "gridColumns", updatedCols);
// //                       }} className="text-red-500">Remove</button>
// //                     </div>
// //                   ))}
// //                   <button onClick={() => {
// //                     const updatedCols = [...question.gridColumns, { text: "" }];
// //                     updateQuestion(index, "gridColumns", updatedCols);
// //                   }} className="text-blue-500">+ Add Column</button>
// //                 </div>
// //                 </>
// //                 )}
// //               </div>
// //             ))}

// //             <button onClick={saveForm} className="bg-green-600 text-white px-4 py-2 rounded">Save Form</button>
// //           </div>
// //         ) : (
// //           <div>
// //             <button onClick={() => setIsCreatingForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Create New Form</button>
// //             <h2 className="text-xl font-semibold">Existing Forms</h2>
// //             <ul>
// //               {forms.map((form, index) => (
// //                 <li key={index} className="mb-2">
// //                   <button onClick={() => viewForm(index)} className="text-blue-600 hover:underline">{form.title}</button>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LibrarySection;

// // import React, { useState } from "react";

// // Main Library Section Component
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllLibraryForms, updateLibraryForm } from "../api.js"; // Assuming updateLibraryForm is defined
// import { Eye } from "lucide-react";

// const LibraryUI = () => {
//   const [forms, setForms] = useState([]); // Stores all the forms
//   const [currentFormIndex, setCurrentFormIndex] = useState(null); // Tracks the current form being viewed
//   const [formQuestions, setFormQuestions] = useState([]); // Stores the questions for the current form
//   const [editingForm, setEditingForm] = useState(null); // Tracks the form being edited
//   const [updatedFormData, setUpdatedFormData] = useState(null); // Stores the updated form data
//   const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation

//   useEffect(() => {
//     // Fetch forms when the component is mounted
//     const fetchForms = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
//         const fetchedForms = await getAllLibraryForms(token); // Get all forms from the API
//         setForms(fetchedForms || []); // If no forms are returned, fallback to an empty array
//       } catch (error) {
//         console.error("Error fetching forms:", error);
//       }
//     };

//     fetchForms();
//   }, []);

//   const viewForm = (index) => {
//     // setCurrentFormIndex(index);
//     // setEditingForm(null); // Reset editing when switching views
//     // setUpdatedFormData(null);

//     navigate(`/preview-library-form/${index._id}`);
//   };

//   const handleEdit = (form) => {
//     // setEditingForm(form);
//     // setUpdatedFormData({
//     //   title: form.title,
//     //   sections: form.sections,
//     // });
//     navigate("/library-form", { state: { form } });
//   };

//   const handleSectionChange = (sectionIndex, updatedSection) => {
//     const updatedSections = [...updatedFormData.sections];
//     updatedSections[sectionIndex] = updatedSection;
//     setUpdatedFormData({ ...updatedFormData, sections: updatedSections });
//   };

//   const handleSaveChanges = async () => {
//     try {
//       // const token = localStorage.getItem("token");
//       await updateLibraryForm(editingForm._id, updatedFormData); // Assuming this function exists
//       // After saving, update the forms state and reset editing state
//       const updatedForms = forms.map((form) =>
//         form.id === editingForm.id ? { ...form, ...updatedFormData } : form
//       );
//       setForms(updatedForms);
//       setEditingForm(null);
//       setUpdatedFormData(null);
//     } catch (error) {
//       console.error("Error saving form:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen p-8">
//       <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">My Library</h1>

//         <div className="mt-4">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="py-2 px-4">Type</th>
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Items</th>
//                 <th className="py-2 px-4">Owner</th>
//                 <th className="py-2 px-4">Last Modified</th>
//                 <th className="py-2 px-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {forms.length > 0 ? (
//                 forms.map((form, index) => (
//                   <tr key={index} className="border-t">
//                     <td className="py-2 px-4">📄</td>
//                     <td
//                       className="py-2 px-4 text-blue-600  cursor-pointer"
//                       // onClick={() => viewForm(form)}
//                     >
//                       {form.title}
//                     </td>
//                     <td className="py-2 px-4 ">{form.sections.length}</td>
//                     <td className="py-2 px-4">{form.owner || "me"}</td>
//                     <td className="py-2 px-4"><button className="cursor-pointer" onClick={() => viewForm(form)}> <Eye className="h-5 w-5"/></button></td>
//                     <td className="py-2 px-4">
//                       <button
//                         className="text-blue-500 hover:underline"
//                         onClick={() => handleEdit(form)}
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="py-4 text-center">
//                     No forms available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {currentFormIndex !== null && !editingForm && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold mb-4">Form Preview: {forms[currentFormIndex].title}</h2>
//               {forms[currentFormIndex].sections.map((section, secIndex) => (
//                 <div key={secIndex} className="mb-6 border rounded-lg px-2">
//                   <h3 className="text-lg font-semibold mb-2">{section.title || "Untitled Section"}</h3>
//                   {section.questions.map((question, qIndex) => (
//                     <div key={qIndex} className="mb-2">
//                       <p className="font-semibold">{question.text}</p>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           )}

//           {editingForm && updatedFormData && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold mb-4">Edit Form: {editingForm.title}</h2>

//               {/* Edit Form Title */}
//               <div className="mb-4">
//                 <label className="block font-semibold">Form Title</label>
//                 <input
//                   type="text"
//                   value={updatedFormData.title}
//                   onChange={(e) =>
//                     setUpdatedFormData({ ...updatedFormData, title: e.target.value })
//                   }
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               {/* Edit Sections */}
//               {updatedFormData.sections.map((section, secIndex) => (
//                 <div key={secIndex} className="mb-4 border rounded-lg px-2">
//                   <h3 className="text-lg font-semibold mb-2">Section: {section.title || "Untitled"}</h3>
//                   <textarea
//                     value={section.title}
//                     onChange={(e) => {
//                       const updatedSection = { ...section, title: e.target.value };
//                       handleSectionChange(secIndex, updatedSection);
//                     }}
//                     className="w-full p-2 mb-2 border rounded"
//                   />
//                   {section.questions.map((question, qIndex) => (
//                     <div key={qIndex} className="mb-2">
//                       <textarea
//                         value={question.text}
//                         onChange={(e) => {
//                           const updatedQuestions = [...section.questions];
//                           updatedQuestions[qIndex] = { ...question, text: e.target.value };
//                           handleSectionChange(secIndex, { ...section, questions: updatedQuestions });
//                         }}
//                         className="w-full p-2 border rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ))}

//               <button
//                 onClick={handleSaveChanges}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LibraryUI;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLibraryForms,
  updateLibraryForm,
  updateFormVisibility,
} from "../api.js"; // Assuming updateLibraryForm is defined
import { Eye } from "lucide-react";
import parseJwt from "../utils/parseJwt.js";

const LibraryUI = () => {
  const [forms, setForms] = useState([]); // Stores all the forms
  const [currentFormIndex, setCurrentFormIndex] = useState(null); // Tracks the current form being viewed
  const [formQuestions, setFormQuestions] = useState([]); // Stores the questions for the current form
  const [editingForm, setEditingForm] = useState(null); // Tracks the form being edited
  const [updatedFormData, setUpdatedFormData] = useState(null); // Stores the updated form data
  const [modalOpen, setModalOpen] = useState(false); // Controls the visibility of the modal
  const [selectedAction, setSelectedAction] = useState(""); // Stores the selected action (edit or share)
  const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation
  const [users, setUsers] = useState([]); // Store users for sharing
  const [selectedUsers, setSelectedUsers] = useState([]); // Track selected users for sharing
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    // Fetch forms when the component is mounted
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const fetchedForms = await getAllLibraryForms(token); // Get all forms from the API
        setForms(fetchedForms || []); // If no forms are returned, fallback to an empty array
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const viewForm = (index) => {
    navigate(`/preview-library-form/${index._id}`);
  };

  const handleEdit = (form) => {
    setEditingForm(form);
    setUpdatedFormData({ ...form }); // Store the form data to be edited
    setModalOpen(true); // Open the modal when edit button is clicked
  };

  const handleAction = (action) => {
    setSelectedAction(action);
    setModalOpen(false); // Close the modal
    if (action === "edit") {
      // Navigate to the form edit page
      navigate("/library-form", { state: { form: editingForm } });
    } else if (action === "share") {
      // Implement share form logic here if needed
      console.log("Share form logic for", editingForm);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = parseJwt(token).userId;

        console.log(userId);

        const response = await fetch("https://relearn-backend.vercel.app/api/users");
        const usersData = await response.json();
        const filteredUsers = usersData.filter((user) => user._id !== userId);
        const userMap = {};
        usersData.forEach((user) => {
          userMap[user._id] = user.name;
        });
        console.log(filteredUsers);
        setUserMap(userMap);
        setUsers(filteredUsers); // Populate users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSaveChanges = async () => {
    try {
      await updateLibraryForm(editingForm._id, updatedFormData); // Assuming this function exists
      const updatedForms = forms.map((form) =>
        form._id === editingForm._id ? { ...form, ...updatedFormData } : form
      );
      setForms(updatedForms);
      setEditingForm(null);
      setUpdatedFormData(null);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">My Library</h1>

        <div className="mt-4">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Owner</th>
                <th className="py-2 px-4">Last Modified</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.length > 0 ? (
                forms.map((form, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">📄</td>
                    <td
                      className="py-2 px-4 text-blue-600 cursor-pointer"
                      onClick={() => viewForm(form)}
                    >
                      {form.title}
                    </td>
                    <td className="py-2 px-4 ">{form.sections.length}</td>
                    {console.log(form)}
                    <td className="py-2 px-4">
                      {/* {form.userId || "me"} */}
                      {form.userId ===
                      parseJwt(localStorage.getItem("token")).userId
                        ? "Me"
                        : userMap[form.userId] || form.userId}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="cursor-pointer"
                        onClick={() => viewForm(form)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleEdit(form)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center">
                    No forms available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modal for Edit/Share Options */}
          {modalOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-64">
                <h2 className="text-xl font-semibold mb-4">
                  What would you like to do?
                </h2>
                <button
                  className="w-full py-2 mb-2 bg-blue-500 text-white rounded-lg"
                  onClick={() => handleAction("edit")}
                >
                  Edit Form
                </button>
                <button
                  className="w-full py-2 bg-yellow-500 text-white rounded-lg"
                  onClick={() => handleAction("share")}
                >
                  Share Form
                </button>
              </div>
            </div>
          )}
          {selectedAction === "share" && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-64">
                <h2 className="text-xl font-semibold mb-4">Share Form</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Select Users
                  </label>
                  <select
                    multiple
                    value={selectedUsers}
                    onChange={(e) =>
                      setSelectedUsers(
                        [...e.target.selectedOptions].map(
                          (option) => option.value
                        )
                      )
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded"
                  >
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="w-full py-2 bg-blue-500 text-white rounded-lg"
                  onClick={async () => {
                    // Update form visibility and shared users
                    await updateFormVisibility(
                      editingForm._id,
                      "shared",
                      selectedUsers,
                      localStorage.getItem("token")
                    );
                    setModalOpen(false);
                    setSelectedAction("");
                  }}
                >
                  Share Form
                </button>
              </div>
            </div>
          )}

          {/* Edit Form Content (Only appears after selecting Edit) */}
        </div>
      </div>
    </div>
  );
};

export default LibraryUI;
