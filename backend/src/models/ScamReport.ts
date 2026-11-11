
import mongoose, { Document, Schema } from "mongoose";

export type ScamReportType =
  | "message"
  | "url"
  | "email"
  | "phone"
  | "job"
  | "marketplace"
  | "other";

export interface IScamReport extends Document {
  type: ScamReportType;
  suspiciousContent: string;
  description: string;
  reporterName?: string;
  reporterEmail?: string;
  status: "pending" | "reviewed" | "confirmed" | "dismissed";
  createdAt: Date;
  updatedAt: Date;
}

const scamReportSchema = new Schema<IScamReport>(
  {
    type: {
      type: String,
      enum: [
        "message",
        "url",
        "email",
        "phone",
        "job",
        "marketplace",
        "other",
      ],
      required: true,
    },
    suspiciousContent: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 10000,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    reporterName: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    reporterEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "confirmed", "dismissed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const ScamReport = mongoose.model<IScamReport>(
  "ScamReport",
  scamReportSchema
);
