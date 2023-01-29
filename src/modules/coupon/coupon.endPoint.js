import { roles } from "../../middleware/auth.js";


export const endPoints={
    addCoupon:[roles.Admin],
    updateCoupon:[roles.Admin],
    stopCoupon:[roles.Admin],


}