import {
  create,
  deleteOne,
  find,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  findOne,
} from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import orderModel from "../../../../DB/model/order.model.js";
import productModel from "../../../../DB/model/product.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  let { _id } = req.user;
  let { couponId, products } = req.body;

  const finalList = [];
  let sumTotal = 0;

  for (let i = 0; i < products.length; i++) {
    const checkItems = await findOne({
      model: productModel,
      condition: {
        _id: products[i].productId,
        stock: { $gte: products[i].quantity },
      },
    });
    if (!checkItems) {
      return next(new Error("Invalid to place your order", { cause: 409 }));
    }
    products[i].unitPrice = checkItems.finalPrice;
    products[i].totalPrice = checkItems.finalPrice * products[i].quantity;
    sumTotal += products[i].totalPrice;
    finalList.push(products[i]);
  }
  req.body.sumTotal = sumTotal;
  req.body.totalPrice = sumTotal;
  if (couponId) {
    const checkCoupon = await findOne({
      model: couponModel,
      condition: { _id: couponId, usedBy: { $nin: _id } },
    });
    if (!checkCoupon) {
      return next(new Error("Invalid coupon", { cause: 409 }));
    }
    req.body.totalPrice = sumTotal - sumTotal * (checkCoupon.amount / 100);
  }
  req.body.userId = _id;
  req.body.products = finalList;
  const order = await create({ model: orderModel, data: req.body });
  if (order) {
    if (couponId) {
      await findByIdAndUpdate({
        model: couponModel,
        condition: { _id: couponId },
        data: { $addToSet: { usedBy: _id } },
      });
    }
    return res.status(201).json({ message: "Done", order });
  } else {
    return next(new Error("Fail to place your order", { cause: 400 }));
  }
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await find({ model: orderModel });
  return res.status(200).json({ message: "Done", orders });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  let { orderId } = req.params;
  let { quantity } = req.body;
  const updatedOrder = await findByIdAndUpdate({
    model: orderModel,
    condition: { _id: orderId },
    data: quantity,
  });
  res.status(200).json({ message: "Updated", updatedOrder });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  let { orderId } = req.params;
  let Order = await findById({ model: orderModel, id: orderId });
  if (!Order) {
    return next(new Error("Invalid Order", { cause: 404 }));
  }
  const deletedOrder = await deleteOne({
    model: orderModel,
    condition: { _id: orderId },
  });
  console.log(deletedOrder);
  res.status(200).json({ message: "Updated", deletedOrder });
});
