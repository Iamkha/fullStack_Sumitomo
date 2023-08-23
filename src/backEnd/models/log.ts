import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IDocument extends Document {
  name: string;
  error: string;
  type: string;
}

const logSchema: Schema<IDocument> = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const LogModel: Model<IDocument> =
  mongoose.models.Log || model("Log", logSchema);
