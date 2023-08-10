import httpStatus from 'http-status';
import ApiError from '../utils/error/ApiError.js';

class UserService {
  constructor(user) {
    this.user = user;

    this.getUserByEmail = this.getUserByEmail.bind(this);
  }

  async getUserByEmail(email) {
    const user = await this.user.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    return user;
  }

  async createUser(userBody) {
    return this.user.create(userBody);
  }
}

export default UserService;
