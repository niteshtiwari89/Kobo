import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Plus, X, ChevronDown, CircleX, Image as ImageIcon, Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateTemplate, createTemplate, getTemplateById, getAllLibraryForms, uploadImage, deleteImage } from "../api";

const CreateTemplateFormDragDrop = () => {
  const { projectName, projectId, projectDescription } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedForm, setSelectedForm] = useState(null);
  const { project } = location.state || {};
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState(project ? project.title : "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [existingForms, setExistingForms] = useState([]);
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
            questions: [
              {
                id: Date.now(),
                text: "Default Question",
                type: "Short Answer",
                image: null,
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

  // Drag and drop handlers
  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle section reordering
    if (type === 'section') {
      const newSections = Array.from(sections);
      const [removed] = newSections.splice(source.index, 1);
      newSections.splice(destination.index, 0, removed);
      setSections(newSections);
      return;
    }

    // Handle question reordering within a section
    if (type === 'question') {
      const sectionId = source.droppableId.replace('questions-', '');
      const newSections = sections.map(section => {
        if (section.id.toString() === sectionId) {
          const newQuestions = Array.from(section.questions);
          const [removed] = newQuestions.splice(source.index, 1);
          newQuestions.splice(destination.index, 0, removed);
          return { ...section, questions: newQuestions };
        }
        return section;
      });
      setSections(newSections);
    }
  };

  // Other functions would be here (updateQuestionOrOption, addSection, etc.)
  // For brevity, I'm showing just the drag-and-drop part

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
              {projectId ? "Update Form" : "Create Your Form"}
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

          {/* Droppable area for sections */}
          <Droppable droppableId="sections" type="section">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sections.map((section, sectionIndex) => (
                  <Draggable
                    key={section._id || section.id}
                    draggableId={`section-${section._id || section.id}`}
                    index={sectionIndex}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`mb-8 bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${
                          snapshot.isDragging ? 'shadow-2xl rotate-2' : ''
                        }`}
                      >
                        {/* Section Header with Drag Handle */}
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                              title="Drag to reorder section"
                            >
                              <GripVertical size={20} />
                            </div>
                            <input
                              type="text"
                              placeholder="Section Title"
                              value={section.title}
                              onChange={(e) => {
                                setSections(
                                  sections.map((s) =>
                                    s.id === section.id
                                      ? { ...s, title: e.target.value }
                                      : s
                                  )
                                );
                              }}
                              className="flex-1 text-xl md:text-2xl font-semibold px-4 py-2 border-b border-gray-200 focus:outline-none focus:border-blue-500 transition-all duration-200 bg-transparent"
                            />
                          </div>
                        </div>

                        {/* Droppable area for questions within this section */}
                        <Droppable droppableId={`questions-${section.id}`} type="question">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-4"
                            >
                              {section.questions.map((question, questionIndex) => (
                                <Draggable
                                  key={question._id || question.id}
                                  draggableId={`question-${question._id || question.id}`}
                                  index={questionIndex}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className={`bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                                        snapshot.isDragging ? 'shadow-lg bg-blue-50 rotate-1' : ''
                                      }`}
                                    >
                                      {/* Question Header with Drag Handle */}
                                      <div className="flex items-start gap-3 mb-4">
                                        <div
                                          {...provided.dragHandleProps}
                                          className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 transition-colors rounded hover:bg-gray-200 mt-1"
                                          title="Drag to reorder question"
                                        >
                                          <GripVertical size={16} />
                                        </div>
                                        <div className="flex-1">
                                          <input
                                            type="text"
                                            placeholder="Enter Question"
                                            value={question.text}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                          />
                                        </div>
                                        <div className="flex gap-2">
                                          <select
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                            value={question.type}
                                          >
                                            <option>Short Answer</option>
                                            <option>Long Answer</option>
                                            <option>Multiple Choice</option>
                                            <option>Checkbox</option>
                                          </select>
                                          <button
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                            title="Delete Question"
                                          >
                                            <X size={16} />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>

                        {/* Section Actions */}
                        <div className="flex gap-4 mt-6">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus size={16} /> Add Question
                          </button>
                          <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                            <X size={16} /> Delete Section
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Add Section Button */}
          <button className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium">
            <Plus size={20} /> Add New Section
          </button>

          {/* Save Button */}
          <button className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-lg font-medium flex items-center justify-center gap-2 mb-8">
            {loading ? "Saving..." : "Save Form"}
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default CreateTemplateFormDragDrop;
