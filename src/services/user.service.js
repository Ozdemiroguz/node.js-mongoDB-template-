const User = require('../models/user.model');

const AppError = require('../utilities/AppError');

class UserService {
  async create(data) {
    const user = new User(data);
    await user.save();
    user.password = undefined;
    return user;
  }

  async findAll() {
    return User.find();
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findById(id) {
    return User.findById(id);
  }

  async update(id, data) {}

  async delete(id) {}
}

module.exports = new UserService();
