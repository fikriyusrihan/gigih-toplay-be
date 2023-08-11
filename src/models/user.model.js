import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import toJSON from './plugins/toJSON.plugin.js';

const userSchema = new mongoose.Schema({
  username: String,
  display_name: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { _id: this._id, username: this.username },
    config.JWT_SECRET,
    { expiresIn: '1d' },
  );
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.plugin(toJSON);

const User = mongoose.model('User', userSchema);

export default User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         username: fikriyusrihan
 *         email: fikriyusrihan@gmail.com
 *         password: secret
 */
