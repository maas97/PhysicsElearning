const express=require("express")
const router = express.Router();    
// const studentValidation = require("../Core/Validation/contentValidation");
const validateMW = require("../Core/Validation/validateMW");
const controller = require("../Controller/productController");

router
    .route("/product")
    // .all(authorization.checkRoot)
    .get(controller.getAllProducts)
    .post(validateMW ,controller.addProduct)
    .patch(validateMW ,controller.updateProduct)
    // upload("basicAdmin"),
    .delete(validateMW ,controller.deleteProduct);

router
    .route("/contents/:id")
    .get(controller.getProductById);

module.exports = router;