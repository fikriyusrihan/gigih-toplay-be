import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import handlerWrapper from '../utils/handlerWrapper.js';
import ApiError from '../utils/error/ApiError.js';

class UserController {
  constructor(userService) {
    this.userService = userService;

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth = handlerWrapper(async (req, res) => {
    const { email, password } = req.body;

    const user = this.userService.getUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = user.generateAuthToken();
    const response = {
      status: 'success',
      message: 'User successfully authenticated',
      data: { token },
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default UserController;
