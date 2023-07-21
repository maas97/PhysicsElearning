const { body, param, query } = require("express-validator");

exports.post = [
    body("educationalLevel").isString().withMessage("Educational Level must be string"),
    body("semester").isString().withMessage("semester must be string"),
];

exports.update = [
    body("educationalLevel").isString().withMessage("Educational Level must be string"),
    body("semester").isString().withMessage("semester must be string"),
    body("dayNumber").isNumeric().withMessage("Day must be Number"),
];

exports.delete = [
    body("id").isString().withMessage("Id Should be Number"),
]