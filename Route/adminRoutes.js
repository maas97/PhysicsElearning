const express=require("express")
const router = express.Router();    
const basicAdminValidation = require("../Core/Validation/basicAdminValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/basicAdminController");

router
    .route("/admins")
    .get(controller.getAllBasicAdmins)
    .post(basicAdminValidation.post ,validateMW ,controller.addBasicAdmin)
    .patch(basicAdminValidation.update ,validateMW ,controller.updateBasicAdmin)
    // upload("basicAdmin"),
    .delete(validateMW ,controller.deleteBasicAdmin);

module.exports = router;