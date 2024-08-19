const AppError = require('../utilities/AppError');

module.exports = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    return next();
  } catch (error) {
    next(error);
  }
};
