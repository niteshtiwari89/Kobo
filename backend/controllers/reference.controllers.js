import Reference from '../models/reference.model.js';
import axios from 'axios';
import { JSDOM } from 'jsdom';

// Get all references for a project
export const getReferencesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.query;

    const query = { projectId };
    if (userId) {
      query.userId = userId;
    }

    const references = await Reference.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: references,
      message: 'References retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching references:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching references',
      error: error.message
    });
  }
};

// Create a new reference
export const createReference = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, url, description, tags, userId } = req.body;

    const reference = new Reference({
      projectId,
      userId,
      title,
      url,
      description,
      tags: Array.isArray(tags) ? tags : []
    });

    const savedReference = await reference.save();

    res.status(201).json({
      success: true,
      data: savedReference,
      message: 'Reference created successfully'
    });
  } catch (error) {
    console.error('Error creating reference:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating reference',
      error: error.message
    });
  }
};

// Update a reference
export const updateReference = async (req, res) => {
  try {
    const { referenceId } = req.params;
    const updateData = req.body;

    const reference = await Reference.findByIdAndUpdate(
      referenceId,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!reference) {
      return res.status(404).json({
        success: false,
        message: 'Reference not found'
      });
    }

    res.status(200).json({
      success: true,
      data: reference,
      message: 'Reference updated successfully'
    });
  } catch (error) {
    console.error('Error updating reference:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating reference',
      error: error.message
    });
  }
};

// Delete a reference
export const deleteReference = async (req, res) => {
  try {
    const { referenceId } = req.params;

    const reference = await Reference.findByIdAndDelete(referenceId);

    if (!reference) {
      return res.status(404).json({
        success: false,
        message: 'Reference not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reference deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting reference:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting reference',
      error: error.message
    });
  }
};

// Get a specific reference
export const getReferenceById = async (req, res) => {
  try {
    const { referenceId } = req.params;

    const reference = await Reference.findById(referenceId);

    if (!reference) {
      return res.status(404).json({
        success: false,
        message: 'Reference not found'
      });
    }

    res.status(200).json({
      success: true,
      data: reference,
      message: 'Reference retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching reference:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reference',
      error: error.message
    });
  }
};

// Fetch content from URL
export const fetchUrlContent = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL format'
      });
    }

    // Fetch the webpage
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Parse HTML content
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Extract metadata
    const title = document.querySelector('title')?.textContent?.trim() ||
                  document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                  document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
                  '';

    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') ||
                       document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                       document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
                       '';

    // Extract text content (first few paragraphs)
    const paragraphs = Array.from(document.querySelectorAll('p'))
      .map(p => p.textContent?.trim())
      .filter(text => text && text.length > 50)
      .slice(0, 5);

    const content = paragraphs.join('\n\n');

    res.status(200).json({
      success: true,
      data: {
        title,
        description,
        content: content.substring(0, 2000), // Limit content length
        url
      },
      message: 'URL content fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching URL content:', error);
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(400).json({
        success: false,
        message: 'Unable to reach the URL'
      });
    }

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'URL not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching URL content',
      error: error.message
    });
  }
};
