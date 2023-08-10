import express from 'express';
import productRoute from './product.route.js';
import videoRoute from './video.route.js';
import videoProductsRoute from './video-products.route.js';
import commentRoute from './comment.route.js';
import userRoute from './user.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/videos',
    route: videoRoute,
  },
  {
    path: '/videos',
    route: videoProductsRoute,
  },
  {
    path: '/videos',
    route: commentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
