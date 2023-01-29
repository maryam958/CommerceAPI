import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import { endPoints } from "./product.endPoint.js";
import * as productController from './controller/product.controller.js'
import wishList from '../wishList/wishList.router.js'
import review from '../reviews/reviews.router.js'
const router = Router()

router.use('/:productId/wishList',wishList)
router.use('/:productId/review',review)


router.post('/addProduct/:categoryId/:subCategoryId/:brandId',auth(endPoints.addProduct),myMulter(fileValidation.image).array("image",7),HME,productController.addProduct)
router.put('/updateProduct/:productId',auth(endPoints.updateProduct),myMulter(fileValidation.image).array("image",7),HME,productController.updateProduct)
router.get('/getProducts',productController.productList)

router.get('/getProductById/:productId',auth(endPoints.getProductById),productController.getProductById)
router.delete('/deleteCategoryById/:productId',auth(endPoints.deleteProduct),productController.deleteProduct)

export default router