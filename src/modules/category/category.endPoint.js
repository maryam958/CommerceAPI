import { roles } from "../../middleware/auth.js";



export const endPoints={
    addCategory:[roles.Admin,roles.User],
    updateCategory:[roles.Admin],
    getAllCategories:[roles.User,roles.Admin],
    getCategoryById:[roles.User,roles.Admin],
    deleteCategoryById:[roles.User,roles.Admin]

}