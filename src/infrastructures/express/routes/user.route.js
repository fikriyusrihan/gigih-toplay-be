import express from 'express';
import UserController from '../../../controllers/user.controller.js';
import User from '../../../models/user.model.js';
import UserService from '../../../services/user.service.js';

const router = express.Router();

const userService = new UserService(User);
const userController = new UserController(userService);

router
  .route('/login')
  .post(userController.handlePostLogin);

router
  .route('/register')
  .post(userController.handlePostRegister);

export default router;
