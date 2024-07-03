const { validationResult } = require("express-validator");

const titleCase = async (name) => {
  return name
    ?.toLowerCase()
    ?.split(" ")
    .map(function (text) {
      return text?.charAt(0).toUpperCase() + text?.slice(1);
    })
    .join(" ");
};


const validationHandler = (values = []) => {
  return async (req, res, next) => {
    await Promise.all(values.map((value) => value.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const _errors = errors.array();
    let message = "Invalid Parameters:";

    _errors.forEach((v) => {
      message += `${v.param},`;
    });
    return res.status(422).json({ success: false, errors: errors.array() });
  };
};


module.exports = {
  validationHandler,
  titleCase,
};
