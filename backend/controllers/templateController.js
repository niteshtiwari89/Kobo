import Template from '../models/template.model.js';
import { v4 as uuidv4 } from 'uuid';

export const createTemplate = async (req, res) => {
    try {
        console.info("Request body:", req.body); // Log the request body
        const { name, description, sections } = req.body;
        const newTemplate = new Template({ id: uuidv4(), name, description, sections });
        await newTemplate.save();
        res.status(201).json({ message: 'Template created successfully', template: newTemplate });
    } catch (error) {
        console.error("Error creating template:", error); // Log the error
        res.status(500).json({ message: 'Error creating template', error: error.message });
    }
};

export const getTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching templates', error: error.message });
    }
};

export const updateTemplate = async (req, res) => {
    const { templateId } = req.params; // Get the template ID from the URL
    const { name, description, sections } = req.body; // Get the data from the request body

    try {
        const updatedTemplate = await Template.findOneAndUpdate(
            { _id: templateId }, // Find the template by its ID
            { name, description, sections }, // Update the fields
            { new: true } // Return the updated template
        );

        if (!updatedTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.status(200).json({ message: 'Template updated successfully', template: updatedTemplate });
    } catch (error) {
        res.status(500).json({ message: 'Error updating template', error: error.message });
    }
};

export const getTemplateById = async (req, res) => {
    const { templateId } = req.params; // Extract templateId from the request params
    
    console.log(templateId)
    try {
      const template = await Template.findById(templateId); // Find template by ID in the database
  console.log(template)
      if (!template) {
        return res.status(404).json({ message: 'Template not found' });
      }
  
      res.status(200).json(template); // Send the found template in the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error. Could not fetch template.' });
    }
  };

  export const deleteTemplate = async (req, res) => {
    const { templateId } = req.params; // Get the template ID from the URL

    try {
        const deletedTemplate = await Template.findByIdAndDelete(templateId); // Delete the template by its ID

        if (!deletedTemplate) {
            return res.status(404).json({ message: 'Template not found' });
        }

        res.status(200).json({ message: 'Template deleted successfully', template: deletedTemplate });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting template', error: error.message });
    }
};
