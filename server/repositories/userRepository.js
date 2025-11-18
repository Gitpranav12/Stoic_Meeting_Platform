const User = require('../models/User');

class UserRepository {
  async create(user) {
    const u = new User(user);
    return u.save();
  }
  async findByEmail(email) {
    return User.findOne({ email });
  }
  async findById(id) {
    return User.findById(id);
  }
  async searchByNameOrEmail(q, limit=10) {
    const regex = new RegExp(q, 'i');
    return User.find({ $or: [{ name: regex }, { email: regex }] }).limit(limit);
  }
  async findManyByIds(ids) {
    return User.find({ _id: { $in: ids } });
  }
}

module.exports = new UserRepository();
