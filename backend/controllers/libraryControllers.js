import { LibraryForm } from "../models/library.model.js";
import jwt from "jsonwebtoken";

// Create a new form
export const createForm = async (req, res) => {
  try {
    const { title, description, sections, userId, visibility = "private", sharedWith = []} = req.body;
    console.log(title, description, sections);

    // Create and save the form without any link generation
    const form = new LibraryForm({ title, description, sections, userId, visibility, sharedWith });
    await form.save();
    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all forms for a user
// export const getForms = async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret key here

//     const { userId, id } = decoded;
    
//     let userIdentifier = id || userId;
    

//     const forms = await LibraryForm.find({ userId: userIdentifier  });

//     if (forms.length === 0) {
//       return res.status(404).json({ message: "No forms found for this user" });
//     }

//     res.status(200).json(forms); // No responses included anymore
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         message: "Token expired",
//         expiredAt: error.expiredAt,
//       });
//     }
//     res.status(500).json({ message: error.message });
//   }
// };

// Retrieve all forms for a user
// export const getForms = async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret key here

//     const { userId, id } = decoded;
    
//     let userIdentifier = id || userId;
    
//     // Get the user's forms
//     const forms = await LibraryForm.find({ userId: userIdentifier });

//     // Filter forms based on visibility
//     const filteredForms = forms.filter(form => {
//       if (form.visibility === "public") {
//         return true; // Public form, always accessible
//       }
//       if (form.visibility === "shared" && form.sharedWith.includes(userIdentifier)) {
//         return true; // Shared form, accessible if user is in sharedWith
//       }
//       return form.userId.toString() === userIdentifier.toString(); // Private form, only accessible by the creator
//     });

//     if (filteredForms.length === 0) {
//       return res.status(404).json({ message: "No accessible forms found for this user" });
//     }

//     res.status(200).json(filteredForms);
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         message: "Token expired",
//         expiredAt: error.expiredAt,
//       });
//     }
//     res.status(500).json({ message: error.message });
//   }
// };

export const getForms = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, id } = decoded;
    const userIdentifier = id || userId;

    // Find forms where:
    // - user is the creator
    // - or form is public
    // - or user is in sharedWith
    const forms = await LibraryForm.find({
      $or: [
        { userId: userIdentifier },
        { visibility: "public" },
        { visibility: "shared", sharedWith: userIdentifier },
      ],
    }).populate("sharedWith", "name email"); // optional: populate shared users' names/emails

    if (forms.length === 0) {
      return res.status(404).json({ message: "No accessible forms found for this user" });
    }

    res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        expiredAt: error.expiredAt,
      });
    }
    res.status(500).json({ message: error.message });
  }
};


// Retrieve all forms for all users
// export const getAllUserForms = async (req, res) => {
//   try {
//     const forms = await LibraryForm.find();

//     if (forms.length === 0) {
//       return res.status(404).json({ message: "No forms found" });
//     }

//     res.status(200).json(forms); // No responses included anymore
//   } catch (error) {
//     console.error("Error fetching forms:", error);
//     res.status(500).json({ message: "An error occurred while fetching forms" });
//   }
// };

// Retrieve all forms for all users (handle public and shared visibility)
export const getAllUserForms = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, id } = decoded;
    let userIdentifier = id || userId;

    // Fetch all forms
    const forms = await LibraryForm.find();

    // Filter based on visibility (public and shared)
    const accessibleForms = forms.filter(form => {
      if (form.visibility === "public") {
        return true; // Public form is always visible to anyone
      }
      if (form.visibility === "shared" && form.sharedWith.includes(userIdentifier)) {
        return true; // Shared form is visible if the user is in sharedWith
      }
      return false; // Private forms should not be visible to other users
    });

    if (accessibleForms.length === 0) {
      return res.status(404).json({ message: "No accessible forms found" });
    }

    res.status(200).json(accessibleForms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "An error occurred while fetching forms" });
  }
};


// Get a form by ID
export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await LibraryForm.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form); // Return form data without responses
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a form
// export const updateForm = async (req, res) => {
//   try {
//     const { formId } = req.params;
//     const updatedData = req.body;

//     const form = await LibraryForm.findByIdAndUpdate(formId, updatedData, {
//       new: true,
//     });

//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     res.status(200).json({ message: "Form updated successfully", form });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Update a form
export const updateForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const updatedData = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret key here
    const { userId, id } = decoded;

    const userIdentifier = userId || id;

    const form = await LibraryForm.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
     if (form.userId.toString() !== userIdentifier.toString()) {
      return res.status(403).json({ message: "Only the form owner can update the form" });
    }
    // Check if user is the creator or has permission (visibility and shared)
     if (updatedData.userId && updatedData.userId !== form.userId.toString()) {
      return res.status(400).json({ message: "You cannot change the form owner" });
    }

    // Update form with the new data
    Object.assign(form, updatedData);
    await form.save();

    res.status(200).json({ message: "Form updated successfully", form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Delete a form
// export const deleteForm = async (req, res) => {
//   try {
//     const { formId } = req.params;
//     const form = await LibraryForm.findByIdAndDelete(formId);

//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     res.status(200).json({ message: "Form deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Delete a form
export const deleteForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret key here
    const { userId, id } = decoded;

    const form = await LibraryForm.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Ensure the user is the creator or has permission to delete
    if (form.userId.toString() !== userId.toString()) {
      if (form.visibility === "private") {
        return res.status(403).json({ message: "You don't have permission to delete this form" });
      }
      if (form.visibility === "shared" && !form.sharedWith.includes(userId)) {
        return res.status(403).json({ message: "You don't have permission to delete this form" });
      }
    }

    await form.remove();
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Update a form by ID
export const updateFormById = async (req, res) => {
  try {
    const { formId } = req.body; // Form ID from request body
    const updatedData = req.body.updatedData; // Updated data for form

    const form = await LibraryForm.findByIdAndUpdate(formId, updatedData, {
      new: true,
    });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form updated successfully", form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete multiple forms
// export const deleteMultipleForms = async (req, res) => {
//   try {
//     const { formsIds } = req.body;

//     if (!Array.isArray(formsIds) || formsIds.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Please provide an array of form IDs" });
//     }

//     const result = await LibraryForm.deleteMany({ _id: { $in: formsIds } });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "No forms found to delete" });
//     }

//     res
//       .status(200)
//       .json({ message: `${result.deletedCount} form(s) deleted successfully` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// Delete multiple forms
export const deleteMultipleForms = async (req, res) => {
  try {
    const { formsIds } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, id } = decoded;

    if (!Array.isArray(formsIds) || formsIds.length === 0) {
      return res.status(400).json({ message: "Please provide an array of form IDs" });
    }

    const forms = await LibraryForm.find({ _id: { $in: formsIds } });

    const formsToDelete = forms.filter(form => {
      if (form.userId.toString() === userId.toString()) {
        return true; // Creator can delete their own forms
      }
      if (form.visibility === "shared" && form.sharedWith.includes(userId)) {
        return true; // User can delete shared forms
      }
      return false; // Private forms not accessible to other users
    });

    if (formsToDelete.length === 0) {
      return res.status(404).json({ message: "No accessible forms found to delete" });
    }

    const result = await LibraryForm.deleteMany({ _id: { $in: formsToDelete.map(form => form._id) } });
    res.status(200).json({ message: `${result.deletedCount} form(s) deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// Update the visibility of a form (private/public/shared)
// export const updateFormVisibility = async (req, res) => {
//   try {
//     const { formId } = req.params; // Get formId from URL
//     const { visibility , sharedWith} = req.body; // New visibility ('private', 'public', or 'shared')
//     const token = req.headers["authorization"]?.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { userId, id } = decoded;

//     const userIdentifier = id || userId;

//     // Check if form exists
//     const form = await LibraryForm.findById(formId);
//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     // Only the form creator can update the visibility
//     if (form.userId.toString() !== userIdentifier.toString()) {
//       return res.status(403).json({ message: "You don't have permission to update visibility for this form" });
//     }

//     // Validate the visibility value
//     if (!["private", "public", "shared"].includes(visibility)) {
//       return res.status(400).json({ message: "Invalid visibility value. It must be 'private', 'public', or 'shared'" });
//     }

//     // Update visibility of the form
//     const updatedForm = await LibraryForm.findByIdAndUpdate(
//       formId,
//       { visibility },
//       { new: true }
//     );

//     res.status(200).json({ message: "Form visibility updated successfully", form: updatedForm });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };
  

export const updateFormVisibility = async (req, res) => {
  try {
    const { formId } = req.params;
    const { visibility, sharedWith } = req.body; // Expect sharedWith array only when visibility is "shared"
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, id } = decoded;
    const userIdentifier = id || userId;

    // Check if form exists
    const form = await LibraryForm.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Only the form creator can update the visibility
    if (form.userId.toString() !== userIdentifier.toString()) {
      return res.status(403).json({ message: "You don't have permission to update visibility for this form" });
    }

    // Validate visibility value
    if (!["private", "public", "shared"].includes(visibility)) {
      return res.status(400).json({ message: "Invalid visibility value. It must be 'private', 'public', or 'shared'" });
    }

    // Prepare update data
    const updateData = { visibility };

    // If visibility is shared, include sharedWith users
    if (visibility === "shared") {
      if (!Array.isArray(sharedWith)) {
        return res.status(400).json({ message: "'sharedWith' must be an array of user IDs when visibility is 'shared'" });
      }
      updateData.sharedWith = sharedWith;
    } else {
      // Clear sharedWith if visibility is not 'shared'
      updateData.sharedWith = [];
    }

    const updatedForm = await LibraryForm.findByIdAndUpdate(formId, updateData, { new: true });

    res.status(200).json({ message: "Form visibility updated successfully", form: updatedForm });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
