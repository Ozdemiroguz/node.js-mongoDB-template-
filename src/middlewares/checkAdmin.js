const AppError = require('../utilities/AppError');

module.exports = (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new AppError('Bu işlemi yapmaya yetkiniz yok', 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
