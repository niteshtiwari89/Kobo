import { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { createForm } from "../api";
import {useNavigate} from 'react-router-dom'

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const navigate = useNavigate();
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      title: "Untitled Section",
      questions: [
        {
          id: Date.now(),
          questionText: "",
          type: "Short Answer",
          options: [],
          required:true
        },
      ],
    },
  ]);
  const [formLink, setFormLink] = useState("");

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        title: "Untitled Section",
        questions: [
          {
            id: Date.now(),
            questionText: "",
            type: "Short Answer",
            options: [],
            required:false
          },
        ],
      },
    ]);
  };

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
                id: Date.now(),
                questionText: "",
                type: "Short Answer",
                options: [],
                required:false
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

  const updateOptionText = (sectionId, questionId, optionId, text) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  options: question.options.map((option) => {
                    if (option.id === optionId) {
                      return { ...option, text };
                    }
                    return option;
                  }),
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

  const updateQuestionText = (sectionId, questionId, text) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return { ...question, questionText: text };
              }
              return question;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: formTitle,
      description: formDescription,
      sections: sections.map((section) => ({
        title: section.title,
        questions: section.questions.map((question) => ({
          text: question.questionText,
          type: question.type,
          options: question.options.map((option) => option.text),
          required:question.required
        })),
      })),
    };
    const response = await createForm(formData);
    setFormLink(response.form.link);
    navigate("/admin-panel")
    console.log(response);
  };


  const handleRequiredToggle = (sectionId, questionId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  required: !question.required,  // Toggle the required status
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


  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/form/${formLink}`);
    alert("Form link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
              Create Your Form
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
                required
              />

              <textarea
                placeholder="Enter Form Description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows="3"
                required
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addSection}
            className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={20} /> Add New Section
          </button>

          {sections.map((section) => (
            <div
              key={section.id}
              className="mb-8 bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl"
            >
              <input
                type="text"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) => {
                  setSections(
                    sections.map((s) =>
                      s.id === section.id ? { ...s, title: e.target.value } : s
                    )
                  );
                }}
                className="w-full text-xl md:text-2xl font-semibold mb-6 px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-200 bg-transparent"
                required
              />

              <div className="space-y-6">
                {section.questions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-gray-50 rounded-lg p-6 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Enter Question"
                        value={question.questionText}
                        onChange={(e) =>
                          updateQuestionText(
                            section.id,
                            question.id,
                            e.target.value
                          )
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        required
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
                            required
                          >
                            <option>Short Answer</option>
                            <option>Long Answer</option>
                            <option>Multiple Choice</option>
                            <option>Checkbox</option>
                            <option>Decimal</option>
                            <option>Number</option>
                            <option>File</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <ChevronDown size={20} />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRequiredToggle(section.id, question.id)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none"
                        >
                          {question.required ? "Mark as Optional" : "Mark as Required"}
                        </button>
                        <button
                          type="button"
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
                              disabled
                              className="w-4 h-4"
                            />
                            <input
                              type="text"
                              placeholder="Enter option"
                              value={option.text}
                              onChange={(e) =>
                                updateOptionText(
                                  section.id,
                                  question.id,
                                  option.id,
                                  e.target.value
                                )
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                deleteOption(section.id, question.id, option.id)
                              }
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                              aria-label="Delete option"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(section.id, question.id)}
                          className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                        >
                          <Plus size={16} /> Add Option
                        </button>
                      </div>
                    )}

                    {!["Multiple Choice", "Checkbox"].includes(
                      question.type
                    ) && (
                      <input
                        type="text"
                        placeholder="Your answer"
                        className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                        disabled
                      />
                    )}
                  </div>
                ))}
              </div>

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
                  onClick={() => deleteSection(section.id)}
                  className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X size={20} /> Delete Section
                </button>
              </div>
            </div>
          ))}

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-lg font-medium flex items-center justify-center gap-2 mb-8"
          >
            Submit
          </button>
        </form>
        {formLink && (
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Form created successfully! Copy the link below to share:
            </p>
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                value={`${window.location.origin}/form/${formLink}`}
                readOnly
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full max-w-lg"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
