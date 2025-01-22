import mongoose, { Schema, Document, ObjectId } from "mongoose";

// property interface
export interface PropertyInerface extends Document {
  title: string;
  description: string;
  services: string[];
  price: number;
  location: string;
  longitude: number;
  latitude: number;
  images: string[];
  status: boolean;
  duration: number;
  duration_type: string;
  category: ObjectId;
  user: ObjectId;
}

// property schema
const propertySchem = new Schema<PropertyInerface>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },

  duration: {
    type: Number,
    required: true
  },
  duration_type: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Property = mongoose.model<PropertyInerface>("Property", propertySchem);
export default Property;

