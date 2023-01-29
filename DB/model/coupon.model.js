import { Schema, model, Types } from "mongoose";

const CouponSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Coupon name is required"],
      min: [2, "Coupon name minimum length 2 char"],
      max: [20, "Coupon name max length 2 char"],
      trim: true,
      unique: true,
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

    deletedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    usedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    amount: {
      type: Number,
      min: [1, "min discount 1%"],
      max: [100, "max discount 100%"],
    },

    isStopped: {
      type: Boolean,
      default: false,
    },

    expireIn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const couponModel = model("Coupon", CouponSchema);
export default couponModel;
