const UserService = require('../services/user.service');
const { generateLoginToken } = require('../utilities/token');
const { comparePassword, hashPassword } = require('../utilities/password');
const AppError = require('../utilities/AppError');

require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const user = await UserService.findByEmail(req.body.email);
    if (!user) throw new AppError(404, 'User not found');
    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) throw new AppError(400, 'Invalid email or password');
    return res.status(200).json({ token: generateLoginToken(user) });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const user = await UserService.findByEmail(req.body.email);
    if (user) throw new AppError(400, 'Email already exists');
    const newUser = await UserService.create({
      ...req.body,
      password: hashPassword(req.body.password),
    });
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
