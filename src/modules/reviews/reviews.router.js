import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as reviewController from './controller/reviews.controller.js'
import { endPoints } from "./reviews.endPoint.js";
const router = Router({mergeParams:true})




router.post('/createReview',auth(endPoints.createReview),reviewController.createReview)



export default router