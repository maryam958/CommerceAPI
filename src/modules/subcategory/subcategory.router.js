import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import * as subCategoryController from "./controller/subCategory.controller.js";
import { endPoints } from "./subcategory.endPoint.js";
const router = Router({ mergeParams: true });

router.post(
  "/",
  auth(endPoints.addsubCategory),
  myMulter(fileValidation.image).single("image"),
  HME,
  subCategoryController.addsubCategory
);

router.put(
  "/:subCategoryId",
  auth(endPoints.updatesubCategory),
  myMulter(fileValidation.image).single("image"),
  HME,
  subCategoryController.updateSubCategory
);

router.get(
  "/getSubCategory/:subCategoryId",
  auth(endPoints.getSubCategory),
  subCategoryController.getSubCategory
);

router.delete(
  "/deleteSubCategoryById/:subcategoryId",
  auth(endPoints.deleteSubCategory),
  subCategoryController.deleteSubCategory
);

export default router;
