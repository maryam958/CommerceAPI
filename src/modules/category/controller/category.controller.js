import {
  create,
  deleteOne,
  find,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
} from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";
import { paginate } from "../../../services/pagination.js";

export const addCategory = asyncHandler(async (req, res) => {
  if (!req.file) {
    next(new Error("You have to upload an image", { cause: 422 }));
  } else {
    let { name } = req.body;
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "category",
      }
    );

    const result = await create({
      model: categoryModel,
      data: {
        name,
        image: secure_url,
        createdBy: req.user._id,
        publicImageId: public_id,
      },
    });
    res.status(201).json({ message: "Created", result });
  }
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let category = await findById({ model: categoryModel, id: id });
  if (!category) {
    next(new Error("Category not found", { cause: 404 }));
  } else {
    let imgUrl = " ";
    if (req.file) {
      let { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "Category",
      });
      imgUrl = secure_url;
    } else {
      imgUrl = category.image;
    }
    let updatedCategory = await findByIdAndUpdate({
      model: categoryModel,
      condition: { _id: id },
      data: { name, image: imgUrl },
      options: { new: true },
    });
    res.status(200).json({ message: "Updated", updatedCategory });
  }
});

export const Categories = asyncHandler(async (req, res, next) => {
  let { limit, skip } = paginate(req.query.page, req.query.size);
  let allCategories = await find({ model: categoryModel, limit, skip });
  res.status(200).json({ message: "Done", allCategories });
});

export const getCategoryById = asyncHandler(async (req, res, next) => {
  let { categoryId } = req.params;
  let category = await findById({ model: categoryModel, id: categoryId });
  if (!category) {
    next(new Error("Invalid category", { cause: 404 }));
  } else {
    res.status(200).json({ message: "Done", category });
  }
});

//delete Category
export const deleteCategory = asyncHandler(async (req, res, next) => {
  let { categoryId } = req.params;
  let category = await findById({ model: categoryModel, id: categoryId });
  if (!category) {
    next(new Error("Invalid category", { cause: 404 }));
  } else {
    if (category.createdBy.toString() == req.user._id.toString()) {
      let deletedCategory = await deleteOne({
        model: categoryModel,
        condition: { _id: categoryId },
      });
      res.status(200).json({ message: "Done", deletedCategory });
    } else {
      next(new Error("you are not the owner of this category", { cause: 403 }));
    }
  }
});
