import { roles } from "../../middleware/auth.js";

export const endPoints={
    addsubCategory:[roles.Admin,roles.User],
    updatesubCategory:[roles.Admin],
    getSubCategory:[roles.Admin,roles.User],
    deleteSubCategory:[roles.Admin,roles.User]


}