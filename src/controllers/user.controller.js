import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import handlerWrapper from '../utils/api/handlerWrapper.js';
import ApiError from '../utils/error/ApiError.js';
import config from '../config/index.js';

class UserController {
  constructor(userService) {
    this.userService = userService;

    this.handlePostLogin = this.handlePostLogin.bind(this);
    this.handlePostRegister = this.handlePostRegister.bind(this);
    this.handleGetUser = this.handleGetUser.bind(this);
  }

  handlePostLogin = handlerWrapper(async (req, res) => {
    const { email, password } = req.body;

    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    const userWithPassword = await this.userService.getUsersPasswordById(user.id);
    const isPasswordMatch = await bcrypt.compare(password, userWithPassword.password);
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

  handleGetUser = handlerWrapper(async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    // eslint-disable-next-line no-underscore-dangle
    const user = await this.userService.getUserById(decodedToken._id);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "The provided token may corrupted or user doesn't exist");
    }

    const response = {
      status: 'success',
      message: 'User successfully retrieved',
      data: { user },
    };

    res.status(httpStatus.OK).json(response);
  });
}

export default UserController;
