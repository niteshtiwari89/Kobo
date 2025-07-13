import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Calendar,
  ArrowLeft,
  ExternalLink,
  Link,
  Globe,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import PropTypes from "prop-types";
import {
  getReferencesByProject,
  createReference,
  updateReference,
  deleteReference,
  fetchUrlContent,
} from "../api";

// Utility function to get domain from URL
const getDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

const ReferenceNotes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get project data from location state
  const project = location.state?.project;

  const [references, setReferences] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingReferenceId, setEditingReferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchingContent, setFetchingContent] = useState(false);
  const [newReference, setNewReference] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
  });

  // Load references from API on component mount
  useEffect(() => {
    const loadReferences = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getReferencesByProject(project._id);
        if (response?.success) {
          setReferences(response.data);
        } else {
          // Fallback to localStorage if API fails
          loadReferencesFromLocalStorage();
        }
      } catch (err) {
        console.error("Error loading references:", err);
        setError("Failed to load references. Loading from local storage.");
        loadReferencesFromLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    const loadReferencesFromLocalStorage = () => {
      try {
        const storedReferences = localStorage.getItem(
          `references_project_${project._id}`
        );
        if (storedReferences) {
          setReferences(JSON.parse(storedReferences));
        }
      } catch (err) {
        console.error("Error loading references from localStorage:", err);
      }
    };

    if (project?._id) {
      loadReferences();
    }
  }, [project?._id]);

  const saveToLocalStorage = (updatedReferences) => {
    try {
      localStorage.setItem(
        `references_project_${project._id}`,
        JSON.stringify(updatedReferences)
      );
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  };

  // If no project data, show error
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            No Project Data
          </h1>
          <p className="text-gray-600 mb-4">
            Please navigate to this page from a project.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const fetchContentFromUrl = async (url) => {
    setFetchingContent(true);
    try {
      console.log("Fetching content for URL:", url);
      const response = await fetchUrlContent(url);
      console.log("Fetch response:", response);

      if (response?.success) {
        return {
          title: response.data.title || "",
          description:
            response.data.description ||
            response.data.content?.substring(0, 500) ||
            "",
          content: response.data.content || "",
        };
      } else {
        console.warn("Failed to fetch URL content:", response);
        // Return basic preview data even if fetching fails
        return {
          title: "",
          description: "Content preview not available",
          content: `Preview for: ${url}\n\nContent could not be fetched automatically. Click "Visit" to view the original page.`,
        };
      }
    } catch (err) {
      console.error("Error fetching URL content:", err);
      // Return basic preview data on error
      return {
        title: "",
        description: "Content preview not available",
        content: `Preview for: ${url}\n\nContent could not be fetched automatically. Click "Visit" to view the original page.`,
      };
    } finally {
      setFetchingContent(false);
    }
  };

  const handleUrlChange = async (url) => {
    setNewReference((prev) => ({ ...prev, url }));

    if (url && isValidUrl(url)) {
      const content = await fetchContentFromUrl(url);
      if (content) {
        setNewReference((prev) => ({
          ...prev,
          title: prev.title || content.title,
          description: prev.description || content.description,
          content: content.content,
        }));
      }
    } else if (url) {
      // For invalid URLs, still set basic content
      setNewReference((prev) => ({
        ...prev,
        content: `Preview for: ${url}\n\nPlease enter a valid URL starting with http:// or https://`,
      }));
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleCreateReference = async () => {
    if (newReference.title.trim() && newReference.url.trim()) {
      try {
        const referenceData = {
          ...newReference,
          tags: newReference.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          projectId: project._id,
          // Ensure content is always available for preview
          content:
            newReference.content ||
            `Reference link: ${newReference.url}\n\nTitle: ${
              newReference.title
            }\n\nDescription: ${
              newReference.description || "No description provided"
            }`,
        };

        const response = await createReference(project._id, referenceData);
        if (response?.success) {
          const updatedReferences = [response.data, ...references];
          setReferences(updatedReferences);
          saveToLocalStorage(updatedReferences);
          setNewReference({ title: "", url: "", description: "", tags: "" });
          setIsCreating(false);
        } else {
          setError("Failed to create reference");
          // Fallback to local creation
          const reference = {
            _id: Date.now().toString(),
            ...referenceData,
          };
          const updatedReferences = [reference, ...references];
          setReferences(updatedReferences);
          saveToLocalStorage(updatedReferences);
          setNewReference({ title: "", url: "", description: "", tags: "" });
          setIsCreating(false);
        }
      } catch (err) {
        console.error("Error creating reference:", err);
        setError("Failed to create reference. Saving locally.");
        // Fallback to local creation
        const reference = {
          _id: Date.now().toString(),
          ...newReference,
          tags: newReference.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          projectId: project._id,
          content:
            newReference.content ||
            `Reference link: ${newReference.url}\n\nTitle: ${
              newReference.title
            }\n\nDescription: ${
              newReference.description || "No description provided"
            }`,
        };
        const updatedReferences = [reference, ...references];
        setReferences(updatedReferences);
        saveToLocalStorage(updatedReferences);
        setNewReference({ title: "", url: "", description: "", tags: "" });
        setIsCreating(false);
      }
    }
  };

  const handleEditReference = async (referenceId, updatedReference) => {
    try {
      const response = await updateReference(referenceId, updatedReference);
      if (response?.success) {
        const updatedReferences = references.map((ref) =>
          ref._id === referenceId ? response.data : ref
        );
        setReferences(updatedReferences);
        saveToLocalStorage(updatedReferences);
      } else {
        setError("Failed to update reference");
        // Fallback to local update
        const updatedReferences = references.map((ref) =>
          ref._id === referenceId
            ? {
                ...ref,
                ...updatedReference,
                updatedAt: new Date().toISOString(),
              }
            : ref
        );
        setReferences(updatedReferences);
        saveToLocalStorage(updatedReferences);
      }
    } catch (err) {
      console.error("Error updating reference:", err);
      setError("Failed to update reference. Updating locally.");
      // Fallback to local update
      const updatedReferences = references.map((ref) =>
        ref._id === referenceId
          ? { ...ref, ...updatedReference, updatedAt: new Date().toISOString() }
          : ref
      );
      setReferences(updatedReferences);
      saveToLocalStorage(updatedReferences);
    }
    setEditingReferenceId(null);
  };

  const handleDeleteReference = async (referenceId) => {
    if (window.confirm("Are you sure you want to delete this reference?")) {
      try {
        const response = await deleteReference(referenceId);
        if (response?.success) {
          const updatedReferences = references.filter(
            (ref) => ref._id !== referenceId
          );
          setReferences(updatedReferences);
          saveToLocalStorage(updatedReferences);
        } else {
          setError("Failed to delete reference");
          // Fallback to local deletion
          const updatedReferences = references.filter(
            (ref) => ref._id !== referenceId
          );
          setReferences(updatedReferences);
          saveToLocalStorage(updatedReferences);
        }
      } catch (err) {
        console.error("Error deleting reference:", err);
        setError("Failed to delete reference. Deleting locally.");
        // Fallback to local deletion
        const updatedReferences = references.filter(
          (ref) => ref._id !== referenceId
        );
        setReferences(updatedReferences);
        saveToLocalStorage(updatedReferences);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-8">
          <div>
          <h1 className="text-3xl font-bold text-gray-800">Reference Links</h1>
          <p className="text-gray-600 mt-1">
            <BookOpen size={16} className="inline mr-1" />
            {project.formTitle || project.title || "Untitled Project"}
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Reference
        </button>
      </div>

      {/* Project Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Project Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Form Title:</span>
            <p className="font-medium">{project.title || "N/A"}</p>
          </div>
          <div>
            <span className="text-gray-500">Total Responses:</span>
            <p className="font-medium">{project.allResponses?.length || 0}</p>
          </div>
          <div>
            <span className="text-gray-500">Project ID:</span>
            <p className="font-medium">{project._id || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <X size={16} className="text-red-600" />
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading references...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Create Reference Modal */}
          {isCreating && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Add New Reference</h2>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL *
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={newReference.url}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Link
                        size={16}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      {fetchingContent && (
                        <div className="absolute right-3 top-3">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newReference.title}
                      onChange={(e) =>
                        setNewReference((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Reference title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newReference.description}
                      onChange={(e) =>
                        setNewReference((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description of the reference..."
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newReference.tags}
                      onChange={(e) =>
                        setNewReference((prev) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                      placeholder="research, documentation, tutorial"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Show web-like link preview */}
                  {(newReference.content || newReference.url) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link Preview
                      </label>
                      <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                        {/* Preview Header with Domain */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                              <Globe size={10} className="text-white" />
                            </div>
                            <span className="text-sm text-gray-700 font-medium">
                              {getDomain(newReference.url)}
                            </span>
                            <ExternalLink
                              size={12}
                              className="text-gray-400 ml-auto"
                            />
                          </div>
                        </div>

                        {/* Preview Content */}
                        <div className="p-5">
                          <h4 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 leading-tight">
                            {newReference.title || "Loading content..."}
                          </h4>

                          {newReference.description && (
                            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                              {newReference.description}
                            </p>
                          )}

                          {newReference.content && (
                            <div className="bg-gray-50 border-l-4 border-blue-400 p-4 rounded-r">
                              <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed">
                                {newReference.content.substring(0, 280)}
                                {newReference.content.length > 280 && "..."}
                              </p>
                            </div>
                          )}

                          {/* Meta info */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                              External Reference
                            </span>
                            <span className="text-xs text-gray-400">
                              Click to view full content
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show fetching indicator */}
                  {fetchingContent && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span>Fetching content from URL...</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateReference}
                    disabled={
                      !newReference.title.trim() ||
                      !newReference.url.trim() ||
                      fetchingContent
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Reference
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* References Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {references.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen
                  size={32}
                  className="mx-auto text-gray-400 mb-4 sm:hidden"
                />
                <BookOpen
                  size={48}
                  className="mx-auto text-gray-400 mb-4 hidden sm:block"
                />
                <h3 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
                  No references yet
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Add your first reference link to get started
                </p>
              </div>
            ) : (
              references.map((reference) => (
                <ReferenceCard
                  key={reference._id || reference.id}
                  reference={reference}
                  isEditing={
                    editingReferenceId === (reference._id || reference.id)
                  }
                  onEdit={handleEditReference}
                  onDelete={handleDeleteReference}
                  onStartEdit={() =>
                    setEditingReferenceId(reference._id || reference.id)
                  }
                  onCancelEdit={() => setEditingReferenceId(null)}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Reference Card Component
const ReferenceCard = ({
  reference,
  isEditing,
  onEdit,
  onDelete,
  onStartEdit,
  onCancelEdit,
}) => {
  const [editData, setEditData] = useState({
    title: reference.title,
    url: reference.url,
    description: reference.description,
    tags: Array.isArray(reference.tags) ? reference.tags.join(", ") : "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleSave = () => {
    if (editData.title.trim() && editData.url.trim()) {
      onEdit(reference._id || reference.id, {
        ...editData,
        tags: editData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      });
    }
  };

  const handleCancel = () => {
    setEditData({
      title: reference.title,
      url: reference.url,
      description: reference.description,
      tags: Array.isArray(reference.tags) ? reference.tags.join(", ") : "",
    });
    onCancelEdit();
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              value={editData.url}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, url: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              value={editData.tags}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, tags: e.target.value }))
              }
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleSave}
              disabled={!editData.title.trim() || !editData.url.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3
            className="text-lg font-semibold text-gray-800 mb-2 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {reference.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Globe size={14} />
            <span>{getDomain(reference.url)}</span>
          </div>
        </div>
        <div className="flex gap-1 ml-4">
          {/* Always show preview button - even for basic content */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
            title={showPreview ? "Hide preview" : "Show preview"}
          >
            <Eye size={16} />
          </button>
          <button
            onClick={onStartEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(reference._id || reference.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {reference.description && (
        <p
          className="text-gray-600 text-sm mb-4 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {reference.description}
        </p>
      )}

      {/* Web-like Content Preview section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Link Preview</h4>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showPreview ? (
              <>
                Collapse <ChevronUp size={14} />
              </>
            ) : (
              <>
                Expand <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>

        <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
          {/* Preview Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                <Globe size={8} className="text-white" />
              </div>
              <span className="text-xs text-gray-700 font-medium">
                {getDomain(reference.url)}
              </span>
              <ExternalLink size={10} className="text-gray-400 ml-auto" />
            </div>
          </div>

          {/* Preview Content */}
          <div
            className={`p-4 transition-all duration-300 ${
              showPreview ? "max-h-none" : "max-h-24 overflow-hidden"
            }`}
          >
            {showPreview ? (
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-900 text-base leading-tight">
                  {reference.title}
                </h5>
                {reference.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {reference.description}
                  </p>
                )}
                <div className="bg-gray-50 border-l-4 border-blue-400 p-3 rounded-r">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {reference.content ||
                      `This reference links to: ${reference.url}\n\nTitle: ${
                        reference.title
                      }\n\nDescription: ${
                        reference.description || "No description available"
                      }\n\nClick "Visit" to view the original content.`}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    External Reference
                  </span>
                  <span className="text-xs text-gray-400">
                    Click to view full content
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">
                  {reference.title}
                </h5>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {reference.description || reference.content
                    ? reference.description ||
                      reference.content.substring(0, 120) + "..."
                    : `Preview of ${reference.title} - Click to see more details about this reference link.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {reference.tags && reference.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {reference.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar size={12} />
          {new Date(reference.createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-3">
          {/* Always show preview button */}
          <button
            onClick={() => {
              setIframeLoading(true);
              setShowFullPreview(true);
            }}
            className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
          >
            Preview <Eye size={14} />
          </button>
          <a
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            Visit <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Enhanced Full Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full h-full max-w-7xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden flex flex-col">
            {/* Modal Header - Web-like */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4 sm:p-6 flex-shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Globe size={12} className="text-white sm:hidden" />
                      <Globe size={16} className="text-white hidden sm:block" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm text-gray-600 font-medium truncate block">
                        {getDomain(reference.url)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Added on{" "}
                        {new Date(reference.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight truncate">
                    {reference.title}
                  </h2>
                </div>
                <button
                  onClick={() => setShowFullPreview(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 sm:p-2 rounded-full hover:bg-gray-200 transition-colors ml-2 flex-shrink-0"
                >
                  <X size={20} className="sm:hidden" />
                  <X size={24} className="hidden sm:block" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col flex-1 min-h-0">
              {/* Description section (if needed) */}
              {reference.description && (
                <div className="mx-3 sm:mx-6 mt-3 sm:mt-4 mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl flex-shrink-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2 uppercase tracking-wide">
                    Description
                  </h3>
                  <p className="text-blue-800 leading-relaxed text-xs sm:text-sm">
                    {reference.description}
                  </p>
                </div>
              )}

              {/* Content Preview - Full height iframe */}
              <div className="flex-1 mx-3 sm:mx-6 mb-3 sm:mb-6 min-h-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pb-2 border-b border-gray-200">
                  Live Website Preview
                </h3>
                <div className="bg-gray-50 border border-gray-200 sm:border-2 rounded-lg sm:rounded-xl overflow-hidden h-full shadow-inner relative min-h-[250px] sm:min-h-[400px]">
                  {/* Loading indicator */}
                  {iframeLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Loading website...
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="h-full">
                    <iframe
                      src={reference.url}
                      title="Website Preview"
                      className="w-full h-full border-0 rounded-lg sm:rounded-xl browser-iframe"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      loading="lazy"
                      onLoad={() => setIframeLoading(false)}
                      onError={() => setIframeLoading(false)}
                    />
                  </div>
                </div>
              </div>

              {/* Reference Tags */}
              {reference.tags && reference.tags.length > 0 && (
                <div className="mx-3 sm:mx-6 mb-3 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {reference.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-3 sm:px-6 py-3 sm:py-4 flex-shrink-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                  <Calendar size={14} className="sm:hidden" />
                  <Calendar size={16} className="hidden sm:block" />
                  <span className="truncate">
                    Reference added on{" "}
                    {new Date(reference.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowFullPreview(false)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    Close
                  </button>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm"
                  >
                    <ExternalLink size={14} className="sm:hidden" />
                    <ExternalLink size={16} className="hidden sm:block" />
                    <span>Open Original</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes for ReferenceCard component
ReferenceCard.propTypes = {
  reference: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.array,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStartEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};

export default ReferenceNotes;
