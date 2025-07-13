import express from 'express';
import { createForm, getForms, updateForm, getFormById, updateFormById,deleteForm ,deleteMultipleForms, getAllUserForms, updateFormVisibility } from '../controllers/libraryControllers.js';

const router = express.Router();

router.post('/create', createForm);
router.get('/all', getForms);
router.get('allPublicLibrary')
router.get('/allUser', getAllUserForms);
router.get('/:id', getFormById);
router.put('/update/:formId', updateForm);
router.delete('/delete/:formId', deleteForm);
router.delete('/delete/many', deleteMultipleForms);
router.put('/:id',updateFormById)
router.put('/:formId/visibility',updateFormVisibility)


export default router;

