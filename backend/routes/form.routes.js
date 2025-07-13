import express from 'express';
import { createForm, getForms, updateForm,getFormByLink, getFormById,submitFormResponse, createFormFromTemplate, updateFormById, deleteMultipleForms, getAllUserForms, shareProject, requestPermission, getAllRequestedForm, givePermission, getAllRequestAccessForm } from '../controllers/formController.js';
import cloudinary from '../config/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'relearn',
    },
})

const upload = multer({ storage });


router.post('/create', createForm);
router.get('/all', getForms);
// router.get('/allReport', getFormsReport);
router.get('/allUser', getAllUserForms);
router.get('/:id', getFormById);
router.put('/update/:formId', updateForm);
// router.delete('/delete/:formId', deleteForm);
router.delete('/delete/many', deleteMultipleForms);
router.get('/link/:link', getFormByLink);
router.post('/submit', upload.any(),submitFormResponse);
router.put('/:id',updateFormById)

router.post('/create-from-template', createFormFromTemplate);

//ShareProject 

router.post('/:formId/share', shareProject)
router.post('/form/:formId/request-permission',requestPermission)
router.get('/form/:formId/permission-requests', getAllRequestedForm)
router.get('/form/:formId/all-permission-requests', getAllRequestAccessForm)
router.put('/form/:formId/permission-request/:requestId', givePermission)

export default router;

