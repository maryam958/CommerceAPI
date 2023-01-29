import { roles } from "../../middleware/auth.js";


export const endPoints={
    addBrand:[roles.Admin],
    updateBrand:[roles.Admin],
    getAllBrands:[roles.Admin,roles.User],
    getBrandById:[roles.Admin,roles.User],
    deleteBrandById:[roles.Admin,roles.User],



}