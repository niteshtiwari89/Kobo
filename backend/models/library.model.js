import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "Short Answer",
        "Long Answer",
        "Multiple Choice",
        "Checkbox",
        "Decimal",
        "Number",
        "File",
        "Multiple Choice Grid",
      ],
    },
    image: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      }
    },
    options: [
      {
        id: Number,
        text: String,
      },
    ],
    gridOptions: [
      {
        id: Number,
        text: String,
      },
    ],
    gridRows: [
      {
        id: Number,
        text: String,
      },
    ],
    isRequired: {
      type: Boolean,
      required: true,
    },
  },
  { _id: true }
);

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
    },
    image: {
      url: {
        type: String,
        
      },
      publicId: {
        type: String,
        default: null,
      }
    },
    questions: [questionSchema],
    visibilityCondition: { questionId: String, optionId: String },
  },
  { _id: true }
);

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    sections: [sectionSchema],
    visibility: {
      type: String,
      enum: ["private", "public", "shared"], // private, public, or shared
      default: "private", // Default visibility to private
    },
    sharedWith: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // List of users who can access the form if it's shared
    }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     shareRequests: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        requestedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["pending", "approved", "denied"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

export const LibraryForm = mongoose.model("LibraryForm", formSchema);
