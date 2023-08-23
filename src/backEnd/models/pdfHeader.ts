import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IDocument extends Document {
  documentId: string;
  pdf: string;
}

const pdfHeaderSchema: Schema<IDocument> = new Schema(
  {
    documentId: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const PdfHeaderModel: Model<IDocument> =
  mongoose.models.PdfHeader || model("PdfHeader", pdfHeaderSchema);
