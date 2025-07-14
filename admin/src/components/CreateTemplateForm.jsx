import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Plus, X, ChevronDown, CircleX, Upload, Trash2 ,Image as ImageIcon} from "lucide-react";
import { updateTemplate, createTemplate, getTemplateById, getAllLibraryForms, uploadImage, deleteImage } from "../api";

const CreateTemplateForm = () => {
  const { projectName, projectId, projectDescription } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedForm, setSelectedForm] = useState(null); // Selected existing form to copy from
  const { project } = location.state || {}; // Get project data from navigation state
  const [isEditMode, setIsEditMode] = useState(false);
  const [formTitle, setFormTitle] = useState(project ? project.title : "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [existingForms, setExistingForms] = useState([]); // Existing forms to choose from
  const [selectedSection, setSelectedSection] = useState(null);

  const [formDescription, setFormDescription] = useState(
    project ? project.description : ""
  );
  const [sections, setSections] = useState(
    project
      ? project.sections
      : [
          {
            id: Date.now(),
            title: "Untitled Section",
            image: null, // Add image support for sections
            questions: [
              
              {
                id: Date.now(),
                text: "Default Question",
                type: "Short Answer",
                image: null, // Add image support for questions
                options: [],
                gridRows: [],
                gridOptions: [],
                required: true,
              },
            ],
            visibilityCondition: null,
          },
        ]
  );
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  
  console.log(sections);

   useEffect(() => {
    // Fetch existing forms (e.g., from an API or state)
    const fetchExistingForms = async () => {
      setLoading(true);
      // Assume we are fetching the list of forms from an API
      // Example API call
      const data = await getAllLibraryForms(token);
      if (data){
        setExistingForms(data);
      }else{
        setExistingForms([])
      }
      setLoading(false);
    };

    fetchExistingForms();
  }, []);

  useEffect(() => {
    if (projectId) {
      setIsEditMode(true);
      const fetchTemplate = async () => {
        try {
          const response = await getTemplateById(projectId);
          const template = response; // Assuming `data` contains the template
          setFormTitle(template.name);
          setFormDescription(template.description);
          setSections(template.sections);
        } catch (error) {
          console.error("Error fetching template:", error);
        }
      };
      fetchTemplate();
    }
  }, [projectId]);

  const updateQuestionOrOption = (
    sectionId,
    questionId,
    optionId,
    newText,
    type = "question"
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                if (type === "question") {
                  return { ...question, text: newText };
                } else {
                  return {
                    ...question,
                    options: question.options.map((option) => {
                      if (option.id === optionId) {
                        return { ...option, text: newText };
                      }
                      return option;
                    }),
                  };
                }
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const toggleModal = () => {
    // setIsModalOpen((prev) => !prev);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addExistingSection = () => {
    if (selectedForm && selectedSection !== null) {
      // Find the selected section from the existing form
      const formToCopy = existingForms.find(
        (form) => form._id === selectedForm
      );
      const sectionToAdd = formToCopy.sections.find(
        (section) => section.id === selectedSection
      );

      if (sectionToAdd) {
        // Add the selected section to the current form
        setSections((prevSections) => [...prevSections, sectionToAdd]);
      }
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleQuestionTypeChange = (sectionId, questionId, newType) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  type: newType,
                  options:
                    newType === "Multiple Choice" || newType === "Checkbox"
                      ? [
                          { id: Date.now(), text: "" },
                          { id: Date.now() + 1, text: "" },
                        ]
                      : [],
                };
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleSaveForm = async () => {
    if (!formTitle || !formDescription) {
      alert("Please fill in the form title and description");
      return;
    }

    const formData = {
      name: formTitle,
      description: formDescription,
      sections: sections,
    };

    setLoading(true);
    try {
      const response = await updateTemplate(projectId, formData); // Call the update API
      console.log("Form updated successfully:", response.data);
      alert("Form updated successfully!");
    } catch (error) {
      console.error("Error updating form:", error);
      alert("Error updating form. Please try again.");
    } finally {
      setLoading(false);
      navigate("/admin-panel/profile");
    }
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        title: "Untitled Section",
        image: null, // Add image support
        questions: [
          {
            id: Date.now(),
            text: "Default Question",
            type: "Short Answer",
            image: null, // Add image support for new questions
            options: [],
            isRequired: false,
          },
        ],
        visibilityCondition: null,
      },
    ]);
  };

  const deleteSection = (sectionId) => {
    setSections(sections.filter((section) => section._id !== sectionId));
  };

  const addQuestion = (sectionId) => {
    setSections(
      sections.map((section) => {
        if (section._id === sectionId) {
          return {
            ...section,
            questions: [
              ...section.questions,
              {
                id: Date.now(),
                text: "Default Question",
                type: "Short Answer",
                image: null, // Add image support for new questions
                options: [],
                isRequired: false,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const deleteQuestion = (sectionId, questionId) => {
    setSections(
      sections.map((section) => {
        if (section._id === sectionId) {
          return {
            ...section,
            questions: section.questions.filter(
              (question) => question.id !== questionId
            ),
          };
        }
        return section;
      })
    );
  };

  const addOption = (sectionId, questionId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  options: [
                    ...question.options,
                    {
                      id: Date.now(),
                      text: "",
                    },
                  ],
                };
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const [settingsSectionId, setSettingsSectionId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");

  const openSettings = (sectionId) => {
    setSettingsSectionId(sectionId);
  };

  const applyCondition = () => {
    setSections(
      sections.map((s) =>
        s.id === settingsSectionId
          ? {
              ...s,
              visibilityCondition: {
                questionId: selectedQuestionId,
                optionId: selectedOptionId,
              },
            }
          : s
      )
    );
    setSettingsSectionId(null);
  };

  const deleteOption = (sectionId, questionId, optionId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  options: question.options.filter(
                    (option) => option.id !== optionId
                  ),
                };
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleRequiredToggle = (sectionId, questionId) => {
    console.log(sectionId, questionId);
    setSections(
      sections.map((section) => {
        if (section._id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                console.log(question.isRequired);
                return {
                  ...question,
                  isRequired: !question.isRequired, // Toggle the required status
                };
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const addColumnToGrid = (questionId) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return {
                ...question,
                gridOptions: [
                  ...(question.gridOptions || []),
                  {
                    id: Date.now().toString(),
                    text: `Option ${question.options.length + 1}`,
                  },
                ],
              };
            }
            return question;
          }),
        };
      });
    });
  };

  const addRowToGrid = (questionId) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return {
                ...question,
                gridRows: [
                  ...(question.gridRows || []),
                  {
                    id: Date.now().toString(),
                    text: `Row ${question.rows ? question.rows.length + 1 : 1}`,
                    selectedOptions: [],
                  },
                ],
              };
            }
            return question;
          }),
        };
      });
    });
  };

  const handleRowNameChange = (questionId, rowId, newName) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return {
                ...question,
                gridRows: question.gridRows.map((row) =>
                  row.id === rowId ? { ...row, text: newName } : row
                ),
              };
            }
            return question;
          }),
        };
      });
    });
  };

  // Handle option name changes (for columns)
  const handleOptionNameChange = (questionId, optionId, newText) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return {
                ...question,
                gridOptions: question.gridOptions.map((option) =>
                  option.id === optionId ? { ...option, text: newText } : option
                ),
              };
            }
            return question;
          }),
        };
      });
    });
  };

  const removeRowFromGrid = (questionId, rowId) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return {
                ...question,
                gridRows: question.gridRows.filter((row) => row.id !== rowId),
              };
            }
            return question;
          }),
        };
      });
    });
  };

  const removeColumnFromGrid = (questionId, optionId) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return {
                ...question,
                gridOptions: question.gridOptions.filter(
                  (option) => option.id !== optionId
                ),
                gridRows: question.gridRows.map((row) => ({
                  ...row,
                  selectedOptions: Array.isArray(row.selectedOptions)
                    ? row.selectedOptions.filter(
                        (selectedOptionId) => selectedOptionId !== optionId
                      )
                    : [],
                })),
              };
            }
            return question;
          }),
        };
      });
    });
  };

  // Handle image upload for questions with Cloudinary
  const handleImageUpload = async (sectionId, questionId, file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setSections(prevSections => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return { ...question, imageUploading: true };
              }
              return question;
            }),
          };
        }
        return section;
      });
    });

    try {
      const response = await uploadImage(file, token);
      if (response.success) {
        setSections(prevSections => {
          return prevSections.map((section) => {
            if (section.id === sectionId) {
              return {
                ...section,
                questions: section.questions.map((question) => {
                  if (question.id === questionId) {
                    return {
                      ...question,
                      image: { url: response.imageUrl, publicId: response.publicId },
                      imageUploading: false
                    };
                  }
                  return question;
                }),
              };
            }
            return section;
          });
        });
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
      setSections(prevSections => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              questions: section.questions.map((question) => {
                if (question.id === questionId) {
                  return { ...question, imageUploading: false };
                }
                return question;
              }),
            };
          }
          return section;
        });
      });
    }
  };

  // Remove image from question
  const removeQuestionImage = async (sectionId, questionId) => {
    let imageToDelete = null;
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.questions.forEach(question => {
          if (question.id === questionId && question.image) {
            imageToDelete = question.image;
          }
        });
      }
    });

    setSections(sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return { ...question, image: null };
            }
            return question;
          }),
        };
      }
      return section;
    }));

    if (imageToDelete && imageToDelete.publicId) {
      try {
        await deleteImage(imageToDelete.publicId, token);
      } catch (error) {
        console.error('Failed to delete image from Cloudinary:', error);
      }
    }
  };

  // Handle image upload for sections
  const handleSectionImageUpload = async (sectionId, file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setSections(prevSections => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, imageUploading: true };
        }
        return section;
      });
    });

    try {
      const response = await uploadImage(file, token);
      if (response.success) {
        setSections(prevSections => {
          return prevSections.map((section) => {
            if (section.id === sectionId) {
              return {
                ...section,
                image: { url: response.imageUrl, publicId: response.publicId },
                imageUploading: false
              };
            }
            return section;
          });
        });
        alert('Section image uploaded successfully!');
      }
    } catch (error) {
      console.error('Failed to upload section image:', error);
      alert('Failed to upload section image. Please try again.');
      setSections(prevSections => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return { ...section, imageUploading: false };
          }
          return section;
        });
      });
    }
  };

  // Remove image from section
  const removeSectionImage = async (sectionId) => {
    let imageToDelete = null;
    sections.forEach(section => {
      if (section.id === sectionId && section.image) {
        imageToDelete = section.image;
      }
    });

    setSections(sections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, image: null };
      }
      return section;
    }));

    if (imageToDelete && imageToDelete.publicId) {
      try {
        await deleteImage(imageToDelete.publicId, token);
      } catch (error) {
        console.error('Failed to delete section image from Cloudinary:', error);
      }
    }
  };

  const isSectionVisible = (section) => {
    if (!section.visibilityCondition) return true; // No condition, section is always visible

    const { questionId, optionId } = section.visibilityCondition;

    // Log values to debug
    console.log("Visibility Condition:", questionId, optionId);
    console.log("Responses:", responses);

    const selectedOptions = responses[questionId] || []; // Get selected options (array for checkboxes)

    console.log("Selected Options:", selectedOptions);

    return selectedOptions.includes(optionId); // Checks if selected option matches the condition
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
    //   <div className="max-w-4xl mx-auto">
    //     <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
    //       <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
    //         {projectId ? "Update Form" : "Create Your Form"}
    //       </h1>
    //       <p className="text-gray-600 mb-8 text-center text-lg">
    //         Design a professional form with custom sections and questions.
    //       </p>

    //       <div className="space-y-6">
    //         <input
    //           type="text"
    //           placeholder="Enter Form Title"
    //           value={formTitle}
    //           onChange={(e) => setFormTitle(e.target.value)}
    //           className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    //         />

    //         <textarea
    //           placeholder="Enter Form Description"
    //           value={formDescription}
    //           onChange={(e) => setFormDescription(e.target.value)}
    //           className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    //           rows="3"
    //         />
    //       </div>
    //     </div>

    //     <button
    //       onClick={addSection}
    //       className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
    //     >
    //       <Plus size={20} /> Add New Section
    //     </button>

    //     {sections.map((section) => {
    //       // Check if the section should be visible
    //       if (!isSectionVisible(section)) return null;

    //       return (
    //         <div
    //           key={section._id}
    //           className="mb-8 bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
    //         >
    //           <div className="flex justify-between items-center mb-6">
    //             <input
    //               type="text"
    //               placeholder="Section Title"
    //               value={section.title}
    //               onChange={(e) => {
    //                 setSections(
    //                   sections.map((s) =>
    //                     s.id === section.id
    //                       ? { ...s, title: e.target.value }
    //                       : s
    //                   )
    //                 );
    //               }}
    //               className="w-full text-xl md:text-2xl font-semibold px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-200 bg-transparent"
    //             />
    //             <button
    //               onClick={() => openSettings(section.id)}
    //               className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition"
    //               title="Section Settings"
    //             >
    //               ⚙️
    //             </button>
    //           </div>

    //           {/* Section Image Upload */}
    //           <div className="mb-6">
    //             <div className="flex items-center gap-4 mb-3">
    //               <h4 className="text-sm font-medium text-gray-700">Section Image</h4>
    //               {!section.image && (
    //                 <label className="cursor-pointer">
    //                   <input
    //                     type="file"
    //                     accept="image/*"
    //                     className="hidden"
    //                     onChange={(e) => {
    //                       const file = e.target.files?.[0];
    //                       if (file) {
    //                         handleSectionImageUpload(section.id, file);
    //                       }
    //                     }}
    //                   />
    //                   <div className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
    //                     <Upload size={16} />
    //                     <span>Upload Image</span>
    //                   </div>
    //                 </label>
    //               )}
    //             </div>
                
    //             {section.imageUploading && (
    //               <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
    //                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
    //                 <span>Uploading section image...</span>
    //               </div>
    //             )}
                
    //             {section.image && (
    //               <div className="relative inline-block">
    //                 <img
    //                   src={section.image.url}
    //                   alt="Section"
    //                   className="max-w-sm max-h-40 object-cover rounded-lg border border-gray-200 shadow-sm"
    //                 />
    //                 <button
    //                   onClick={() => removeSectionImage(section.id)}
    //                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
    //                   title="Remove section image"
    //                 >
    //                   <Trash2 size={14} />
    //                 </button>
    //               </div>
    //             )}
    //           </div>

    //           <div className="space-y-6">
    //             {section.questions.map((question) => (
    //               <div
    //                 key={question._id}
    //                 className="bg-gray-50 rounded-lg p-6 transition-all duration-200 hover:shadow-md"
    //               >
    //                 <div className="flex flex-col md:flex-row gap-4 mb-4">
    //                   <input
    //                     type="text"
    //                     placeholder="Enter Question"
    //                     value={question.text}
    //                     onChange={(e) =>
    //                       updateQuestionOrOption(
    //                         section.id,
    //                         question.id,
    //                         null,
    //                         e.target.value,
    //                         "question"
    //                       )
    //                     }
    //                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    //                   />
    //                   <div className="flex gap-2">
    //                     <div className="relative">
    //                       <select
    //                         className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none bg-white pr-10"
    //                         onChange={(e) =>
    //                           handleQuestionTypeChange(
    //                             section.id,
    //                             question.id,
    //                             e.target.value
    //                           )
    //                         }
    //                         value={question.type}
    //                       >
    //                         <option>Short Answer</option>
    //                         <option>Long Answer</option>
    //                         <option>Multiple Choice</option>
    //                         <option>Checkbox</option>
    //                         <option>Decimal</option>
    //                         <option>Number</option>
    //                         <option>File</option>
    //                         <option>Multiple Choice Grid</option>
    //                       </select>
    //                       <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
    //                         <ChevronDown size={20} />
    //                       </div>
    //                     </div>
    //                     <button
    //                       type="button"
    //                       onClick={() =>
    //                         handleRequiredToggle(section._id, question.id)
    //                       } // Call to handle toggle
    //                       className={`px-4 py-2 rounded-full focus:outline-none 
    //     ${question.isRequired ? "bg-green-500" : "bg-gray-300"} 
    //     ${question.isRequired ? "text-white" : "text-gray-700"} 
    //     transition-colors duration-300`} // Dynamic styling based on 'isRequired' state
    //                     >
    //                       {/* Toggle Text */}
    //                       {question.isRequired ? "Required" : "Optional"}
    //                     </button>
    //                     <button
    //                       onClick={() =>
    //                         deleteQuestion(section._id, question.id)
    //                       }
    //                       className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
    //                       title="Delete Question"
    //                     >
    //                       <X size={20} />
    //                     </button>
    //                   </div>
    //                 </div>

    //                 {/* Question Image Upload */}
    //                 <div className="mb-4">
    //                   {question.image ? (
    //                     <div className="relative inline-block">
    //                       <img
    //                         src={question.image.url}
    //                         alt="Question"
    //                         className="max-w-xs max-h-48 object-cover rounded-lg border border-gray-300"
    //                       />
    //                       <button
    //                         onClick={() => removeQuestionImage(section.id, question.id)}
    //                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
    //                         title="Remove image"
    //                       >
    //                         <Trash2 size={16} />
    //                       </button>
    //                     </div>
    //                   ) : (
    //                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
    //                       {question.imageUploading ? (
    //                         <div className="text-blue-600 text-sm">Uploading image...</div>
    //                       ) : (
    //                         <label className="cursor-pointer">
    //                           <input
    //                             type="file"
    //                             accept="image/*"
    //                             className="hidden"
    //                             onChange={(e) => {
    //                               const file = e.target.files?.[0];
    //                               if (file) {
    //                                 handleImageUpload(section.id, question.id, file);
    //                               }
    //                             }}
    //                           />
    //                           <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 transition-colors">
    //                             <Upload size={20} className="mb-1" />
    //                             <span className="text-xs">Add question image</span>
    //                           </div>
    //                         </label>
    //                       )}
    //                     </div>
    //                   )}
    //                 </div>

    //                 {/* Add options for MCQ and Checkbox */}
    //                 {(question.type === "Multiple Choice" ||
    //                   question.type === "Checkbox") && (
    //                   <div className="mt-4 space-y-3">
    //                     {question.options.map((option) => (
    //                       <div
    //                         key={option.id}
    //                         className="flex items-center gap-3"
    //                       >
    //                         <input
    //                           type={
    //                             question.type === "Multiple Choice"
    //                               ? "radio"
    //                               : "checkbox"
    //                           }
    //                           checked={responses[question.id]?.includes(
    //                             option.id.toString()
    //                           )}
    //                           // onChange={(e) => {
    //                           //   const updatedResponses = { ...responses };
    //                           //  if (e.target.checked) {
    //                           //     updatedResponses[question.id] = [
    //                           //       ...(updatedResponses[question.id] || []),
    //                           //       option.id.toString(),
    //                           //     ];
    //                           //   } else {
    //                           //     updatedResponses[question.id] =
    //                           //       updatedResponses[question.id].filter(
    //                           //         (id) => id !== option.id.toString()
    //                           //       );
    //                           //   }
    //                           //   setResponses(updatedResponses); // Update state to reflect checked options
    //                           // }}
    //                           // onChange={(e) => {
    //                           //   const updatedResponses = { ...responses };
    //                           //   const questionId = question.id; // Ensure this is the correct `question.id`

    //                           //   if (e.target.checked) {
    //                           //     updatedResponses[questionId] = [
    //                           //       ...(updatedResponses[questionId] || []),
    //                           //       option.id.toString(),
    //                           //     ];
    //                           //   } else {
    //                           //     updatedResponses[questionId] =
    //                           //       updatedResponses[questionId].filter(
    //                           //         (id) => id !== option.id.toString()
    //                           //       );
    //                           //   }
    //                           //   setResponses(updatedResponses);
    //                           // }}

    //                           onChange={(e) => {
    //                             const updatedResponses = { ...responses };
    //                             const questionId = question.id;

    //                             if (question.type === "Multiple Choice") {
    //                               // For MCQ, ensure only one option can be selected
    //                               updatedResponses[questionId] = [
    //                                 option.id.toString(),
    //                               ];
    //                             } else {
    //                               // For Checkbox, allow multiple selections
    //                               if (e.target.checked) {
    //                                 updatedResponses[questionId] = [
    //                                   ...(updatedResponses[questionId] || []),
    //                                   option.id.toString(),
    //                                 ];
    //                               } else {
    //                                 updatedResponses[questionId] =
    //                                   updatedResponses[questionId].filter(
    //                                     (id) => id !== option.id.toString()
    //                                   );
    //                               }
    //                             }

    //                             setResponses(updatedResponses);
    //                           }}
    //                           className="w-4 h-4"
    //                         />
    //                         <input
    //                           type="text"
    //                           placeholder="Enter option"
    //                           value={option.text}
    //                           onChange={(e) =>
    //                             updateQuestionOrOption(
    //                               section.id,
    //                               question.id,
    //                               option.id,
    //                               e.target.value,
    //                               "option"
    //                             )
    //                           }
    //                           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
    //                         />
    //                         <button
    //                           onClick={() =>
    //                             deleteOption(section.id, question.id, option.id)
    //                           }
    //                           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
    //                           title="Delete Option"
    //                         >
    //                           <X size={20} />
    //                         </button>
    //                       </div>
    //                     ))}
    //                     <button
    //                       onClick={() => addOption(section.id, question.id)}
    //                       className="mt-4 text-blue-600 hover:text-blue-800"
    //                     >
    //                       + Add Option
    //                     </button>
    //                   </div>
    //                 )}

    //                 {question.type === "Multiple Choice Grid" && (
    //                   <div className="mt-6 space-y-6 p-4 border rounded-xl bg-gray-50">
    //                     <div className="grid grid-cols-2 gap-6">
    //                       {/* Rows Section */}
    //                       <div className="border rounded-lg p-4 bg-white shadow-sm">
    //                         <h3 className="text-lg font-semibold mb-4">Rows</h3>
    //                         {question.gridRows &&
    //                         Array.isArray(question.gridRows) ? (
    //                           <ul className="space-y-2">
    //                             {question.gridRows.map((row) => (
    //                               <li
    //                                 key={row.id}
    //                                 className="flex items-center gap-2"
    //                               >
    //                                 <input
    //                                   type="text"
    //                                   value={row.text}
    //                                   onChange={(e) =>
    //                                     handleRowNameChange(
    //                                       question.id,
    //                                       row.id,
    //                                       e.target.value
    //                                     )
    //                                   }
    //                                   className="w-full border rounded px-2 py-1"
    //                                   placeholder="Row name"
    //                                 />
    //                                 <button
    //                                   onClick={() =>
    //                                     removeRowFromGrid(question.id, row.id)
    //                                   }
    //                                   className="text-red-500 hover:text-red-700"
    //                                   title="Remove Row"
    //                                 >
    //                                   ✕
    //                                 </button>
    //                               </li>
    //                             ))}
    //                           </ul>
    //                         ) : (
    //                           <p className="text-sm text-gray-500">
    //                             No rows available
    //                           </p>
    //                         )}
    //                       </div>

    //                       {/* Columns Section */}
    //                       <div className="border rounded-lg p-4 bg-white shadow-sm">
    //                         <h3 className="text-lg font-semibold mb-4">
    //                           Columns
    //                         </h3>
    //                         {question.gridOptions &&
    //                         question.gridOptions.length > 0 ? (
    //                           <ul className="space-y-2">
    //                             {question.gridOptions.map((option) => (
    //                               <li
    //                                 key={option.id}
    //                                 className="flex items-center gap-2"
    //                               >
    //                                 <input
    //                                   type="text"
    //                                   value={option.text}
    //                                   onChange={(e) =>
    //                                     handleOptionNameChange(
    //                                       question.id,
    //                                       option.id,
    //                                       e.target.value
    //                                     )
    //                                   }
    //                                   className="w-full border rounded px-2 py-1"
    //                                   placeholder="Column name"
    //                                 />
    //                                 <button
    //                                   onClick={() =>
    //                                     removeColumnFromGrid(
    //                                       question.id,
    //                                       option.id
    //                                     )
    //                                   }
    //                                   className="text-red-500 hover:text-red-700"
    //                                   title="Remove Column"
    //                                 >
    //                                   ✕
    //                                 </button>
    //                               </li>
    //                             ))}
    //                           </ul>
    //                         ) : (
    //                           <p className="text-sm text-gray-500">
    //                             No options available
    //                           </p>
    //                         )}
    //                       </div>
    //                     </div>

    //                     {/* Action Buttons */}
    //                     <div className="flex gap-4 justify-end">
    //                       <button
    //                         onClick={() => addRowToGrid(question.id)}
    //                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
    //                       >
    //                         Add Row
    //                       </button>
    //                       <button
    //                         onClick={() => addColumnToGrid(question.id)}
    //                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
    //                       >
    //                         Add Column
    //                       </button>
    //                     </div>
    //                   </div>
    //                 )}
    //               </div>
    //             ))}
    //           </div>

    //           <div className="flex flex-col sm:flex-row gap-4 mt-6">
    //             <button
    //               type="button"
    //               onClick={() => addQuestion(section._id)}
    //               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center gap-2 flex-1 sm:flex-none"
    //             >
    //               <Plus size={20} /> Add Question
    //             </button>
    //             <button
    //               type="button"
    //               onClick={() => deleteSection(section._id)}
    //               className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center gap-2"
    //             >
    //               <X size={20} /> Delete Section
    //             </button>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    //   {console.log(responses)}
    //   {settingsSectionId && (
    //     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    //       <div className="bg-white p-6 rounded-lg shadow-lg w-80">
    //         <h3 className="text-xl font-semibold mb-4">
    //           Set Visibility Condition
    //         </h3>
    //         <div className="mb-4">
    //           <label className="block text-gray-700 mb-2">
    //             Select Question
    //           </label>
    //           <select
    //             value={selectedQuestionId}
    //             onChange={(e) => setSelectedQuestionId(e.target.value)}
    //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           >
    //             <option value="">Select Question</option>
    //             {sections
    //               .flatMap((section) => section.questions)
    //               .map((question) => (
    //                 <option key={question.id} value={question.id}>
    //                   {question.text}
    //                 </option>
    //               ))}
    //           </select>
    //         </div>
    //         <div className="mb-4">
    //           <label className="block text-gray-700 mb-2">Select Option</label>
    //           <select
    //             value={selectedOptionId}
    //             onChange={(e) => setSelectedOptionId(e.target.value)}
    //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           >
    //             <option value="">Select Option</option>
    //             {console.log(
    //               sections.flatMap((section) =>
    //                 section.questions.find((question) =>
    //                   console.log(question.id?.toString(), selectedQuestionId)
    //                 )
    //               )
    //             )}
    //             {sections
    //               .flatMap(
    //                 (section) =>
    //                   section.questions.find(
    //                     (question) =>
    //                       question.id?.toString() === selectedQuestionId
    //                   )?.options || []
    //               )
    //               .map((option) => (
    //                 <option key={option.id} value={option.id}>
    //                   {option.text}
    //                 </option>
    //               ))}
    //           </select>
    //         </div>
    //         <button
    //           onClick={applyCondition}
    //           className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    //         >
    //           Apply Condition
    //         </button>
    //         <button
    //           onClick={() => setSettingsSectionId(null)}
    //           className="mt-4 w-full px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   <button
    //     onClick={handleSaveForm}
    //     className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-lg font-medium flex items-center justify-center gap-2 mb-8"
    //   >
    //     {loading ? "Saving..." : "Save Form"}
    //   </button>
    //   <div>
    //     <div className="space-y-6">
    //       {/* Section for selecting an existing form */}

    //       <div
    //         className="fixed top-4 right-4 z-50 px-3 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
    //         onClick={toggleModal}
    //       >
    //         Add From Library
    //       </div>
    //       {/* {isModalOpen && ( */}
    //       <div
    //         // className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    //         className={`fixed top-0 right-0 z-50 w-72 h-full bg-white shadow-lg transition-transform duration-300 ${
    //           isSidebarOpen
    //             ? "transform translate-x-0"
    //             : "transform translate-x-full"
    //         }`}
    //       >
    //         <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
    //           <h2 className="text-2xl font-semibold mb-4">
    //             Select Form and Section
    //           </h2>

    //           {/* Section for selecting an existing form */}
    //           <div>
    //             <label
    //               htmlFor="existingForm"
    //               className="block text-lg font-medium text-gray-700"
    //             >
    //               Select an Existing Form:
    //             </label>
    //             <select
    //               id="existingForm"
    //               onChange={(e) => setSelectedForm(e.target.value)}
    //               className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    //             >
    //               <option value="">Select a Form</option>
    //               {existingForms.map((form) => (
    //                 <option key={form._id} value={form._id}>
    //                   {form.title}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>

    //           {/* Section for selecting an existing section from the selected form */}
    //           {selectedForm && (
    //             <div>
    //               <label
    //                 htmlFor="existingSection"
    //                 className="block text-lg font-medium text-gray-700"
    //               >
    //                 Select a Section to Add:
    //               </label>
    //               <select
    //                 id="existingSection"
    //                 onChange={(e) => setSelectedSection(e.target.value)}
    //                 className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    //               >
    //                 <option value="">Select a Section</option>
    //                 {existingForms
    //                   .find((form) => form._id === selectedForm)
    //                   ?.sections.map((section) => (
    //                     <option key={section.id} value={section.id}>
    //                       {section.title}
    //                     </option>
    //                   ))}
    //               </select>
    //             </div>
    //           )}

    //           {/* Button to add the selected section */}
    //           <button
    //             onClick={addExistingSection}
    //             disabled={!selectedSection || !selectedForm}
    //             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium mt-4"
    //           >
    //             Add Selected Section
    //           </button>

    //           {/* Close Button */}
    //           <button
    //             onClick={toggleModal}
    //             className="absolute top-2 right-2 p-2 rounded-full text-gray-700 hover:bg-gray-400"
    //           >
    //             <CircleX />
    //           </button>
    //         </div>
    //       </div>
    //       {/* )} */}
    //       {/* Section for selecting an existing section from the selected form */}
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 justify-center flex flex-row to-gray-100 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl ">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
                {project?._id ? "Update Form" : "Create Your Form"}
              </h1>
              <p className="text-gray-600 mb-8 text-center text-lg">
                Design a professional form with custom sections and questions.
              </p>
    
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Enter Form Title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
    
                <textarea
                  placeholder="Enter Form Description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows="3"
                />
              </div>
            </div>
    
            <button
              onClick={addSection}
              className="mb-8  px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={20} /> Add New Section
            </button>
    
            {sections.map((section) => {
              // Check if the section should be visible
              if (!isSectionVisible(section)) return null;
    
              return (
                <div
                  key={section._id}
                  className="mb-8 bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <input
                      type="text"
                      placeholder="Section Title"
                      value={section.title}
                      onChange={(e) => {
                        setSections((prevSections) =>
                          prevSections.map(
                            (s) =>
                              s.id === section.id // Matching based on _id, not id
                                ? { ...s, title: e.target.value } // Only update the title
                                : s // Keep other sections unchanged
                          )
                        );
                      }}
                      className="w-full text-xl md:text-2xl font-semibold px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-200 bg-transparent"
                    />
                    {console.log(section)}
                    <button
                      onClick={() => openSettings(section.id)}
                      className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition"
                      title="Section Settings"
                    >
                      ⚙️
                    </button>
                  </div>
    
                  {/* Section Image Upload */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-3">
                      <label className="text-sm font-medium text-gray-700">
                        Section Image (Optional)
                      </label>
                      <div className="flex gap-2">
                        <label className="cursor-pointer flex items-center gap-2 px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all duration-200">
                          <ImageIcon size={16} />
                          Add Section Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              handleSectionImageUpload(section.id, file);
                              // Clear the input so the same file can be selected again
                              e.target.value = '';
                            }}
                            className="hidden"
                          />
                        </label>
                        {(section.image || section.imageUploading) && (
                          <button
                            onClick={() => removeSectionImage(section.id)}
                            disabled={section.imageUploading}
                            className="flex items-center gap-2 px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={16} />
                            {section.imageUploading ? 'Uploading...' : 'Remove'}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Display uploaded section image */}
                    {section.imageUploading && (
                      <div className="mt-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-500">Uploading image...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {section.image && !section.imageUploading && (
                      <div className="mt-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <img
                          src={section.image.url || section.image}
                          alt="Section visual"
                          className="max-w-full h-auto max-h-64 rounded-lg shadow-sm"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          This image will be displayed at the top of this section
                        </p>
                      </div>
                    )}
                  </div>
    
                  <div className="space-y-6">
                    {section.questions.map((question) => (
                      <>
                        <div
                          key={question.id}
                          className="bg-gray-50 rounded-lg p-6 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <input
                              type="text"
                              placeholder="Enter Question"
                              value={question.text}
                              onChange={(e) =>
                                updateQuestionOrOption(
                                  section.id,
                                  question.id,
                                  null,
                                  e.target.value,
                                  "question"
                                )
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            />
                            <div className="flex gap-2">
                              <div className="relative">
                                <select
                                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none bg-white pr-10"
                                  onChange={(e) =>
                                    handleQuestionTypeChange(
                                      section.id,
                                      question.id,
                                      e.target.value
                                    )
                                  }
                                  value={question.type}
                                >
                                  <option>Short Answer</option>
                                  <option>Long Answer</option>
                                  <option>Multiple Choice</option>
                                  <option>Checkbox</option>
                                  <option>Decimal</option>
                                  <option>Number</option>
                                  <option>File</option>
                                  <option>Multiple Choice Grid</option>
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                  <ChevronDown size={20} />
                                </div>
                              </div>
                              {console.log("New app", section._id, question.id)}
                              <button
                                type="button"
                                onClick={() =>
                                  handleRequiredToggle(section._id, question.id)
                                } // Call to handle toggle
                                className={`px-4 py-2 rounded-full focus:outline-none 
              ${question.isRequired ? "bg-green-500" : "bg-gray-300"} 
              ${question.isRequired ? "text-white" : "text-gray-700"} 
              transition-colors duration-300`} // Dynamic styling based on 'isRequired' state
                              >
                                {/* Toggle Text */}
                                {question.isRequired ? "Required" : "Optional"}
                              </button>
                              <button
                                onClick={() =>
                                  deleteQuestion(section._id, question.id)
                                }
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                title="Delete Question"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
    
                          {/* Image Upload Section */}
                          <div className="mb-4">
                            <div className="flex items-center gap-4 mb-3">
                              <label className="text-sm font-medium text-gray-700">
                                Question Image (Optional)
                              </label>
                              <div className="flex gap-2">
                                <label className="cursor-pointer flex items-center gap-2 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200">
                                  <ImageIcon size={16} />
                                  Add Image
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      handleImageUpload(section.id, question.id, file);
                                      // Clear the input so the same file can be selected again
                                      e.target.value = '';
                                    }}
                                    className="hidden"
                                  />
                                </label>
                                {(question.image || question.imageUploading) && (
                                  <button
                                    onClick={() => removeQuestionImage(section.id, question.id)}
                                    disabled={question.imageUploading}
                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Trash2 size={16} />
                                    {question.imageUploading ? 'Uploading...' : 'Remove'}
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Display uploaded image */}
                            {question.imageUploading && (
                              <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                                  <div className="text-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-1"></div>
                                    <p className="text-xs text-gray-500">Uploading...</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            {question.image && !question.imageUploading && (
                              <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                <img
                                  src={question.image.url || question.image}
                                  alt="Question visual"
                                  className="max-w-full h-auto max-h-48 rounded-lg shadow-sm"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                  This image will be displayed with your question
                                </p>
                              </div>
                            )}
                          </div>
    
                          {/* Add options for MCQ and Checkbox */}
                          {(question.type === "Multiple Choice" ||
                            question.type === "Checkbox") && (
                            <div className="mt-4 space-y-3">
                              {question.options.map((option) => (
                                <div
                                  key={option.id}
                                  className="flex items-center gap-3"
                                >
                                  <input
                                    type={
                                      question.type === "Multiple Choice"
                                        ? "radio"
                                        : "checkbox"
                                    }
                                    checked={responses[question.id]?.includes(
                                      option.id.toString()
                                    )}
                                    onChange={(e) => {
                                      const updatedResponses = { ...responses };
                                      if (e.target.checked) {
                                        updatedResponses[question.id] = [
                                          ...(updatedResponses[question.id] || []),
                                          option.id.toString(),
                                        ];
                                      } else {
                                        updatedResponses[question.id] =
                                          updatedResponses[question.id].filter(
                                            (id) => id !== option.id.toString()
                                          );
                                      }
                                      setResponses(updatedResponses); // Update state to reflect checked options
                                    }}
                                    className="w-4 h-4"
                                  />
                                  {console.log(
                                    question.type === "Checkbox"
                                      ? (section[question.id] || []).includes(
                                          option.id.toString()
                                        ) // Convert ID to string
                                      : section[question.id] ===
                                          option.id.toString() // Convert for radio too
                                  )}
                                  {console.log(sections)}
                                  <input
                                    type="text"
                                    placeholder="Enter option"
                                    value={option.text}
                                    onChange={(e) =>
                                      updateQuestionOrOption(
                                        section.id,
                                        question.id,
                                        option.id,
                                        e.target.value,
                                        "option"
                                      )
                                    }
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                  />
                                  <button
                                    onClick={() =>
                                      deleteOption(
                                        section.id,
                                        question.id,
                                        option.id
                                      )
                                    }
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                    aria-label="Delete option"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => addOption(section.id, question.id)}
                                className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                              >
                                <Plus size={16} /> Add Option
                              </button>
                            </div>
                          )}
                          {question.type === "File" && (
                            <div className="flex gap-2">
                              <input
                                type="file"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    updateQuestionOrOption(
                                      section.id,
                                      question.id,
                                      file,
                                      null,
                                      "file"
                                    );
                                  }
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              />
                              {question.file && <span>{question.file.name}</span>}
                            </div>
                          )}
    
                          {question.type === "Multiple Choice Grid" && (
                            <div className="mt-6 space-y-6 p-4 border rounded-xl bg-gray-50">
                              <div className="grid grid-cols-2 gap-6">
                                {/* Rows Section */}
                                <div className="border rounded-lg p-4 bg-white shadow-sm">
                                  <h3 className="text-lg font-semibold mb-4">
                                    Rows
                                  </h3>
                                  {question.gridRows &&
                                  Array.isArray(question.gridRows) ? (
                                    <ul className="space-y-2">
                                      {question.gridRows.map((row) => (
                                        <li
                                          key={row.id}
                                          className="flex items-center gap-2"
                                        >
                                          <input
                                            type="text"
                                            value={row.text}
                                            onChange={(e) =>
                                              handleRowNameChange(
                                                question.id,
                                                row.id,
                                                e.target.value
                                              )
                                            }
                                            className="w-full border rounded px-2 py-1"
                                            placeholder="Row name"
                                          />
                                          <button
                                            onClick={() =>
                                              removeRowFromGrid(question.id, row.id)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                            title="Remove Row"
                                          >
                                            ✕
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-gray-500">
                                      No rows available
                                    </p>
                                  )}
                                </div>
    
                                {/* Columns Section */}
                                <div className="border rounded-lg p-4 bg-white shadow-sm">
                                  <h3 className="text-lg font-semibold mb-4">
                                    Columns
                                  </h3>
                                  {question.gridOptions &&
                                  question.gridOptions.length > 0 ? (
                                    <ul className="space-y-2">
                                      {question.gridOptions.map((option) => (
                                        <li
                                          key={option.id}
                                          className="flex items-center gap-2"
                                        >
                                          <input
                                            type="text"
                                            value={option.text}
                                            onChange={(e) =>
                                              handleOptionNameChange(
                                                question.id,
                                                option.id,
                                                e.target.value
                                              )
                                            }
                                            className="w-full border rounded px-2 py-1"
                                            placeholder="Column name"
                                          />
                                          <button
                                            onClick={() =>
                                              removeColumnFromGrid(
                                                question.id,
                                                option.id
                                              )
                                            }
                                            className="text-red-500 hover:text-red-700"
                                            title="Remove Column"
                                          >
                                            ✕
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-gray-500">
                                      No options available
                                    </p>
                                  )}
                                </div>
                              </div>
    
                              {/* Action Buttons */}
                              <div className="flex gap-4 justify-end">
                                <button
                                  onClick={() => addRowToGrid(question.id)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                                >
                                  Add Row
                                </button>
                                <button
                                  onClick={() => addColumnToGrid(question.id)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                                >
                                  Add Column
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ))}
    
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => addQuestion(section._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center gap-2 flex-1 sm:flex-none"
                      >
                        <Plus size={20} /> Add Question
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSection(section._id)}
                        className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <X size={20} /> Delete Section
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {settingsSectionId !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-lg font-bold mb-4">
                    Set Visibility Condition
                  </h2>
                  <select
                    className="w-full border p-2 rounded"
                    onChange={(e) => setSelectedQuestionId(e.target.value)}
                  >
                    <option value="">Select a Question</option>
                    {sections
                      .flatMap((sec) => sec.questions)
                      .map((q) => (
                        <option key={q.id} value={q.id}>
                          {q.text}
                        </option>
                      ))}
                  </select>
    
                  {selectedQuestionId && (
                    <select
                      className="w-full border p-2 rounded mt-2"
                      onChange={(e) => setSelectedOptionId(e.target.value)}
                    >
                      <option value="">Select an Option</option>
                      {sections
                        .flatMap((sec) => sec.questions)
                        .find((q) => q.id == selectedQuestionId)
                        ?.options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.text}
                          </option>
                        ))}
                    </select>
                  )}
    
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setSettingsSectionId(null)}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        applyCondition(
                          settingsSectionId,
                          selectedQuestionId,
                          selectedOptionId
                        )
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
    
            <button
              onClick={handleSaveForm}
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-lg font-medium flex items-center justify-center gap-2 mb-8"
            >
              {loading ? "Saving..." : "Save Form"}
            </button>
          </div>
          <div>
            <div className="space-y-6">
              {/* Section for selecting an existing form */}
    
              <div
                className="fixed top-4 right-4 z-50 px-3 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                onClick={toggleModal}
              >
                Add From Library
              </div>
              {/* {isModalOpen && ( */}
                <div 
                // className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                 className={`fixed top-0 right-0 z-50 w-72 h-full bg-white shadow-lg transition-transform duration-300 ${
                isSidebarOpen ? 'transform translate-x-0' : 'transform translate-x-full'
              }`}
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-4">
                      Select Form and Section
                    </h2>
    
                    {/* Section for selecting an existing form */}
                    <div>
                      <label
                        htmlFor="existingForm"
                        className="block text-lg font-medium text-gray-700"
                      >
                        Select an Existing Form:
                      </label>
                      <select
                        id="existingForm"
                        onChange={(e) => setSelectedForm(e.target.value)}
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a Form</option>
                        {existingForms?.map((form) => (
                          <option key={form._id} value={form._id}>
                            {form.title}
                          </option>
                        ))}
                      </select>
                    </div>
    
                    {/* Section for selecting an existing section from the selected form */}
                    {selectedForm && (
                      <div>
                        <label
                          htmlFor="existingSection"
                          className="block text-lg font-medium text-gray-700"
                        >
                          Select a Section to Add:
                        </label>
                        <select
                          id="existingSection"
                          onChange={(e) => setSelectedSection(e.target.value)}
                          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select a Section</option>
                          {existingForms
                            .find((form) => form._id === selectedForm)
                            ?.sections.map((section) => (
                              <option key={section.id} value={section.id}>
                                {section.title}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
    
                    {/* Button to add the selected section */}
                    <button
                      onClick={addExistingSection}
                      disabled={!selectedSection || !selectedForm}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium mt-4"
                    >
                      Add Selected Section
                    </button>
    
                    {/* Close Button */}
                    <button
                      onClick={toggleModal}
                      className="absolute top-2 right-2 p-2 rounded-full text-gray-700 hover:bg-gray-400"
                    >
                      <CircleX/>
                    </button>
                  </div>
                </div>
              {/* )} */}
              {/* Section for selecting an existing section from the selected form */}
            </div>
          </div>
        </div>
  );
};

export default CreateTemplateForm;
