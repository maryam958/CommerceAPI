import { asyncHandler } from "../../../services/asyncHandler.js";
import slugify from "slugify";
import {
  create,
  deleteOne,
  find,
  findById,
  findByIdAndUpdate,
} from "../../../../DB/DBMethods.js";
import brandModel from "../../../../DB/model/brand.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { paginate } from "../../../services/pagination.js";

export const addBrand = asyncHandler(async (req, res) => {
  if (!req.file) {
    // next(new Error("You have to upload an image", { cause: 422 }));
    throw new Error("You have to upload an image");
  } else {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "brands",
      }
    );
    req.body.image = secure_url;
    req.body.public_id = public_id;

    req.body.slug = slugify(req.body.name);
    req.body.createdBy = req.user._id;

    const result = await create({ model: brandModel, data: req.body });
    res.status(201).json({ message: "Created", result });
  }
});

export const updateBrand = asyncHandler(async (req, res) => {
  let { brandId } = req.params;
  if (req.file) {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "brands" }
    );
    req.body.image = secure_url;
    req.body.public_id = public_id;
  }
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  let Brand = await findByIdAndUpdate({
    model: brandModel,
    condition: { _id: brandId },
    data: req.body,
    options: { new: true },
  });
  if (!Brand) {
    await cloudinary.uploader.destroy(req.body.public_id);
    next(new Error("Brand not found", { cause: 404 }));
  } else {
    await cloudinary.uploader.destroy(Brand.public_id);
    res.status(200).json({ message: "Updated", Brand });
  }
});

export const Brands = asyncHandler(async (req, res, next) => {
  let { limit, skip } = paginate(req.query.page, req.query.size);
  let allBrands = await find({ model: brandModel, limit, skip });
  res.status(200).json({ message: "Done", allBrands });
});

export const getBrandById = asyncHandler(async (req, res, next) => {
  let { brandId } = req.params;
  let Brand = await findById({ model: brandModel, id: brandId });
  if (!Brand) {
    next(new Error("Invalid Brand", { cause: 404 }));
  } else {
    res.status(200).json({ message: "Done", Brand });
  }
});

export const deleteBrand = asyncHandler(async (req, res, next) => {
  let { brandId } = req.params;
  let brand = await findById({ model: brandModel, id: brandId });
  if (!brand) {
    next(new Error("Invalid Brand", { cause: 404 }));
  } else {
    if (brand.createdBy.toString() == req.user._id.toString()) {
      let deletedBrand = await deleteOne({
        model: brandModel,
        condition: { _id: brandId },
      });
      res.status(200).json({ message: "Done", deletedBrand });
    } else {
      next(new Error("you are not the owner of this brand", { cause: 403 }));
    }
  }
});
