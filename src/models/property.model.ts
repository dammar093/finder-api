import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { UserInterface } from "./user.model";

// property interface
interface PropertyInerface extends Document {
  title: string;
  description: string;
  services?: string[];
  price: number;
  location: string;
  longitude: number;
  latitude: number;
  user: ObjectId
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Property = mongoose.model<PropertyInerface>("Property", propertySchem);
export default Property;

