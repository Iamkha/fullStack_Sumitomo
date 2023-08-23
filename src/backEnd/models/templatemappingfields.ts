import mongoose, { Document, Schema, Model, model } from "mongoose";

export const analyzedStatus = {
  PROCESSING: "processing",
  ERROR: "error",
  SUCCESS: "success",
};

export interface IDocument extends Document {
  value: string;
  label?: string;
}

const documentSchema: Schema<IDocument> = new Schema({
  value: {
    type: String,
  },
  label: {
    type: Number,
  },
});

export const KvTemplatemappingfields: Model<IDocument> =
  mongoose.models.kv_templatemappingfieldss ||
  model("kv_templatemappingfields", documentSchema);
