import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IDocument extends Document {
  name: string;
  address: string;
  phone: string;
  searchName: string;
  no: string;
}

const companySchema: Schema<IDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    searchName: {
      type: String,
    },
    no: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const CompanyModel: Model<IDocument> =
  mongoose.models.Company || model("Company", companySchema);
