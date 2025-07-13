import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    formLink: {
      type: String,
      required: true,
    },
    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        questionText: {
          type: String,
          required: true,
        },
        answerText: {
          type: String,
          required: false,
        },
        answer: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

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
        "Multiple Choice Grid"
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
        default: null,
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
    link: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     sharedWith: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        permissions: {
          type: String,
          enum: ["view", "edit", "admin", "view-responses"], // Add a permission for viewing responses
          required: true,
        },
        sharedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", formSchema);
export const FormResponse = mongoose.model("FormResponse", responseSchema);
