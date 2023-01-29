import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import  subcategoryRouter  from "../subcategory/subcategory.router.js";
import { endPoints } from "./category.endPoint.js";
import * as categoryController from './controller/category.controller.js'
const router = Router()


router.use('/:id/subCategory',subcategoryRouter)

router.post('/addCategory',auth(endPoints.addCategory),myMulter(fileValidation.image).single("image"),HME,categoryController.addCategory)
router.put('/updateCategory/:id',auth(endPoints.updateCategory),myMulter(fileValidation.image).single("image"),HME,categoryController.updateCategory)
router.get('/getAllCategories',auth(endPoints.getAllCategories),categoryController.Categories)
router.get('/getCategoryById/:categoryId',auth(endPoints.getCategoryById),categoryController.getCategoryById)
router.delete('/deleteCategoryById/:categoryId',auth(endPoints.deleteCategoryById),categoryController.deleteCategory)








export default router