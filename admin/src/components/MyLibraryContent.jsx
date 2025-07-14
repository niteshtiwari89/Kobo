// // // // import React from 'react'

// // // // const MyLibraryContent = () => {
// // // //   return (
// // // //     <div>
// // // //       Working
// // // //     </div>
// // // //   )
// // // // }

// // // // export default MyLibraryContent


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

// // //   const addQuestion = (type = "Short Answer") => {
// // //     setFormQuestions([
// // //       ...formQuestions,
// // //       { question: "", type, options: [], gridRows: [], gridColumns: [] },
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

// // //             <button onClick={() => addQuestion()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Add Question</button>
// // //             <button onClick={() => addQuestion("Multiple Choice Grid")} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Add Multiple Choice Grid</button>

// // //             {formQuestions.map((question, index) => (
// // //               <div key={index} className="mb-4 p-4 border rounded">
// // //                 <input type="text" placeholder="Enter question" value={question.question} onChange={(e) => updateQuestion(index, "question", e.target.value)} className="w-full p-2 mb-2 border rounded" />

// // //                 {question.type === "Multiple Choice Grid" ? (
// // //                   <div>
// // //                     <h4 className="font-semibold">Grid Rows:</h4>
// // //                     {question.gridRows?.map((row, rIndex) => (
// // //                       <input key={rIndex} type="text" placeholder="Row Label" value={row.text} onChange={(e) => { question.gridRows[rIndex].text = e.target.value; updateQuestion(index, "gridRows", question.gridRows); }} className="w-full p-2 mb-2 border rounded" />
// // //                     ))}
// // //                     <button onClick={() => { question.gridRows.push({ text: "" }); updateQuestion(index, "gridRows", question.gridRows); }} className="text-blue-500">+ Add Row</button>

// // //                     <h4 className="font-semibold mt-4">Grid Columns:</h4>
// // //                     {question.gridColumns?.map((col, cIndex) => (
// // //                       <input key={cIndex} type="text" placeholder="Column Label" value={col.text} onChange={(e) => { question.gridColumns[cIndex].text = e.target.value; updateQuestion(index, "gridColumns", question.gridColumns); }} className="w-full p-2 mb-2 border rounded" />
// // //                     ))}
// // //                     <button onClick={() => { question.gridColumns.push({ text: "" }); updateQuestion(index, "gridColumns", question.gridColumns); }} className="text-blue-500">+ Add Column</button>
// // //                   </div>
// // //                 ) : null}
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

// // //             {currentFormIndex !== null && (
// // //               <div>
// // //                 <h2 className="text-xl font-bold mb-4">Form Preview</h2>
// // //                 {forms[currentFormIndex].questions.map((question, index) => (
// // //                   <div key={index} className="mb-4">
// // //                     <p className="font-semibold">{question.question}</p>
// // //                     {question.type === "Multiple Choice Grid" && (
// // //                       <table className="w-full border">
// // //                         <thead>
// // //                           <tr>
// // //                             <th></th>
// // //                             {question.gridColumns?.map((col, cIndex) => (
// // //                               <th key={cIndex} className="border p-2">{col.text}</th>
// // //                             ))}
// // //                           </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                           {question.gridRows?.map((row, rIndex) => (
// // //                             <tr key={rIndex}>
// // //                               <td className="border p-2">{row.text}</td>
// // //                               {question.gridColumns?.map((_, cIndex) => (
// // //                                 <td key={cIndex} className="border p-2"><input type="radio" name={`grid-${index}-${rIndex}`} /></td>
// // //                               ))}
// // //                             </tr>
// // //                           ))}
// // //                         </tbody>
// // //                       </table>
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
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
// //   const [currentFormIndex, setCurrentFormIndex] = useState(null); // Tracks the current form being viewed
// //   const [formQuestions, setFormQuestions] = useState([]); // Stores the questions for the current form
// //   const [formTitle, setFormTitle] = useState(""); // Title of the form
// //   const [isCreatingForm, setIsCreatingForm] = useState(false); // Toggle form creation

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

// //                 {question.type === "Multiple Choice Grid" && <div>Multiple Choice Grid settings here...</div>}
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


// import React, { useState } from "react";

// // Main Library Section Component
// const LibrarySection = () => {
//   const [forms, setForms] = useState([]); // Stores all the forms
//   const [currentFormIndex, setCurrentFormIndex] = useState(null);
//   const [formQuestions, setFormQuestions] = useState([]);
//   const [formTitle, setFormTitle] = useState("");
//   const [isCreatingForm, setIsCreatingForm] = useState(false);

//   const addForm = () => {
//     setForms([...forms, { title: formTitle || `Form ${forms.length + 1}`, questions: [] }]);
//     setFormTitle("");
//     setIsCreatingForm(false);
//   };

//   const addQuestion = () => {
//     setFormQuestions([
//       ...formQuestions,
//       { question: "", type: "Short Answer", options: [], gridRows: [], gridColumns: [] },
//     ]);
//   };

//   const updateQuestion = (index, field, value) => {
//     const updatedQuestions = [...formQuestions];
//     updatedQuestions[index][field] = value;
//     setFormQuestions(updatedQuestions);
//   };

//   const saveForm = () => {
//     const updatedForms = [...forms];
//     updatedForms[currentFormIndex].questions = formQuestions;
//     setForms(updatedForms);
//     setIsCreatingForm(false);
//   };

//   const viewForm = (index) => {
//     setCurrentFormIndex(index);
//     setFormQuestions(forms[index].questions);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

//         {isCreatingForm ? (
//           <div>
//             <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Enter form title" className="w-full p-2 mb-4 border rounded" />
//             <button onClick={() => addForm()} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Create Form</button>

//             <button onClick={addQuestion} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Add Question</button>

//             {formQuestions.map((question, index) => (
//               <div key={index} className="mb-4 p-4 border rounded">
//                 <input type="text" placeholder="Enter question" value={question.question} onChange={(e) => updateQuestion(index, "question", e.target.value)} className="w-full p-2 mb-2 border rounded" />

//                 <select value={question.type} onChange={(e) => updateQuestion(index, "type", e.target.value)} className="w-full p-2 mb-2 border rounded">
//                   <option>Short Answer</option>
//                   <option>Long Answer</option>
//                   <option>Multiple Choice</option>
//                   <option>Checkbox</option>
//                   <option>Decimal</option>
//                   <option>Number</option>
//                   <option>File</option>
//                   <option>Multiple Choice Grid</option>
//                 </select>

//                 {/* Multiple Choice and Checkbox Settings */}
//                 {["Multiple Choice", "Checkbox"].includes(question.type) && (
//                   <div className="mt-4">
//                     {question.options.map((opt, optIndex) => (
//                       <div key={optIndex} className="flex gap-2 mb-2">
//                         <input
//                           type="text"
//                           placeholder="Option text"
//                           value={opt.text}
//                           onChange={(e) => {
//                             const updatedOptions = [...question.options];
//                             updatedOptions[optIndex].text = e.target.value;
//                             updateQuestion(index, "options", updatedOptions);
//                           }}
//                           className="flex-1 p-2 border rounded"
//                         />
//                         <button onClick={() => {
//                           const updatedOptions = question.options.filter((_, i) => i !== optIndex);
//                           updateQuestion(index, "options", updatedOptions);
//                         }} className="text-red-500">Remove</button>
//                       </div>
//                     ))}
//                     <button onClick={() => {
//                       const updatedOptions = [...question.options, { text: "" }];
//                       updateQuestion(index, "options", updatedOptions);
//                     }} className="text-blue-500">+ Add Option</button>
//                   </div>
//                 )}

//                 {/* Multiple Choice Grid Settings */}
//                 {question.type === "Multiple Choice Grid" && (
//                  <>
//                   <div className="mt-4">
//                     <h4 className="font-semibold mb-2">Grid Rows:</h4>
//                     {question.gridRows.map((row, rowIndex) => (
//                       <div key={rowIndex} className="mb-2 flex gap-2">
//                         <input
//                           type="text"
//                           placeholder="Row Label"
//                           value={row.text}
//                           onChange={(e) => {
//                             const updatedRows = [...question.gridRows];
//                             updatedRows[rowIndex].text = e.target.value;
//                             updateQuestion(index, "gridRows", updatedRows);
//                           }}
//                           className="flex-1 p-2 border rounded"
//                         />
//                         <button onClick={() => {
//                           const updatedRows = question.gridRows.filter((_, i) => i !== rowIndex);
//                           updateQuestion(index, "gridRows", updatedRows);
//                         }} className="text-red-500">Remove</button>
//                       </div>
//                     ))}
//                     <button onClick={() => {
//                       const updatedRows = [...question.gridRows, { text: "" }];
//                       updateQuestion(index, "gridRows", updatedRows);
//                     }} className="text-blue-500">+ Add Row</button>
//                   </div>
//                   <div className="mt-4">
//                   <h4 className="font-semibold mb-2">Grid Columns:</h4>
//                   {question.gridColumns.map((col, colIndex) => (
//                     <div key={colIndex} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         placeholder="Column Label"
//                         value={col.text}
//                         onChange={(e) => {
//                           const updatedCols = [...question.gridColumns];
//                           updatedCols[colIndex].text = e.target.value;
//                           updateQuestion(index, "gridColumns", updatedCols);
//                         }}
//                         className="flex-1 p-2 border rounded"
//                       />
//                       <button onClick={() => {
//                         const updatedCols = question.gridColumns.filter((_, i) => i !== colIndex);
//                         updateQuestion(index, "gridColumns", updatedCols);
//                       }} className="text-red-500">Remove</button>
//                     </div>
//                   ))}
//                   <button onClick={() => {
//                     const updatedCols = [...question.gridColumns, { text: "" }];
//                     updateQuestion(index, "gridColumns", updatedCols);
//                   }} className="text-blue-500">+ Add Column</button>
//                 </div>
//                 </>
//                 )}
//               </div>
//             ))}

//             <button onClick={saveForm} className="bg-green-600 text-white px-4 py-2 rounded">Save Form</button>
//           </div>
//         ) : (
//           <div>
//             <button onClick={() => setIsCreatingForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">+ Create New Form</button>
//             <h2 className="text-xl font-semibold">Existing Forms</h2>
//             <ul>
//               {forms.map((form, index) => (
//                 <li key={index} className="mb-2">
//                   <button onClick={() => viewForm(index)} className="text-blue-600 hover:underline">{form.title}</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LibrarySection;


// import React, { useState } from "react";

// Main Library Section Component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { getAllLibraryForms, updateLibraryForm , deleteLibraryForm } from "../api.js"; // Assuming updateLibraryForm is defined
import { Eye , Pencil ,Plus,PlusSquare,X , Trash2} from "lucide-react";
import LibraryPopup from "./LibraryPopup.jsx";

const LibraryUI = () => {
  const [forms, setForms] = useState([]); // Stores all the forms
  const [currentFormIndex, setCurrentFormIndex] = useState(null); // Tracks the current form being viewed
  const [formQuestions, setFormQuestions] = useState([]); // Stores the questions for the current form
  const [editingForm, setEditingForm] = useState(null); // Tracks the form being edited
  const [updatedFormData, setUpdatedFormData] = useState(null); // Stores the updated form data
  const navigate = useNavigate(); // Assuming you're using react-router-dom for navigation
  const [isNewLibraryModalOpen, setIsNewLibraryModalOpen] = useState(false);
    const [isBuildLibraryFromScratch, setIsBuildLibraryFromScratch] = useState(false);



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
    // setCurrentFormIndex(index);
    // setEditingForm(null); // Reset editing when switching views
    // setUpdatedFormData(null);

    navigate(`/preview-library-form/${index._id}`);
  };

  const handleEdit = (form) => {
    // setEditingForm(form);
    // setUpdatedFormData({
    //   title: form.title,
    //   sections: form.sections,
    // });
    navigate("/library-form", { state: { form } });
  };

  const handleSectionChange = (sectionIndex, updatedSection) => {
    const updatedSections = [...updatedFormData.sections];
    updatedSections[sectionIndex] = updatedSection;
    setUpdatedFormData({ ...updatedFormData, sections: updatedSections });
  };

  const handleSaveChanges = async () => {
    try {
      // const token = localStorage.getItem("token");
      await updateLibraryForm(editingForm._id, updatedFormData); // Assuming this function exists
      // After saving, update the forms state and reset editing state
      const updatedForms = forms.map((form) =>
        form.id === editingForm.id ? { ...form, ...updatedFormData } : form
      );
      setForms(updatedForms);
      setEditingForm(null);
      setUpdatedFormData(null);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  const handleDelete = async (formId) => {
    try {
      const token = localStorage.getItem("token"); 
      await deleteLibraryForm(formId, token);  // Call API to delete form
      setForms(forms.filter((form) => form._id !== formId));  // Remove deleted form from state
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };


  return (
    <div className="min-h-screen p-8">
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => setIsNewLibraryModalOpen(true)}
            className="flex justify-between items-center bg-blue-600 text-white rounded-md py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors mb-4 text-sm tracking-wide shadow-sm"
          >
           <Plus size={16}/>  New Library
          </button>
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
                      className="py-2 px-4 text-blue-600  cursor-pointer"
                      // onClick={() => viewForm(form)}
                    >
                      {form.title}
                    </td>
                    <td className="py-2 px-4 ">{form.sections.length}</td>
                    <td className="py-2 px-4">{form.owner || "me"}</td>
                    <td className="py-2 px-4"><button className="cursor-pointer" onClick={() => viewForm(form)}> <Eye className="h-5 w-5"/></button></td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleEdit(form)}
                      >
                        Edit
                      </button>
                    </td>
                    <button
                        className="py-2 px-4"
                        onClick={() => handleDelete(form._id)} // Trigger delete on click
                      >
                        <Trash2 className="h-5 w-5"/>
                      </button>
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

          {currentFormIndex !== null && !editingForm && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Form Preview: {forms[currentFormIndex].title}</h2>
              {forms[currentFormIndex].sections.map((section, secIndex) => (
                <div key={secIndex} className="mb-6 border rounded-lg px-2">
                  <h3 className="text-lg font-semibold mb-2">{section.title || "Untitled Section"}</h3>
                  {section.questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-2">
                      <p className="font-semibold">{question.text}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {editingForm && updatedFormData && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Edit Form: {editingForm.title}</h2>

              {/* Edit Form Title */}
              <div className="mb-4">
                <label className="block font-semibold">Form Title</label>
                <input
                  type="text"
                  value={updatedFormData.title}
                  onChange={(e) =>
                    setUpdatedFormData({ ...updatedFormData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Edit Sections */}
              {updatedFormData.sections.map((section, secIndex) => (
                <div key={secIndex} className="mb-4 border rounded-lg px-2">
                  <h3 className="text-lg font-semibold mb-2">Section: {section.title || "Untitled"}</h3>
                  <textarea
                    value={section.title}
                    onChange={(e) => {
                      const updatedSection = { ...section, title: e.target.value };
                      handleSectionChange(secIndex, updatedSection);
                    }}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  {section.questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-2">
                      <textarea
                        value={question.text}
                        onChange={(e) => {
                          const updatedQuestions = [...section.questions];
                          updatedQuestions[qIndex] = { ...question, text: e.target.value };
                          handleSectionChange(secIndex, { ...section, questions: updatedQuestions });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
              ))}

              <button
                onClick={handleSaveChanges}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
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
      {isBuildLibraryFromScratch && (
        <LibraryPopup onClose={() => setIsBuildLibraryFromScratch(false)} /> // Assume z-50 inside
      )}
    </div>
  );
};

export default LibraryUI;
