import express from 'express';
import {
  getReferencesByProject,
  createReference,
  updateReference,
  deleteReference,
  getReferenceById,
  fetchUrlContent
} from '../controllers/reference.controllers.js';

const router = express.Router();

// Reference routes
router.get('/projects/:projectId/references', getReferencesByProject);
router.post('/projects/:projectId/references', createReference);
router.get('/references/:referenceId', getReferenceById);
router.put('/references/:referenceId', updateReference);
router.delete('/references/:referenceId', deleteReference);

// URL content fetching
router.post('/fetch-url-content', fetchUrlContent);

export default router;
