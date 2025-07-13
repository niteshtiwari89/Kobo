import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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
      ],
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

const templateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: uuidv4, // Generate a unique ID using uuid
    },
    name: {
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
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

export default Template;
