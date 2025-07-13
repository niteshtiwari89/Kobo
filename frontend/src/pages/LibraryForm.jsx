import React , {useState , useCallback} from  "react";
// import { Plus, X, ChevronDown } from "lucide-react";
import { createLibraryForm, updateLibraryForm,uploadImage, deleteImage } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { Plus, X, ChevronDown, CircleX, Image as ImageIcon, Trash2 } from "lucide-react";


const LibraryForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log("Library Form", location.state)
  const { template } = location.state || {};
  const { form } = location.state || {}; // Get project data from navigation state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingForms, setExistingForms] = useState([]); // Existing forms to choose from
  const [selectedForm, setSelectedForm] = useState(null); // Selected existing form to copy from
  const [selectedSection, setSelectedSection] = useState(null);
  
  const [formTitle, setFormTitle] = useState(
    form ? form.title : template ? template.name : ""
  );
  const [formDescription, setFormDescription] = useState(
    form ? form.description : template ? template.description : ""
  );
//   const [sections, setSections] = useState(
//     project
//       ? project?.sections
//       : template
//       ? template?.sections
//       : [
//           {
//             id: uuidv4(),
//             title: "Personal Information",
//             questions: [
//               {
//                 id: uuidv4(),
//                 text: "Name",
//                 type: "Short Answer",
//                 gridRows: [],
//                 gridOptions: [],
//                 options: [],
//                 isRequired: true,
//               },
//               {
//                 id: uuidv4(),
//                 text: "Age",
//                 type: "Short Answer",
//                 gridRows: [],
//                 gridOptions: [],
//                 options: [],
//                 isRequired: true,
//               },
//               {
//                 id: uuidv4(),
//                 text: "Sex",
//                 type: "Short Answer",
//                 gridRows: [],
//                 gridOptions: [],
//                 options: [],
//                 isRequired: true,
//               },
//               {
//                 id: uuidv4(),
//                 text: "Email",
//                 type: "Short Answer",
//                 gridRows: [],
//                 gridOptions: [],
//                 options: [],
//                 isRequired: true,
//               },
//               {
//                 id: uuidv4(),
//                 text: "Phone Number",
//                 type: "Short Answer",
//                 gridRows: [],
//                 gridOptions: [],
//                 options: [],
//                 isRequired: true,
//               },
//             ],
//             visibilityCondition: null,
//           },
//         ]
//   );

const [sections, setSections] = useState(() => {
    if (form?.sections) return cloneDeep(form.sections);
    if (template?.sections) return cloneDeep(template.sections);

    return [
      {
        id: uuidv4(),
        title: "Personal Information",
        image: null,
        questions: [
          {
            id: uuidv4(),
            text: "Name",
            type: "Short Answer",
            image: null,
            gridRows: [],
            gridOptions: [],
            options: [],
            isRequired: true,
          },
          {
            id: uuidv4(),
            text: "Age",
            image: null,
            type: "Short Answer",
            gridRows: [],
            gridOptions: [],
            options: [],
            isRequired: true,
          },
          {
            id: uuidv4(),
            text: "Sex",
            image: null,
            type: "Short Answer",
            gridRows: [],
            gridOptions: [],
            options: [],
            isRequired: true,
          },
          {
            id: uuidv4(),
            text: "Email",
            image: null,
            type: "Short Answer",
            gridRows: [],
            gridOptions: [],
            options: [],
            isRequired: true,
          },
          {
            id: uuidv4(),
            text: "Phone Number",
            type: "Short Answer",
            image: null,
            gridRows: [],
            gridOptions: [],
            options: [],
            isRequired: true,
          },
        ],
        visibilityCondition: null,
      },
    ];
  });
  console.log("All Section", sections);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const currentUser = parseJwt(token);

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
      title: formTitle,
      description: formDescription,
      sections: sections,
      userId: currentUser.userId,
    };

    setLoading(true);
    try {
      if (form?._id) {
        const response = await updateLibraryForm(form._id, formData,localStorage.getItem("token")); // Call updateLibraryForm API
        console.log("Form updated successfully:", response);

      } else {
        const response = await createLibraryForm(formData);
        console.log("Form created successfully:", response);
        alert("Form created successfully!");
      }
    } catch (error) {
      console.error("Error creating form:", error);
      alert("Error creating form. Please try again.");
    } finally {
      setLoading(false);
      navigate("/home/deployed");
    }
  };

  const addSection = useCallback(() => {
    setSections((prevSections) => [
      ...prevSections,
      { id: Date.now(), title: "", questions: [] },
    ]);
  }, []);
  // const addSection = () => {
  //   setSections([
  //     ...sections,
  //     {
  //       id: Date.now(),
  //       title: "Untitled Section",
  //       questions: [
  //         {
  //           id: Date.now(),
  //           text: "Default Question",
  //           type: "Short Answer",
  //           options: [],
  //           isRequired: true,
  //         },
  //       ],
  //       visibilityCondition: null,
  //     },
  //   ]);
  // };

  const deleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const addQuestion = (sectionId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: [
              ...section.questions,
              {
                id: uuidv4(),
                text: "Default Question",
                type: "Short Answer",
                image: null,
                options: [],
                isRequired: true,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  
    // Handle image upload for questions with Cloudinary
    const handleImageUpload = async (sectionId, questionId, file) => {
      console.log('Image upload started:', { sectionId, questionId, file });
      
      if (!file) {
        console.log('No file selected');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        console.log('File is not an image:', file.type);
        alert('Please select a valid image file');
        return;
      }
  
      // Add loading state for this specific question
      setSections(prevSections => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              questions: section.questions.map((question) => {
                if (question.id === questionId) {
                  return {
                    ...question,
                    imageUploading: true
                  };
                }
                return question;
              }),
            };
          }
          return section;
        });
      });
  
      try {
        // Upload to Cloudinary via our API
        const response = await uploadImage(file, token);
        
        if (response.success) {
          console.log('Image uploaded successfully:', response);
          
          // Update the question with the Cloudinary URL
          setSections(prevSections => {
            return prevSections.map((section) => {
              if (section.id === sectionId) {
                return {
                  ...section,
                  questions: section.questions.map((question) => {
                    if (question.id === questionId) {
                      return {
                        ...question,
                        image: {
                          url: response.imageUrl,
                          publicId: response.publicId
                        },
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
        
        // Remove loading state on error
        setSections(prevSections => {
          return prevSections.map((section) => {
            if (section.id === sectionId) {
              return {
                ...section,
                questions: section.questions.map((question) => {
                  if (question.id === questionId) {
                    return {
                      ...question,
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
      }
    };
  
    // Remove image from question
    const removeQuestionImage = async (sectionId, questionId) => {
      // First get the current image data to extract publicId
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
  
      // Remove from UI immediately
      setSections(sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  image: null
                };
              }
              return question;
            }),
          };
        }
        return section;
      }));
  
      // Delete from Cloudinary if it exists
      if (imageToDelete && imageToDelete.publicId) {
        try {
          await deleteImage(imageToDelete.publicId, token);
          console.log('Image deleted from Cloudinary');
        } catch (error) {
          console.error('Failed to delete image from Cloudinary:', error);
          // Image still removed from UI, but Cloudinary cleanup failed
        }
      }
    };
  
    // Handle image upload for sections with Cloudinary
    const handleSectionImageUpload = async (sectionId, file) => {
      console.log('Section image upload started:', { sectionId, file });
      
      if (!file) {
        console.log('No file selected for section');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        console.log('File is not an image:', file.type);
        alert('Please select a valid image file');
        return;
      }
  
      // Add loading state for this specific section
      setSections(prevSections => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              imageUploading: true
            };
          }
          return section;
        });
      });
  
      try {
        // Upload to Cloudinary via our API
        const response = await uploadImage(file, token);
        
        if (response.success) {
          console.log('Section image uploaded successfully:', response);
          
          // Update the section with the Cloudinary URL
          setSections(prevSections => {
            return prevSections.map((section) => {
              if (section.id === sectionId) {
                return {
                  ...section,
                  image: {
                    url: response.imageUrl,
                    publicId: response.publicId
                  },
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
        
        // Remove loading state on error
        setSections(prevSections => {
          return prevSections.map((section) => {
            if (section.id === sectionId) {
              return {
                ...section,
                imageUploading: false
              };
            }
            return section;
          });
        });
      }
    };
  
    // Remove image from section
    const removeSectionImage = async (sectionId) => {
      // First get the current image data to extract publicId
      let imageToDelete = null;
      
      sections.forEach(section => {
        if (section.id === sectionId && section.image) {
          imageToDelete = section.image;
        }
      });
  
      // Remove from UI immediately
      setSections(sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            image: null
          };
        }
        return section;
      }));
  
      // Delete from Cloudinary if it exists
      if (imageToDelete && imageToDelete.publicId) {
        try {
          await deleteImage(imageToDelete.publicId, token);
          console.log('Section image deleted from Cloudinary');
        } catch (error) {
          console.error('Failed to delete section image from Cloudinary:', error);
          // Image still removed from UI, but Cloudinary cleanup failed
        }
      }
    };
  
  const deleteQuestion = (sectionId, questionId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
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
    setIsModalOpen((prev) => !prev);
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

  const addQuestionToSection = (questionData) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === questionData.sectionId
          ? { ...sec, questions: [...sec.questions, questionData] }
          : sec
      )
    );
  };

  const isSectionVisible = (section) => {
    if (!section.visibilityCondition) return true; // No condition, section is always visible

    // Find the question and answer in the condition
    const { questionId, optionId } = section.visibilityCondition;

    const selectedOptions = responses[questionId] || []; // Get selected options (array for checkboxes)

    return selectedOptions.includes(optionId);
  };

  const handleGridSelectionChange = (
    questionId,
    rowId,
    optionId,
    isChecked
  ) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        return {
          ...section,
          questions: section.questions.map((question) => {
            if (question.id === questionId) {
              return {
                ...question,
                rows: question.rows.map((row) => {
                  if (row.id === rowId) {
                    return {
                      ...row,
                      selectedOptions: isChecked
                        ? [...row.selectedOptions, optionId]
                        : row.selectedOptions.filter((opt) => opt !== optionId),
                    };
                  }
                  return row;
                }),
              };
            }
            return question;
          }),
        };
      });
    });
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
   const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
        setIsSidebarOpen(!isSidebarOpen);

  };


  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
  //     <div className="max-w-4xl mx-auto">
  //       <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
  //         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
  //           {form?._id ? "Update Form" : "Create Your Form"}
  //         </h1>
  //         <p className="text-gray-600 mb-8 text-center text-lg">
  //           Design a professional form with custom sections and questions.
  //         </p>

  //         <div className="space-y-6">
  //           <input
  //             type="text"
  //             placeholder="Enter Form Title"
  //             value={formTitle}
  //             onChange={(e) => setFormTitle(e.target.value)}
  //             className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
  //           />

  //           <textarea
  //             placeholder="Enter Form Description"
  //             value={formDescription}
  //             onChange={(e) => setFormDescription(e.target.value)}
  //             className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
  //             rows="3"
  //           />
  //         </div>
  //       </div>

  //       <button
  //         onClick={addSection}
  //         className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
  //       >
  //         <Plus size={20} /> Add New Section
  //       </button>

  //       {sections?.map((section) => {
  //         // Check if the section should be visible
  //         if (!isSectionVisible(section)) return null;

  //         return (
  //           <div
  //             key={section._id}
  //             className="mb-8 bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
  //           >
  //             <div className="flex justify-between items-center mb-6">
  //               <input
  //                 type="text"
  //                 placeholder="Section Title"
  //                 value={section.title}
  //                 onChange={(e) => {
  //                   setSections((prevSections) =>
  //                     prevSections.map(
  //                       (s) =>
  //                         s.id === section.id // Matching based on _id, not id
  //                           ? { ...s, title: e.target.value } // Only update the title
  //                           : s // Keep other sections unchanged
  //                     )
  //                   );
  //                 }}
  //                 className="w-full text-xl md:text-2xl font-semibold px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-200 bg-transparent"
  //               />
  //               {console.log(section)}
  //               <button
  //                 onClick={() => openSettings(section.id)}
  //                 className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition"
  //                 title="Section Settings"
  //               >
  //                 ⚙️
  //               </button>
  //             </div>

  //             <div className="space-y-6">
  //               {section.questions.map((question) => (
  //                 <>
  //                   <div
  //                     key={question.id}
  //                     className="bg-gray-50 rounded-lg p-6 transition-all duration-200 hover:shadow-md"
  //                   >
  //                     <div className="flex flex-col md:flex-row gap-4 mb-4">
  //                       <input
  //                         type="text"
  //                         placeholder="Enter Question"
  //                         value={question.text}
  //                         onChange={(e) =>
  //                           updateQuestionOrOption(
  //                             section.id,
  //                             question.id,
  //                             null,
  //                             e.target.value,
  //                             "question"
  //                           )
  //                         }
  //                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
  //                       />
  //                       <div className="flex gap-2">
  //                         <div className="relative">
  //                           <select
  //                             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 appearance-none bg-white pr-10"
  //                             onChange={(e) =>
  //                               handleQuestionTypeChange(
  //                                 section.id,
  //                                 question.id,
  //                                 e.target.value
  //                               )
  //                             }
  //                             value={question.type}
  //                           >
  //                             <option>Short Answer</option>
  //                             <option>Long Answer</option>
  //                             <option>Multiple Choice</option>
  //                             <option>Checkbox</option>
  //                             <option>Decimal</option>
  //                             <option>Number</option>
  //                             <option>File</option>
  //                             <option>Multiple Choice Grid</option>
  //                           </select>
  //                           <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
  //                             <ChevronDown size={20} />
  //                           </div>
  //                         </div>
  //                         {console.log("New app", section._id, question.id)}
  //                         <button
  //                           type="button"
  //                           onClick={() =>
  //                             handleRequiredToggle(section._id, question.id)
  //                           } // Call to handle toggle
  //                           className={`px-4 py-2 rounded-full focus:outline-none 
  //             ${question.isRequired ? "bg-green-500" : "bg-gray-300"} 
  //             ${question.isRequired ? "text-white" : "text-gray-700"} 
  //             transition-colors duration-300`} // Dynamic styling based on 'isRequired' state
  //                         >
  //                           {/* Toggle Text */}
  //                           {question.isRequired ? "Required" : "Optional"}
  //                         </button>
  //                         <button
  //                           onClick={() =>
  //                             deleteQuestion(section.id, question.id)
  //                           }
  //                           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
  //                           title="Delete Question"
  //                         >
  //                           <X size={20} />
  //                         </button>
  //                       </div>
  //                     </div>

  //                     {/* Add options for MCQ and Checkbox */}
  //                     {(question.type === "Multiple Choice" ||
  //                       question.type === "Checkbox") && (
  //                       <div className="mt-4 space-y-3">
  //                         {question.options.map((option) => (
  //                           <div
  //                             key={option.id}
  //                             className="flex items-center gap-3"
  //                           >
  //                             <input
  //                               type={
  //                                 question.type === "Multiple Choice"
  //                                   ? "radio"
  //                                   : "checkbox"
  //                               }
  //                               checked={responses[question.id]?.includes(
  //                                 option.id.toString()
  //                               )}
  //                               onChange={(e) => {
  //                                 const updatedResponses = { ...responses };
  //                                 if (e.target.checked) {
  //                                   updatedResponses[question.id] = [
  //                                     ...(updatedResponses[question.id] || []),
  //                                     option.id.toString(),
  //                                   ];
  //                                 } else {
  //                                   updatedResponses[question.id] =
  //                                     updatedResponses[question.id].filter(
  //                                       (id) => id !== option.id.toString()
  //                                     );
  //                                 }
  //                                 setResponses(updatedResponses); // Update state to reflect checked options
  //                               }}
  //                               className="w-4 h-4"
  //                             />
  //                             {console.log(
  //                               question.type === "Checkbox"
  //                                 ? (section[question.id] || []).includes(
  //                                     option.id.toString()
  //                                   ) // Convert ID to string
  //                                 : section[question.id] ===
  //                                     option.id.toString() // Convert for radio too
  //                             )}
  //                             {console.log(sections)}
  //                             <input
  //                               type="text"
  //                               placeholder="Enter option"
  //                               value={option.text}
  //                               onChange={(e) =>
  //                                 updateQuestionOrOption(
  //                                   section.id,
  //                                   question.id,
  //                                   option.id,
  //                                   e.target.value,
  //                                   "option"
  //                                 )
  //                               }
  //                               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
  //                             />
  //                             <button
  //                               onClick={() =>
  //                                 deleteOption(
  //                                   section.id,
  //                                   question.id,
  //                                   option.id
  //                                 )
  //                               }
  //                               className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
  //                               aria-label="Delete option"
  //                             >
  //                               <X size={16} />
  //                             </button>
  //                           </div>
  //                         ))}
  //                         <button
  //                           onClick={() => addOption(section.id, question.id)}
  //                           className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
  //                         >
  //                           <Plus size={16} /> Add Option
  //                         </button>
  //                       </div>
  //                     )}
  //                     {question.type === "File" && (
  //                       <div className="flex gap-2">
  //                         <input
  //                           type="file"
  //                           onChange={(e) => {
  //                             const file = e.target.files[0];
  //                             if (file) {
  //                               updateQuestionOrOption(
  //                                 section.id,
  //                                 question.id,
  //                                 file,
  //                                 null,
  //                                 "file"
  //                               );
  //                             }
  //                           }}
  //                           className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
  //                         />
  //                         {question.file && <span>{question.file.name}</span>}
  //                       </div>
  //                     )}

  //                     {question.type === "Multiple Choice Grid" && (
  //                       <div className="mt-6 space-y-6 p-4 border rounded-xl bg-gray-50">
  //                         <div className="grid grid-cols-2 gap-6">
  //                           {/* Rows Section */}
  //                           <div className="border rounded-lg p-4 bg-white shadow-sm">
  //                             <h3 className="text-lg font-semibold mb-4">
  //                               Rows
  //                             </h3>
  //                             {question.gridRows &&
  //                             Array.isArray(question.gridRows) ? (
  //                               <ul className="space-y-2">
  //                                 {question.gridRows.map((row) => (
  //                                   <li
  //                                     key={row.id}
  //                                     className="flex items-center gap-2"
  //                                   >
  //                                     <input
  //                                       type="text"
  //                                       value={row.text}
  //                                       onChange={(e) =>
  //                                         handleRowNameChange(
  //                                           question.id,
  //                                           row.id,
  //                                           e.target.value
  //                                         )
  //                                       }
  //                                       className="w-full border rounded px-2 py-1"
  //                                       placeholder="Row name"
  //                                     />
  //                                     <button
  //                                       onClick={() =>
  //                                         removeRowFromGrid(question.id, row.id)
  //                                       }
  //                                       className="text-red-500 hover:text-red-700"
  //                                       title="Remove Row"
  //                                     >
  //                                       ✕
  //                                     </button>
  //                                   </li>
  //                                 ))}
  //                               </ul>
  //                             ) : (
  //                               <p className="text-sm text-gray-500">
  //                                 No rows available
  //                               </p>
  //                             )}
  //                           </div>

  //                           {/* Columns Section */}
  //                           <div className="border rounded-lg p-4 bg-white shadow-sm">
  //                             <h3 className="text-lg font-semibold mb-4">
  //                               Columns
  //                             </h3>
  //                             {question.gridOptions &&
  //                             question.gridOptions.length > 0 ? (
  //                               <ul className="space-y-2">
  //                                 {question.gridOptions.map((option) => (
  //                                   <li
  //                                     key={option.id}
  //                                     className="flex items-center gap-2"
  //                                   >
  //                                     <input
  //                                       type="text"
  //                                       value={option.text}
  //                                       onChange={(e) =>
  //                                         handleOptionNameChange(
  //                                           question.id,
  //                                           option.id,
  //                                           e.target.value
  //                                         )
  //                                       }
  //                                       className="w-full border rounded px-2 py-1"
  //                                       placeholder="Column name"
  //                                     />
  //                                     <button
  //                                       onClick={() =>
  //                                         removeColumnFromGrid(
  //                                           question.id,
  //                                           option.id
  //                                         )
  //                                       }
  //                                       className="text-red-500 hover:text-red-700"
  //                                       title="Remove Column"
  //                                     >
  //                                       ✕
  //                                     </button>
  //                                   </li>
  //                                 ))}
  //                               </ul>
  //                             ) : (
  //                               <p className="text-sm text-gray-500">
  //                                 No options available
  //                               </p>
  //                             )}
  //                           </div>
  //                         </div>

  //                         {/* Action Buttons */}
  //                         <div className="flex gap-4 justify-end">
  //                           <button
  //                             onClick={() => addRowToGrid(question.id)}
  //                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
  //                           >
  //                             Add Row
  //                           </button>
  //                           <button
  //                             onClick={() => addColumnToGrid(question.id)}
  //                             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
  //                           >
  //                             Add Column
  //                           </button>
  //                         </div>
  //                       </div>
  //                     )}
  //                   </div>
  //                 </>
  //               ))}

  //               <div className="flex flex-col sm:flex-row gap-4 mt-6">
  //                 <button
  //                   type="button"
  //                   onClick={() => addQuestion(section.id)}
  //                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center gap-2 flex-1 sm:flex-none"
  //                 >
  //                   <Plus size={20} /> Add Question
  //                 </button>
  //                 <button
  //                   type="button"
  //                   onClick={() => deleteSection(section.id)}
  //                   className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center gap-2"
  //                 >
  //                   <X size={20} /> Delete Section
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       })}
  //       {settingsSectionId !== null && (
  //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  //           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
  //             <h2 className="text-lg font-bold mb-4">
  //               Set Visibility Condition
  //             </h2>
  //             <select
  //               className="w-full border p-2 rounded"
  //               onChange={(e) => setSelectedQuestionId(e.target.value)}
  //             >
  //               <option value="">Select a Question</option>
  //               {sections
  //                 .flatMap((sec) => sec.questions)
  //                 .map((q) => (
  //                   <option key={q.id} value={q.id}>
  //                     {q.text}
  //                   </option>
  //                 ))}
  //             </select>

  //             {selectedQuestionId && (
  //               <select
  //                 className="w-full border p-2 rounded mt-2"
  //                 onChange={(e) => setSelectedOptionId(e.target.value)}
  //               >
  //                 <option value="">Select an Option</option>
  //                 {sections
  //                   .flatMap((sec) => sec.questions)
  //                   .find((q) => q.id == selectedQuestionId)
  //                   ?.options.map((opt) => (
  //                     <option key={opt.id} value={opt.id}>
  //                       {opt.text}
  //                     </option>
  //                   ))}
  //               </select>
  //             )}

  //             <div className="flex justify-end gap-2 mt-4">
  //               <button
  //                 onClick={() => setSettingsSectionId(null)}
  //                 className="px-4 py-2 border rounded"
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 onClick={() =>
  //                   applyCondition(
  //                     settingsSectionId,
  //                     selectedQuestionId,
  //                     selectedOptionId
  //                   )
  //                 }
  //                 className="px-4 py-2 bg-blue-500 text-white rounded"
  //               >
  //                 Apply
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       <button
  //         onClick={handleSaveForm}
  //         className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-lg font-medium flex items-center justify-center gap-2 mb-8"
  //       >
  //         {loading ? "Saving..." : "Save Form"}
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 justify-center flex flex-row to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl ">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            {form?._id ? "Update Form" : "Create Your Form"}
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
                              deleteQuestion(section.id, question.id)
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
                    onClick={() => addQuestion(section.id)}
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

export default LibraryForm;


function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }
