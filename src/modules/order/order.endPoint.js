import { roles } from "../../middleware/auth.js";


export const endPoints={
    createOrder:[roles.User],
    getAllOrders:[roles.User,roles.Admin],
    updateOrder:[roles.User,roles.Admin],
    deleteOrder:[roles.User,roles.Admin],


}