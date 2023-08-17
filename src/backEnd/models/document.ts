import mongoose, { Document, Schema, Model, model } from "mongoose";

export const analyzedStatus = {
  PROCESSING: "processing",
  ERROR: "error",
  SUCCESS: "success",
};

export interface IDocument extends Document {
  analyzedStatus: string;
  errorMessage?: string;
  totalSubDocs?: number;
  user?: string;
  fileName?: string;
}

const documentSchema: Schema<IDocument> = new Schema(
  {
    analyzedStatus: {
      type: String,
      required: true,
      enum: [
        analyzedStatus.PROCESSING,
        analyzedStatus.ERROR,
        analyzedStatus.SUCCESS,
      ],
      default: analyzedStatus.PROCESSING,
    },
    errorMessage: {
      type: String,
    },
    totalSubDocs: {
      type: Number,
    },
    user: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const DocumentModel: Model<IDocument> =
  mongoose.models.Document || model("Document", documentSchema);
