import { roles } from "../../middleware/auth.js";



export const endPoints={
    addProduct:[roles.Admin,roles.User],
    updateProduct:[roles.Admin,roles.User],
    getProductById:[roles.Admin,roles.User],
    deleteProduct:[roles.Admin,roles.User],




}