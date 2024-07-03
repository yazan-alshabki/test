const { body } = require("express-validator");

const {
  titleCase,
} = require("../helpers/validation.js");


const add_a_magic_mover = [
  body("weightLimit")
    .notEmpty()
    .withMessage("Weight Limit cannot be empty"),
  body("energy")
    .notEmpty()
    .withMessage("Energy cannot be empty")
]
const add_a_magic_item = [
  body("name")
    .notEmpty()
    .withMessage("name cannot be empty")
    .trim()
    .customSanitizer(titleCase),
  body("weight")
    .notEmpty()
    .withMessage("Weight cannot be empty")
]

module.exports = {
  add_a_magic_mover, // user
  add_a_magic_item, // user
};