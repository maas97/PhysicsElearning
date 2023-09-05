const { body, param, query } = require("express-validator");

exports.post = [
    body("firstName").isString().withMessage("First Name must be string"),
    body("lastName").isString().withMessage("Last Name must be string"),
    body("password").isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").isEmail().withMessage("Invalid Email Format"),
    body("phoneNumber").isString().isLength({min: 11}).withMessage("Invalid Phone Number"),
    body("educationalLevel").isString().withMessage("Invalid Educational Level"),

];

exports.update = [
    body("firstName").optional().isString().withMessage("First Name must be string"),
    body("lastName").optional().isString().withMessage("Last Name must be string"),
    body("password").optional().isLength({min: 8}).withMessage("Password Must be Min length 8"),
    body("email").optional().isEmail().withMessage("Invalid Email Format"),
    body("phoneNumber").isString().withMessage("Invalid Phone Number"),
    body("educationalLevel").isString().withMessage("Invalid Educational Level"),
];

