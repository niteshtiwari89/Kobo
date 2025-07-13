import express from 'express';
import {
  getNotesByProject,
  createNote,
  updateNote,
  deleteNote,
  getNoteById
} from '../controllers/notes.controllers.js';

const router = express.Router();

// Routes for notes
// GET /api/projects/:projectId/notes - Get all notes for a project
router.get('/projects/:projectId/notes', getNotesByProject);

// POST /api/projects/:projectId/notes - Create a new note for a project
router.post('/projects/:projectId/notes', createNote);

// GET /api/notes/:noteId - Get a specific note
router.get('/notes/:noteId', getNoteById);

// PUT /api/notes/:noteId - Update a specific note
router.put('/notes/:noteId', updateNote);

// DELETE /api/notes/:noteId - Delete a specific note
router.delete('/notes/:noteId', deleteNote);

export default router;
