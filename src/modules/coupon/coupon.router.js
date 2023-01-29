import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./coupon.endPoint.js";
import * as CouponController from './controller/coupon.controller.js'
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Coupon Module"})
})
 
router.post('/addCoupon',auth(endPoints.addCoupon),CouponController.addCoupon)
router.put('/updateCoupon/:name',auth(endPoints.updateCoupon),CouponController.updateCoupon)
router.put('/stopCoupon/:couponId',auth(endPoints.stopCoupon),CouponController.stopCoupon)



export default router