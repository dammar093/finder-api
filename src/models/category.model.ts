import mongoose, { Schema, Document } from "mongoose";

export interface CategoryInterface extends Document {
  name: string;
  isActive?: boolean;
}

const categorySchema = new Schema<CategoryInterface>({
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Category = mongoose.model<CategoryInterface>("Category", categorySchema);
export default Category;