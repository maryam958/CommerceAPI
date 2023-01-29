import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as OrderController from '../order/controller/order.controller.js'
import { endPoints } from "./order.endPoint.js";
const router = Router()





router.post('/createOrder',auth(endPoints.createOrder),OrderController.createOrder)
router.get('/getAllOrders',auth(endPoints.getAllOrders),OrderController.getAllOrders)
router.put('/updateOrder/:orderId',auth(endPoints.updateOrder),OrderController.updateOrder)
router.delete('/deleteOrder/:orderId',auth(endPoints.deleteOrder),OrderController.deleteOrder)


export default router