import express from 'express';
import productRoute from './product.route.js';
import videoRoute from './video.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/videos',
    route: videoRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
