import {
  create,
  deleteOne,
  findById,
  findByIdAndUpdate,
} from "../../../../DB/DBMethods.js";
import categoryModel from "../../../../DB/model/category.model.js";
import subCategoryModel from "../../../../DB/model/subCategory.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";

export const addsubCategory = asyncHandler(async (req, res) => {
  let { id } = req.params;
  if (!req.file) {
    next(new Error("You have to upload an image", { cause: 422 }));
  } else {
    let { name } = req.body;
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "category/SubCategory",
      }
    );

    const result = await create({
      model: subCategoryModel,
      data: {
        name,
        image: secure_url,
        createdBy: req.user._id,
        public_id,
        categoryId: id,
      },
    });
    res.status(201).json({ message: "Created", result });
  }
});

export const updateSubCategory = asyncHandler(async (req, res) => {
  let { subCategoryId } = req.params;

  if (req.file) {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "category/subCategory" }
    );
    req.body.image = secure_url;
    req.body.public_id = public_id;
  }
  console.log(req.body);
  let updatedSubCategory = await findByIdAndUpdate({
    model: subCategoryModel,
    condition: { _id: subCategoryId },
    data: req.body,
  });
  if (!updatedSubCategory) {
    await cloudinary.uploader.destroy(req.body.public_id);
    next(new Error("subCategory not found", { cause: 404 }));
  } else {
    await cloudinary.uploader.destroy(updatedSubCategory.public_id);
    res.status(200).json({ message: "Updated", updateSubCategory });
  }
});

export const getSubCategory = asyncHandler(async (req, res, next) => {
  let { subCategoryId } = req.params;
  let subCategory = await findById({
    model: subCategoryModel,
    id: subCategoryId,
  });
  if (!subCategory) {
    next(new Error("Not Found", { cause: 404 }));
  } else {
    const cursor = await subCategoryModel
      .find({ _id: subCategoryId })
      .select("categoryId name")
      .cursor();
    let allData = [];
    for (
      let doc = await cursor.next();
      doc != null;
      doc = await cursor.next()
    ) {
      let myObj = doc.toObject();
      let category = await categoryModel
        .findById(myObj.categoryId)
        .select("name");
      myObj.category = category;
      allData.push({
        myObj,
      });
    }
    res.status(200).json({ message: "Done", allData });
  }
});

export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  let { subcategoryId } = req.params;
  let Subcategory = await findById({
    model: subCategoryModel,
    id: subcategoryId,
  });
  if (!Subcategory) {
    next(new Error("Invalid Subcategory", { cause: 404 }));
  } else {
    if (Subcategory.createdBy.toString() == req.user._id.toString()) {
      let deletedSubCategory = await deleteOne({
        model: subCategoryModel,
        condition: { _id: subcategoryId },
      });
      console.log(deletedSubCategory);
      res.status(200).json({ message: "Done", deletedSubCategory });
    } else {
      next(
        new Error("you are not the owner of this Subcategory", { cause: 403 })
      );
    }
  }
});
