import Note from '../models/note.model.js';

// Get all notes for a project
export const getNotesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.query; // Optional user filter

    let query = { projectId };
    if (userId) {
      query.userId = userId;
    }

    const notes = await Note.find(query)
      .sort({ createdAt: -1 }) // Most recent first
      .lean();

    res.status(200).json({
      success: true,
      message: 'Notes retrieved successfully',
      data: notes,
      count: notes.length
    });
  } catch (error) {
    console.error('Error getting notes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve notes',
      error: error.message
    });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, content, category, userId } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const note = new Note({
      projectId,
      userId: userId || null,
      title: title.trim(),
      content: content.trim(),
      category: category || 'general'
    });

    const savedNote = await note.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: savedNote
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create note',
      error: error.message
    });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, category } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        title: title.trim(),
        content: content.trim(),
        category: category || 'general',
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: updatedNote
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update note',
      error: error.message
    });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: deletedNote
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete note',
      error: error.message
    });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId).lean();

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note retrieved successfully',
      data: note
    });
  } catch (error) {
    console.error('Error getting note:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve note',
      error: error.message
    });
  }
};
