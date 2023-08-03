const express=require("express")
const router = express.Router();    
const basicAdminValidation = require("../Core/Validation/basicAdminValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/basicAdminController");
// const upload = require("../Core/helper/uploadImage");
// const authorization = require("../Middleware/authorization");

router
    .route("/admins")
    // .all(authorization.checkRoot)
    .get(controller.getAllBasicAdmins)
    .post(basicAdminValidation.post ,validateMW ,controller.addBasicAdmin)
    .patch(basicAdminValidation.update ,validateMW ,controller.updateBasicAdmin)
    // upload("basicAdmin"),
    .delete(validateMW ,controller.deleteBasicAdmin);
    
// router
//     .route("/basicAdmin/:id")
//     .get(controller.getBasicAdminById);

module.exports = router;