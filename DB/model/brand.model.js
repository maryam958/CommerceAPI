import { Schema, model, Types } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      min: [2, "Brand name minimum length 2 char"],
      max: [20, "Brand name max length 2 char"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Brand image is required"],
    },
    public_id: String,
    slug: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Created By is required"],
    },
  },
  {
    timestamps: true,
  }
);

const brandModel = model("brand", brandSchema);
export default brandModel;
