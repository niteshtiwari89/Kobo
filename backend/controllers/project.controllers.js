import { LibraryForm } from "../models/library.model";


export const addToLibrary = async (req, res) => {
  try {
    const { projectId } = req.body;

    // Find the project by ID
    const project = await LibraryForm.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update the project to mark it as added to the library
    project.isInLibrary = true;
    await project.save();

    res.status(200).json({ message: "Project added to library successfully" });
  } catch (error) {
    console.error("Error adding project to library:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};