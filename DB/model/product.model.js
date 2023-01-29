import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      min: [2, "Product name minimum length 2 char"],
      max: [20, "Product name max length 2 char"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "description is required"],
      min: [2, "description minimum length 2 char"],
      max: [200, "description max length 2 char"],
    },
    images: {
      type: [String],
      required: [true, "Product images are required"],
    },
    publicImageIds: [String],
    stock: {
      type: Number,
      default: 0,
      required: [true, "stock is required"],
    },
    endStock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    finalPrice: Number,
    discount: {
      type: Number,
    },
    colors: {
      type: [String],
    },
    sizes: {
      type: String,
      enum: ["sm", "md", "lg", "xl", "free"],
      default: "free",
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "categoryId is required"],
    },
    subCategoryId: {
      type: Types.ObjectId,
      ref: "subCategory",
      required: [true, "subCategoryId is required"],
    },
    brandId: {
      type: Types.ObjectId,
      ref: "brand",
      required: [true, "brandId is required"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Created By is required"],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    soldItems: Number,
    totalItems: Number,
  },
  {
    timestamps: true,
  }
);

const productModel = model("Product", productSchema);
export default productModel;
