import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Pencil, 
  Trash2, 
  Eye, 
  PlusCircle, 
  Layout, 
  Search,
  X,
  ChevronRight
} from "lucide-react";
import { createTemplate, getTemplates, deleteTemplateById } from "../api";

export default function Templates() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  const initialProjectState = {
    name: "",
    description: "",
    sections: [
      {
        id: Date.now(),
        title: "Default Section",
        questions: [
          {
            id: Date.now(),
            text: "Default Question",
            type: "Short Answer",
            options: [],
            isRequired:true
          },
        ],
      },
    ],
  };
  const [newProject, setNewProject] = useState(initialProjectState);

  // Fetch templates from the backend
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templates = await getTemplates();
        setProjects(templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleCreateProject = async () => {
    // Validate that the new project has at least one section with questions
    if (newProject.name && newProject.sections.length > 0) {
      // Save the new project to the backend
      console.log(newProject.sections);
      try {
        const response = await createTemplate(newProject);
        
        // Check if the response contains a valid ID for the created template
        if (response && response.template) {
          console.log(response.template._id);
          
          // Update the local state with the newly created project
          setProjects([...projects, response.template]);
          
          // Close the modal or reset form
          setOpen(false);
          setNewProject(initialProjectState); // Reset the form fields
  
          // Navigate to the create form page for the new template using the new project's ID
          navigate(`/create-template-form/${response.template.name}/${response.template._id}/${response.template.description}`);
        } else {
          console.error("Error: Created project does not contain a valid ID.");
        }
      } catch (error) {
        console.error("Error creating project:", error);
      }
    } else {
      // If no sections, show an error message or a warning
      alert("Please add at least one section with questions before creating the template.");
    }
  };
  

  const openDeleteModal = (templateId) => {
    setDeleteId(templateId);
    setIsDeleting(true);
  };

  const handleDeleteTemplate = async () => {
    try {
      const response = await deleteTemplateById(deleteId); // API call to delete template
      console.log(response.message); // Log success message
  
      // Update the state by filtering out the deleted template
      setProjects((prevProjects) =>
        prevProjects.filter((template) => template._id !== deleteId)
      );
  
      // Close the delete modal
      setIsDeleting(false);
      setDeleteId(null);
      
      // Optionally, display a success message or update UI accordingly
      // alert("Template deleted successfully.");
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Error deleting template.");
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleOpenModal = () => {
    setNewProject(initialProjectState);
    setOpen(true);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                Templates
              </h1>
              <p className="text-gray-600 mt-2">
                Build, customize, and manage your workflow templates
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="pl-10 pr-4 py-2.5 w-full md:w-64 bg-white rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                  </button>
                )}
              </div>
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Create Template</span>
              </button>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 && !searchQuery && (
          <div 
            className="border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center p-16 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
            onClick={handleOpenModal}
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <PlusCircle className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Create Your First Template
            </p>
            <p className="text-gray-500 text-center max-w-md">
              Start building your workflow templates to streamline your process
            </p>
          </div>
        )}

        {searchQuery && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No templates found</h3>
            <p className="text-gray-500">
              {`We couldn't find any templates matching "${searchQuery}"`}
            </p>
          </div>
        )}

        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Project template cards */}
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <Layout className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {project.description ||
                          "A customizable template for your workflow"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {project.sections?.length || 1} {project.sections?.length === 1 ? 'section' : 'sections'}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(project._id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/create-template-form/${project.name}/${project._id}/${project.description}`
                            );
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/preview-form/${project._id}`
                            );
                          }}
                          className="p-1.5 text-gray-400 hover:text-indigo-500 rounded-full hover:bg-indigo-50 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => navigate(`/create-template-form/${project.name}/${project._id}/${project.description}`)}
                  className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-600">View Template</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for creating a new project */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div 
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Create a New Template
              </h2>
              <button 
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Template Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="projectName"
                  type="text"
                  placeholder="Enter template name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of this template"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Create Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
            <div className="text-center mb-5">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Delete Template?
              </h2>
              <p className="text-gray-600">
                Are you really want to delete this project? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setIsDeleting(false);
                  setDeleteId(null);
                }}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTemplate}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}