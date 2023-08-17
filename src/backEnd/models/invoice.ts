import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IDocument extends Document {
  documentId: string;
}

const invoiceSchema: Schema<IDocument> = new Schema(
  {
    documentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const InvoiceModel: Model<IDocument> =
  mongoose.models.Invoice || model("Invoice", invoiceSchema);
