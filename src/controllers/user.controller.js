import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import handlerWrapper from '../utils/handlerWrapper.js';
import ApiError from '../utils/error/ApiError.js';

class UserController {
  constructor(userService) {
    this.userService = userService;

    this.handlePostLogin = this.handlePostLogin.bind(this);
    this.handlePostRegister = this.handlePostRegister.bind(this);
  }

  handlePostLogin = handlerWrapper(async (req, res) => {
    const { email, password } = req.body;

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

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

  handlePostRegister = handlerWrapper(async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already registered');
    }

    const user = await this.userService.createUser({
      username,
      email,
      password,
    });

    const token = user.generateAuthToken();
    const response = {
      status: 'success',
      message: 'User successfully registered',
      data: { token },
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default UserController;
