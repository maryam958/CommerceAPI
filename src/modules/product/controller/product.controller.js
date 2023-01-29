import slugify from "slugify";
import {
  create,
  deleteOne,
  find,
  findById,
  findByIdAndUpdate,
  findOne,
} from "../../../../DB/DBMethods.js";
import brandModel from "../../../../DB/model/brand.model.js";
import categoryModel from "../../../../DB/model/category.model.js";
import productModel from "../../../../DB/model/product.model.js";
import subCategoryModel from "../../../../DB/model/subCategory.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import cloudinary from "../../../services/cloudinary.js";
import { paginate } from "../../../services/pagination.js";

export const addProduct = asyncHandler(async (req, res, next) => {
  let { categoryId, subCategoryId, brandId } = req.params;

  let foundedSubCategory = await findOne({
    model: subCategoryModel,
    condition: { _id: subCategoryId, categoryId: categoryId },
  });
  if (!foundedSubCategory) {
    next(new Error("SubCategory or category id not found", { cause: 404 }));
  } else {
    let brand = await findById({ model: brandModel, id: brandId });
    if (!brand) {
      next(new Error("brand id not found", { cause: 404 }));
    } else {
      if (!req.files?.length) {
        next(new Error("You have to add images", { cause: 400 }));
      } else {
        let { name, discount, price } = req.body;
        req.body.slug = slugify(name);

        req.body.stock = req.body.totalItems;

        req.body.finalPrice = price - (price * discount || 0) / 100;

        req.body.categoryId = categoryId;
        req.body.subCategoryId = subCategoryId;
        req.body.brandId = brandId;
        req.body.createdBy = req.user._id;
        req.body.soldItems = 0;

        let imagesURLs = [];
        let imagesIds = [];
        for (const file of req.files) {
          let { secure_url, public_id } = await cloudinary.uploader.upload(
            file.path,
            { folder: "brands/products" }
          );
          imagesURLs.push(secure_url);
          imagesIds.push(public_id);
        }
        req.body.images = imagesURLs;
        req.body.publicImageIds = imagesIds;

        let product = await create({ model: productModel, data: req.body });
        if (!product) {
          for (const id of imagesIds) {
            await cloudinary.uploader.destroy(id);
          }
          next(new Error("Error when insert to DB", { cause: 400 }));
        } else {
          res.status(201).json({ message: "Created", product });
        }
      }
    }
  }
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  let { productId } = req.params;
  let product = await findById({ model: productModel, id: productId });
  if (!product) {
    next(new Error("Product id not found", { cause: 404 }));
  } else {
    let { price, discount, name, totalItems } = req.body;
    if (name) {
      req.body.slug = slugify(name);
    }
    if (price && discount) {
      req.body.finalPrice = price - (price * discount) / 100;
    } else if (price) {
      req.body.finalPrice = price - (price * product.discount) / 100;
    } else if (discount) {
      req.body.finalPrice = product.price - (product.price * discount) / 100;
    }
    if (totalItems) {
      let currentStock = totalItems - product.soldItems;
      req.body.stock = currentStock > 0 ? currentStock : 0;
    }
    if (req.files?.length) {
      let imagesURLs = [];
      let imagesIds = [];
      for (const file of req.files) {
        let { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          { folder: "brands/products" }
        );
        imagesURLs.push(secure_url);
        imagesIds.push(public_id);
      }
      req.body.images = imagesURLs;
      req.body.publicImageIds = imagesIds;
    }
    req.body.updatedBy = req.user._id;

    let updatedProduct = await findByIdAndUpdate({
      model: productModel,
      condition: { _id: productId },
      data: req.body,
      options: { new: true },
    });
    if (!updatedProduct) {
      if (req.body.publicImageIds) {
        for (const id of req.body.publicImageIds) {
          await cloudinary.uploader.destroy(id);
        }
      }
      next(new Error("DB Error", { cause: 400 }));
    } else {
      if (req.body.publicImageIds) {
        for (const id of product.publicImageIds) {
          await cloudinary.uploader.destroy(id);
        }
      }
      res.status(200).json({ message: "Updated", updatedProduct });
    }
  }
});

const populate = [
  {
    path: "categoryId",
  },
  {
    path: "createdBy",
    select: "userName",
  },
  {
    path: "subCategoryId",
  },
  {
    path: "brandId",
  },
];

export const productList = asyncHandler(async (req, res, next) => {
  let { limit, skip } = paginate(req.query.page, req.query.size);
  let products = await find({
    model: productModel,
    skip,
    limit,
    populate: [...populate],
  });

  res.status(200).json({ message: "Done", products });
});

export const getProductById = asyncHandler(async (req, res, next) => {
  let { productId } = req.params;
  let product = await findById({ model: productModel, id: productId });
  if (!product) {
    next(new Error("Invalid product", { cause: 404 }));
  } else {
    res.status(200).json({ message: "Done", product });
  }
});

//delete Category
export const deleteProduct = asyncHandler(async (req, res, next) => {
  let { productId } = req.params;
  let product = await findById({ model: productModel, id: productId });
  if (!product) {
    next(new Error("Invalid product", { cause: 404 }));
  } else {
    if (product.createdBy.toString() == req.user._id.toString()) {
      let deletedProduct = await deleteOne({
        model: productModel,
        condition: { _id: productId },
      });
      res.status(200).json({ message: "Done", deletedProduct });
    } else {
      next(new Error("you are not the owner of this product", { cause: 403 }));
    }
  }
});
