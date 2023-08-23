import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IDocument extends Document {
  referenceId: Schema.Types.ObjectId;
  pdf: string;
  analyzedData: string;
  mapping: any;
  name: string;
}

const templateSchema: Schema<IDocument> = new Schema(
  {
    referenceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    pdf: {
      type: String,
    },
    analyzedData: {
      type: String,
    },
    mapping: {
      type: Map,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TemplateModel: Model<IDocument> =
  mongoose.models.Template || model("Template", templateSchema);
