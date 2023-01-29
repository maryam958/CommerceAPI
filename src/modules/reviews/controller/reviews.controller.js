import { asyncHandler } from "../../../services/asyncHandler.js";
import {create, findOne} from '../../../../DB/DBMethods.js'
import reviewModel from "../../../../DB/model/review.model.js";
import orderModel from "../../../../DB/model/order.model.js";

export const createReview=asyncHandler(async(req,res,next)=>{
    let {productId}=req.params
    let {_id}=req.user
    let {message,rating}=req.body
    const checkReview = await findOne({model:reviewModel,condition:{userId:_id,productId}})
    if(checkReview){
        return next(new Error("Already Reviewed by you",{cause:409}))
    }
    const checkOrder=await findOne({model:orderModel,condition:{userId:_id,"products.productId":productId,status:"Received"}})
    if(!checkOrder){
        return next(new Error("Sorry only sold products can be reviewed ",{cause:400}))

    }
    const review=await create({
        model:reviewModel,
        data:{
            userId:_id,
            productId,
            message,
            rating
        }
    })
    return res.status(201).json({message:"Done",review})
})



