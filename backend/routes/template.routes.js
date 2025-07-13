import express from 'express';
import { createTemplate, getTemplates , updateTemplate , getTemplateById , deleteTemplate} from '../controllers/templateController.js';

const router = express.Router();

router.post('/', createTemplate);
router.get('/', getTemplates);
router.get('/:templateId', getTemplateById);
router.put('/:templateId', updateTemplate); 
router.delete('/:templateId', deleteTemplate);


export default router;