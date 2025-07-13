import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Plus, Edit3, Trash2, Save, X, Calendar, FileText, ArrowLeft } from 'lucide-react'
import PropTypes from 'prop-types'
import { getNotesByProject, createNote, updateNote, deleteNote } from '../api'

const KeepNotes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Get project data from location state
  const project = location.state?.project
  console.log('Project data:', project)
  const [notes, setNotes] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general'
  })

  // Load notes from API on component mount
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await getNotesByProject(project._id)
        if (response.success) {
          setNotes(response.data)
        } else {
          setError('Failed to load notes')
        }
      } catch (err) {
        console.error('Error loading notes:', err)
        setError('Failed to load notes. Please try again.')
        // Fallback to localStorage if API fails
        loadNotesFromLocalStorage()
      } finally {
        setLoading(false)
      }
    }

    const loadNotesFromLocalStorage = () => {
      try {
        const storedNotes = localStorage.getItem(`notes_project_${project._id}`)
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes))
        }
      } catch (err) {
        console.error('Error loading notes from localStorage:', err)
      }
    }

    if (project?._id) {
      loadNotes()
    }
  }, [project?._id])

  const saveToLocalStorage = (updatedNotes) => {
    try {
      localStorage.setItem(`notes_project_${project.id}`, JSON.stringify(updatedNotes))
    } catch (err) {
      console.error('Error saving to localStorage:', err)
    }
  }

  // If no project data, show error
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">No Project Data</h1>
          <p className="text-gray-600 mb-4">Please navigate to this page from a project.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const handleCreateNote = async () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      try {
        const response = await createNote(project._id, newNote)
        if (response.success) {
          const updatedNotes = [response.data, ...notes]
          setNotes(updatedNotes)
          saveToLocalStorage(updatedNotes)
          setNewNote({ title: '', content: '', category: 'general' })
          setIsCreating(false)
        } else {
          setError('Failed to create note')
        }
      } catch (err) {
        console.error('Error creating note:', err)
        setError('Failed to create note. Please try again.')
        // Fallback to local creation
        const note = {
          _id: Date.now().toString(),
          ...newNote,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          projectId: project._id
        }
        const updatedNotes = [note, ...notes]
        setNotes(updatedNotes)
        saveToLocalStorage(updatedNotes)
        setNewNote({ title: '', content: '', category: 'general' })
        setIsCreating(false)
      }
    }
  }

  const handleEditNote = async (noteId, updatedNote) => {
    try {
      const response = await updateNote(noteId, updatedNote)
      if (response.success) {
        const updatedNotes = notes.map(note => 
          note._id === noteId ? response.data : note
        )
        setNotes(updatedNotes)
        saveToLocalStorage(updatedNotes)
      } else {
        setError('Failed to update note')
      }
    } catch (err) {
      console.error('Error updating note:', err)
      setError('Failed to update note. Please try again.')
      // Fallback to local update
      const updatedNotes = notes.map(note => 
        note._id === noteId 
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
      setNotes(updatedNotes)
      saveToLocalStorage(updatedNotes)
    }
    setEditingNoteId(null)
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await deleteNote(noteId)
        if (response.success) {
          const updatedNotes = notes.filter(note => note._id !== noteId)
          setNotes(updatedNotes)
          saveToLocalStorage(updatedNotes)
        } else {
          setError('Failed to delete note')
        }
      } catch (err) {
        console.error('Error deleting note:', err)
        setError('Failed to delete note. Please try again.')
        // Fallback to local deletion
        const updatedNotes = notes.filter(note => note._id !== noteId)
        setNotes(updatedNotes)
        saveToLocalStorage(updatedNotes)
      }
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800 border-blue-200',
      important: 'bg-red-100 text-red-800 border-red-200',
      ideas: 'bg-green-100 text-green-800 border-green-200',
      todos: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      questions: 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[category] || colors.general
  }

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'important', label: 'Important' },
    { value: 'ideas', label: 'Ideas' },
    { value: 'todos', label: 'To-Do' },
    { value: 'questions', label: 'Questions' }
  ]

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
        
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Note
        </button>
      </div>

      {/* Project Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Form Title:</span>
            <p className="font-medium">{project.title || 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500">Total Responses:</span>
            <p className="font-medium">{project.allResponses?.length || 0}</p>
          </div>
          {/* <div>
            <span className="text-gray-500">Project ID:</span>
            <p className="font-medium">{project._id || 'N/A'}</p>
          </div> */}
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
            <p className="text-gray-600">Loading notes...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Create Note Modal */}
          {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Note</h2>
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
                  Title
                </label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter note title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newNote.category}
                  onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your note here..."
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                disabled={!newNote.title.trim() || !newNote.content.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save size={16} />
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No notes yet</h3>
            <p className="text-gray-400">Create your first note to get started</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note._id || note.id}
              note={note}
              isEditing={editingNoteId === (note._id || note.id)}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onStartEdit={() => setEditingNoteId(note._id || note.id)}
              onCancelEdit={() => setEditingNoteId(null)}
              getCategoryColor={getCategoryColor}
              categories={categories}
            />
          ))
        )}
      </div>
        </>
      )}
    </div>
  )
}

// Note Card Component
const NoteCard = ({ 
  note, 
  isEditing, 
  onEdit, 
  onDelete, 
  onStartEdit, 
  onCancelEdit, 
  getCategoryColor,
  categories 
}) => {
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
    category: note.category
  })

  const handleSave = () => {
    if (editData.title.trim() && editData.content.trim()) {
      onEdit(note._id || note.id, editData)
    }
  }

  const handleCancel = () => {
    setEditData({
      title: note.title,
      content: note.content,
      category: note.category
    })
    onCancelEdit()
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-2 py-1 text-lg font-semibold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            value={editData.category}
            onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          
          <textarea
            value={editData.content}
            onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
            rows="4"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              <X size={14} />
            </button>
            <button
              onClick={handleSave}
              disabled={!editData.title.trim() || !editData.content.trim()}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>{note.title}</h3>
        <div className="flex gap-1">
          <button
            onClick={onStartEdit}
            className="p-1 text-gray-400 hover:text-blue-600"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(note._id || note.id)}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(note.category)}`}>
          {categories.find(cat => cat.value === note.category)?.label || note.category}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical'
      }}>{note.content}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          {new Date(note.createdAt).toLocaleDateString()}
        </div>
        {note.updatedAt !== note.createdAt && (
          <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  )
}

// PropTypes for NoteCard component
NoteCard.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStartEdit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  getCategoryColor: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired
}

export default KeepNotes
