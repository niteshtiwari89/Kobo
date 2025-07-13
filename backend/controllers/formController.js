import { nanoid } from "nanoid";
import { Form, FormResponse } from "../models/form.model.js";
import {PermissionRequest} from "../models/permissionRequest.model.js"
import jwt from "jsonwebtoken";

// Create a new form
export const createForm = async (req, res) => {
  try {
    const { title, description, sections, userId } = req.body;
    console.log(title, description, sections);
    // const userId = req.userId;
    // console.log(userId)
    const link = nanoid(10); // Generate a unique link
    const form = new Form({ title, description, sections, link, userId });
    await form.save();
    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all forms
// export const getFormsReport = async (req, res) => {
//   try {
//     // const userId = req.userId;

//     const token = req.headers["authorization"]?.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret key here

//     // Extract the userId from the decoded token
//     const userId = decoded.userId;

//     console.log(userId);
//     const forms = await Form.find({ userId });

//     if (forms.length === 0) {
//       return res.status(404).json({ message: "No forms found for this user" });
//     }

//     const formsWithResponses = [];

//     for (const form of forms) {
//       // Fetch all responses that match the form's link
//       const responses = await FormResponse.find({ formLink: form.link }).select(
//         "responses createdAt"
//       );

//       // const allResponses = responses.map((response) => response.responses);
//       // // Attach the responses to the form object
//       // console.log("Responses", responses);
//        const allResponses = responses.map((response) => {
//         // Assuming you want to extract the `responses` field only

       
//         return {
//           _id: response._id,
//           responses: response.responses,
//           createdAt: response.createdAt,
//         };
//       });

//       // console.log("All Responses", allResponses.responses);
//       formsWithResponses.push({
//         ...form.toObject(),
//         allResponses, // Add the responses array to the form data
//       });
//     }

//     res.status(200).json(formsWithResponses);
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       // If the token expired, send a 401 Unauthorized response
//       return res.status(401).json({
//         message: "Token expired",
//         expiredAt: error.expiredAt, // Optionally, you can send the expiration time
//       });
//     }
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getForms = async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.userId;

//     const forms = await Form.find({ userId });

//     if (forms.length === 0) {
//       return res.status(404).json({ message: "No forms found for this user" });
//     }

//     const formsWithResponses = [];

//     for (const form of forms) {
//       const responses = await FormResponse.find({ formLink: form.link }).select("responses createdAt");

//       // Flat structure (existing)
//       const allResponses = responses.map((response) => ({
//         _id: response._id,
//         responses: response.responses,
//         createdAt: response.createdAt,
//       }));

//       // New: Grouped by patient + visit
//       const patientMap = {};

//       responses.forEach((record) => {
//         const resps = record.responses;

//         const email = resps.find(r => r.questionText.toLowerCase() === "email");
//         const phone = resps.find(r => r.questionText.toLowerCase().includes("phone"));
//         const patientKey = (email?.answer || phone?.answer || "").toLowerCase();

//         if (!patientKey) return;

//         const visitNumber = resps.find(r => r.questionText === "Visit Number")?.answer || 1;

//         const visitData = {
//           visitNumber,
//           date: record.createdAt,
//           formResponses: resps
//         };

//         if (!patientMap[patientKey]) {
//           patientMap[patientKey] = {
//             patient: patientKey,
//             visits: []
//           };
//         }

//         patientMap[patientKey].visits.push(visitData);
//       });

//       const groupedResponses = Object.values(patientMap);

//       // Final shape per form
//       formsWithResponses.push({
//         ...form.toObject(),
//         allResponses,          // original
//         groupedResponses       // new
//       });
//     }

//     res.status(200).json(formsWithResponses);
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired", expiredAt: error.expiredAt });
//     }
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getForms = async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.userId;

//     // Get forms owned by the current user
//     const forms = await Form.find({ userId });

//     const sharedForms = await Form.find({
//       "sharedWith.userId": userId,
//     }).select("-sharedWith");  // Exclude sharedWith data from the result, unless you need it

//     console.log(sharedForms)
//     if (forms.length === 0) {
//       return res.status(404).json({ message: "No forms found for this user" });
//     }

//     const formsWithResponses = [];

//     // Get forms shared with the current user

//     const allForms = [...forms, ...sharedForms];

//     // Process all forms (both owned and shared)
//     for (const form of allForms) {
//       const responses = await FormResponse.find({ formLink: form.link }).select("responses createdAt");

//       // Flat structure (existing)
//       const allResponses = responses.map((response) => ({
//         _id: response._id,
//         responses: response.responses,
//         createdAt: response.createdAt,
//       }));

//       // New: Grouped by patient + visit
//       const patientMap = {};

//       responses.forEach((record) => {
//         const resps = record.responses;

//         const email = resps.find(r => r.questionText.toLowerCase() === "email");
//         const phone = resps.find(r => r.questionText.toLowerCase().includes("phone"));
//         const patientKey = (email?.answer || phone?.answer || "").toLowerCase();

//         if (!patientKey) return;

//         const visitNumber = resps.find(r => r.questionText === "Visit Number")?.answer || 1;

//         const visitData = {
//           visitNumber,
//           date: record.createdAt,
//           formResponses: resps
//         };

//         if (!patientMap[patientKey]) {
//           patientMap[patientKey] = {
//             patient: patientKey,
//             visits: []
//           };
//         }

//         patientMap[patientKey].visits.push(visitData);
//       });

//       const groupedResponses = Object.values(patientMap);

//       // Final shape per form
//       formsWithResponses.push({
//         ...form.toObject(),
//         allResponses,          // original
//         groupedResponses       // new
//       });
//     }

//     res.status(200).json(formsWithResponses);
//   } catch (error) {
//     console.error(error);
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired", expiredAt: error.expiredAt });
//     }
//     res.status(500).json({ message: error.message });
//   }
// };

export const getForms = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Get forms owned by the current user
    const forms = await Form.find({ userId });

    // Get forms shared with the current user
    const sharedForms = await Form.find({
      "sharedWith.userId": userId,
    }).select("-sharedWith");  // Exclude sharedWith data from the result, unless you need it

    const formsWithResponses = [];

    // Combine both forms (owned and shared)
    const allForms = [...forms, ...sharedForms];

    // Process all forms (both owned and shared)
    for (const form of allForms) {
      const responses = await FormResponse.find({ formLink: form.link }).select("responses createdAt");

      // Flat structure (existing)
      const allResponses = responses.map((response) => ({
        _id: response._id,
        responses: response.responses,
        createdAt: response.createdAt,
      }));

      // New: Grouped by patient + visit
      const patientMap = {};

      responses.forEach((record) => {
        const resps = record.responses;

        const email = resps.find(r => r.questionText.toLowerCase() === "email");
        const phone = resps.find(r => r.questionText.toLowerCase().includes("phone"));
        
        // Handle both answer and answerText fields
        let patientKey = "";
        if (email) {
          patientKey = (email.answer || email.answerText || "").toLowerCase().trim();
        } else if (phone) {
          patientKey = (phone.answer || phone.answerText || "").toLowerCase().trim();
          // Clean up phone numbers for consistency (remove spaces, dashes, etc.)
          patientKey = patientKey.replace(/[\s\-\(\)]/g, '');
        }

        if (!patientKey) return;

        const visitNumberResponse = resps.find(r => r.questionText === "Visit Number");
        const visitNumber = visitNumberResponse?.answer || visitNumberResponse?.answerText || 1;

        const visitData = {
          visitNumber,
          date: record.createdAt,
          formResponses: resps
        };

        if (!patientMap[patientKey]) {
          patientMap[patientKey] = {
            patient: patientKey,
            visits: []
          };
        }

        patientMap[patientKey].visits.push(visitData);
      });

      // Sort visits by visit number for each patient
      const groupedResponses = Object.values(patientMap).map(patient => ({
        ...patient,
        visits: patient.visits.sort((a, b) => a.visitNumber - b.visitNumber)
      }));

      // Final shape per form
      formsWithResponses.push({
        ...form.toObject(),
        allResponses,          // original
        groupedResponses       // new
      });
    }

    res.status(200).json(formsWithResponses);
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", expiredAt: error.expiredAt });
    }
    res.status(500).json({ message: error.message });
  }
};


// export const getAllUserForms = async (req, res) => {
//     try {
//         // Fetch all forms from the database (no need for userId or token validation)
//         const forms = await Form.find();

//         // If no forms are found, return a 404 response
//         if (forms.length === 0) {
//             return res.status(404).json({ message: "No forms found" });
//         }

//         // Send the forms back as the response
//         res.status(200).json(forms);
//     } catch (error) {
//         console.error("Error fetching forms:", error);
//         res.status(500).json({ message: "An error occurred while fetching forms" });
//     }
// };

// Retrieve a form by link
export const getAllUserForms = async (req, res) => {
  try {
    // Fetch all forms from the database based on the userId
    const forms = await Form.find();

    if (forms.length === 0) {
      return res.status(404).json({ message: "No forms found" });
    }

    // Now, fetch responses for each form using the formLink
    const formsWithResponses = [];

    for (const form of forms) {
      // Fetch all responses that match the form's link
      const responses = await FormResponse.find({ formLink: form.link }).select(
        "responses"
      );

      const allResponses = responses.map((response) => response.responses);
      // Attach the responses to the form object
      formsWithResponses.push({
        ...form.toObject(),
        responses, // Add the responses array to the form data
      });
    }

    // Send the forms with their responses
    res.status(200).json(formsWithResponses);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "An error occurred while fetching forms" });
  }
};

export const getFormByLink = async (req, res) => {
  try {
    const { link } = req.params;
    const form = await Form.findOne({ link });
    if (!form) {
      return res.status(200).json([]);
    }
    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Submit form responses
// Inside your formController.js
// export const submitFormResponse = (req, res) => {
//     console.log("Incoming request data:", req.body); // Log incoming data

//     const responses = req.body.responses;

//     try {
//         const formattedResponses = responses.map((response) => {
//             // Check if questionText exists and has a 'text' property
//             const questionText = response.questionText || 'Unknown Question'; // Default to 'Unknown Question' if not found
//             const answer = response.answer;

//             // Handle case where answer might be an array or a string
//             const formattedAnswer = Array.isArray(answer) ? answer.join(', ') : answer;

//             return {
//                 questionId: response.questionId,
//                 questionText: questionText,
//                 answer: formattedAnswer,
//             };
//         });

//         // You can proceed to save the formattedResponses or return them in your response
//         console.log("Formatted responses:", formattedResponses);
//         res.status(200).json({ success: true, data: formattedResponses });

//     } catch (error) {
//         console.error("Error processing form response:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export const submitFormResponse = async (req, res) => {
//   const responses = req.body.responses;
//   const formLink = req.body.formLink;

//   console.log("Received responses:", responses); // Check what's being received by the server

//   try {
//     if (!responses || responses.some((r) => r === null)) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message: "Some responses are null or undefined",
//         });
//     }

//     const formattedResponses = responses.map((response) => {
//       const questionText = response.questionText || "Unknown Question";
//       const answer = response.answer;

//       // Ensure that 'answer' isn't null and is formatted correctly
//       if (answer === null || answer === undefined) {
//         return {
//           questionId: response.questionId,
//           questionText: questionText,
//           answer: "No answer provided",
//         };
//       }

//       const formattedAnswer = Array.isArray(answer)
//         ? answer.join(", ")
//         : answer;

//       return {
//         questionId: response.questionId,
//         questionText: questionText,
//         answer: formattedAnswer,
//       };
//     });

//     console.log("Formatted responses:", formattedResponses);

//     // Save the response data to the FormResponse collection
//     const formResponse = await FormResponse.create({
//       formLink,
//       responses: formattedResponses,
//     });

//     console.log("Form response saved successfully:", formResponse);

//     res.status(200).json({ success: true, data: formResponse });
//   } catch (error) {
//     console.error("Error processing form response:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import mongoose from "mongoose";
// import { FormResponse } from "../models/form.model.js";

export const submitFormResponse = async (req, res) => {
  const formLink = req.body.formLink;
  let responses;

  try {
    responses = JSON.parse(req.body.responses); // Parse multipart string
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid response format" });
  }

  try {
    if (!responses || responses.some((r) => r === null)) {
      return res.status(400).json({
        success: false,
        message: "Some responses are null or undefined",
      });
    }

    const uploadedFiles = req.files || [];

    const formattedResponses = responses.map((response) => {
      const questionId = response.questionId;
      const questionText = response.questionText || "Unknown Question";
      let answer = response.answer;

      if (response.type === "File") {
        const fileObj = uploadedFiles.find(
          (file) => file.fieldname === `file-${questionId}`
        );
        answer = fileObj ? fileObj.path : "No file uploaded";
      } else if (typeof answer === "object") {
        answer = JSON.stringify(answer);
      }

      return {
        questionId,
        questionText,
        answerText: answer?.toString() ?? "",  // Optional for easier queries
        answer,
      };
    });

    // === 🧠 Visit Tracking Logic ===

    // Try to identify the patient (based on Email or Phone)
    const emailResponse = formattedResponses.find(r =>
      r.questionText.toLowerCase() === "email"
    );

    const phoneResponse = formattedResponses.find(r =>
      r.questionText.toLowerCase().includes("phone")
    );

    // Handle both answer and answerText fields
    let patientKey = "";
    let isPhoneKey = false;
    if (emailResponse) {
      patientKey = (emailResponse.answer || emailResponse.answerText || "").toLowerCase().trim();
    } else if (phoneResponse) {
      patientKey = (phoneResponse.answer || phoneResponse.answerText || "").toLowerCase().trim();
      isPhoneKey = true;
      // Note: Don't clean phone here yet, we'll do normalization during comparison
    }

    console.log('Patient identification:', {
      emailResponse: emailResponse ? {
        answer: emailResponse.answer,
        answerText: emailResponse.answerText
      } : null,
      phoneResponse: phoneResponse ? {
        answer: phoneResponse.answer,
        answerText: phoneResponse.answerText
      } : null,
      patientKey,
      isPhoneKey,
      formLink
    });

    if (!patientKey) {
      return res.status(400).json({
        success: false,
        message: "Patient email or phone is required to track visits",
      });
    }

    // More accurate search for previous visits of this specific patient
    // First, let's get all form responses for this form to debug
    const allFormResponses = await FormResponse.find({ formLink });
    console.log('All form responses for this form:', allFormResponses.length);
    
    // Search for form responses where the email or phone field matches this patient
    // Handle both 'answer' and 'answerText' fields with a simpler approach
    let previousVisits = [];
    
    // Search through all responses to find matches
    for (const response of allFormResponses) {
      const hasMatchingPatient = response.responses.some(r => {
        // Check if this is an email or phone field
        const isEmailField = r.questionText.toLowerCase() === "email";
        const isPhoneField = r.questionText.toLowerCase().includes("phone");
        
        if (isEmailField || isPhoneField) {
          // Check both answer and answerText fields
          const answerValue = (r.answer || "").toString().toLowerCase().trim();
          const answerTextValue = (r.answerText || "").toString().toLowerCase().trim();
          
          // For phone numbers, compare both original and cleaned versions
          if (isPhoneField && isPhoneKey) {
            const cleanAnswerValue = answerValue.replace(/[\s\-\(\)]/g, '');
            const cleanAnswerTextValue = answerTextValue.replace(/[\s\-\(\)]/g, '');
            const cleanPatientKey = patientKey.replace(/[\s\-\(\)]/g, '');
            
            // Compare all combinations: original and clean versions
            return answerValue === patientKey || 
                   answerTextValue === patientKey ||
                   cleanAnswerValue === cleanPatientKey ||
                   cleanAnswerTextValue === cleanPatientKey ||
                   cleanAnswerValue === patientKey ||
                   cleanAnswerTextValue === patientKey;
          } else if (isEmailField && !isPhoneKey) {
            // For email, exact match (case-insensitive)
            return answerValue === patientKey || answerTextValue === patientKey;
          }
        }
        return false;
      });
      
      if (hasMatchingPatient) {
        previousVisits.push(response);
      }
    }

    const visitNumber = previousVisits.length + 1;

    console.log('Visit counting:', {
      patientKey,
      isPhoneKey,
      previousVisitsCount: previousVisits.length,
      newVisitNumber: visitNumber,
      previousVisitsDetails: previousVisits.map(v => ({
        id: v._id,
        createdAt: v.createdAt,
        emailResponse: v.responses.find(r => r.questionText.toLowerCase() === "email"),
        phoneResponse: v.responses.find(r => r.questionText.toLowerCase().includes("phone"))
      }))
    });

    // Add Visit Number as a response (optional)
    formattedResponses.push({
      questionId: new mongoose.Types.ObjectId(),
      questionText: "Visit Number",
      answerText: `Visit #${visitNumber}`,
      answer: visitNumber,
    });

    // === Save New Form Response ===
    const formResponse = await FormResponse.create({
      formLink,
      responses: formattedResponses,
    });

    res.status(200).json({
      success: true,
      message: `Visit #${visitNumber} recorded successfully.`,
      data: formResponse,
    });

  } catch (error) {
    console.error("Error processing form response:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// export const submitFormResponse = async (req, res) => {
//   const formLink = req.body.formLink;
//   let responses;

//   try {
//     responses = JSON.parse(req.body.responses); // It comes as a string in multipart
//   } catch (error) {
//     return res.status(400).json({ success: false, message: "Invalid response format" });
//   }

//   try {
//     if (!responses || responses.some((r) => r === null)) {
//       return res.status(400).json({
//         success: false,
//         message: "Some responses are null or undefined",
//       });
//     }

//     const uploadedFiles = req.files || [];

//     const formattedResponses = responses.map((response) => {
//       const questionId = response.questionId;
//       const questionText = response.questionText || "Unknown Question";
//       let answer = response.answer;

//       // If it's a file question, map the file
//       if (response.type === "File") {
//         const fileObj = uploadedFiles.find(
//           (file) => file.fieldname === `file-${questionId}`
//         );
//         if (fileObj) {
//           answer = fileObj.path; // Cloudinary URL
//         } else {
//           answer = "No file uploaded";
//         }
//       } else if (typeof answer === "object") {
//         answer = JSON.stringify(answer);
//       }

//       return {
//         questionId,
//         questionText,
//         answer,
//       };
//     });

//     console.log("Formatted responses:", formattedResponses);

//     const formResponse = await FormResponse.create({
//       formLink,
//       responses: formattedResponses,
//     });

//     console.log("Form response saved successfully:", formResponse);

//     res.status(200).json({ success: true, data: formResponse });
//   } catch (error) {
//     console.error("Error processing form response:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// Update a form
export const updateForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const updatedData = req.body;
    const form = await Form.findByIdAndUpdate(formId, updatedData, {
      new: true,
    });
    res.status(200).json({ message: "Form updated successfully", form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a form
export const deleteForm = async (req, res) => {
  try {
    const { formId } = req.params;
    await Form.findByIdAndDelete(formId);
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create Form from Template
export const createFormFromTemplate = async (req, res) => {
  try {
    const { templateId, formData } = req.body;

    // Find the template by ID
    const template = await FormTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Create a new form based on the template
    const newForm = new Form({
      ...template.toObject(),
      ...formData,
    });

    await newForm.save();

    res
      .status(201)
      .json({
        message: "Form created from template successfully",
        form: newForm,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating form from template",
        error: error.message,
      });
  }
};

export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("FOrmIs", id);
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a form by its ID
export const updateFormById = async (req, res) => {
  try {
    // const { formId } = req.params;  // Get formId from URL parameters
    const { updatedData, formId } = req.body; // Get updated data from the request body

    // Find the form by ID and update it
    const form = await Form.findByIdAndUpdate(formId, updatedData, {
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
export const deleteMultipleForms = async (req, res) => {
  try {
    // Extract the formIds from the request body
    const { formsIds } = req.body;
    console.log(req.body);
    console.log(formsIds);

    // Validate that formIds is an array and contains valid ObjectIds
    if (!Array.isArray(formsIds) || formsIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of form IDs" });
    }

    // Check if all form IDs are valid ObjectIds

    // Proceed to delete the forms with the valid form IDs
    const result = await Form.deleteMany({ _id: { $in: formsIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No forms found to delete" });
    }

    res
      .status(200)
      .json({ message: `${result.deletedCount} form(s) deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const shareProject = async (req, res) => {
  try {
    const { formId } = req.params;
    const { userId, permissions } = req.body; // userId of the person you're sharing with and their permissions

    const form = await Form.findById(formId);
    if (!form || form.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to share this form.' });
    }

    // Check if the form is already shared with this user
    const alreadyShared = form.sharedWith.some((user) => user.userId.toString() === userId);
    if (alreadyShared) {
      return res.status(400).json({ message: 'Form already shared with this user' });
    }

    // Add to the shared list
    form.sharedWith.push({ userId, permissions });
    await form.save();

    res.status(200).json({ message: 'Form shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sharing the form' });
  }
};


export const requestPermission = async (req, res) => {
  console.log("Trigger Request")
  try {
    const { formId } = req.params;
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requesterUserId = decoded.userId;
    // const requesterUserId = req.user;
    // console.log("User",userId)

    const existingRequest = await PermissionRequest.findOne({
      formId,
      requesterUserId,
      status: 'pending',
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Permission request already pending.' });
    }

    const permissionRequest = new PermissionRequest({
      formId,
      requesterUserId,
      status: 'pending',
    });

    await permissionRequest.save();
    res.status(200).json({ message: 'Permission request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error requesting permission' });
  }
}

export const getAllRequestAccessForm = async (req,res) =>{
  try{
    const {formId} = req.params;
    const form = await PermissionRequest.find({formId:formId}).populate('requesterUserId');

    if (!form){
      return res.status(500).json({message:"No Requested Form Found"})
    }

    res.status(200).json(form)
  }
  catch{
    res.status(500).json({ message: 'Error Finding requested form' });
  }
}

export const getAllRequestedForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId);
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const requesterUserId = decoded.userId;

    console.log(form.userId)
    if (!form || form.userId.toString() !== requesterUserId) {
      return res.status(403).json({ message: 'You do not have permission to view these requests.' });
    }

    const permissionRequests = await PermissionRequest.find({ formId, status: 'pending' }).populate('requesterUserId');
    res.status(200).json(permissionRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching permission requests' });
  }
}

export const givePermission = async (req, res) => {
  try {
    const { formId, requestId } = req.params;
    const { action } = req.body; // action can be 'approve' or 'deny'

    console.log("Trigger Permision",action)
     const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const form = await Form.findById(formId);
    if (!form || form.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You do not have permission to approve/deny requests.' });
    }

    const permissionRequest = await PermissionRequest.findById(requestId);
    if (!permissionRequest || permissionRequest.formId.toString() !== formId) {
      return res.status(404).json({ message: 'Permission request not found.' });
    }

    // Update the permission request status
    if (action === 'approve') {
      permissionRequest.status = 'approved';
      form.sharedWith.push({ userId: permissionRequest.requesterUserId, permissions: 'view' });
      await form.save();
    } else if (action === 'deny') {
      permissionRequest.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid action.' });
    }

    permissionRequest.resolvedAt = Date.now();
    await permissionRequest.save();

    res.status(200).json({ message: `Permission request ${action}d successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing the permission request' });
  }
}