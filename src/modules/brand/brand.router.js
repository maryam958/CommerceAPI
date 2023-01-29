import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import { endPoints } from "./brand.endPoint.js";
import * as brandController from './controller/brand.controller.js'
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Brand Module"})
})

router.post('/addBrand',auth(endPoints.addBrand),myMulter(fileValidation.image).single("image"),HME,brandController.addBrand)
router.put('/updateBrand/:brandId',auth(endPoints.updateBrand),myMulter(fileValidation.image).single("image"),HME,brandController.updateBrand)
router.get('/getAllBrands',auth(endPoints.getAllBrands),brandController.Brands)
router.get('/getBrandById/:brandId',auth(endPoints.getBrandById),brandController.getBrandById)
router.delete('/deleteBrandById/:brandId',auth(endPoints.deleteBrandById),brandController.deleteBrand)



export default router