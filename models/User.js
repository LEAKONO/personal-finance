const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const trimmedPassword = this.password.trim(); 
    this.password = await bcrypt.hash(trimmedPassword, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);