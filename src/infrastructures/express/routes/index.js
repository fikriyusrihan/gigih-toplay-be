import express from 'express';
import productRoute from './product.route.js';
import videoRoute from './video.route.js';
import videoProductsRoute from './video-products.route.js';

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
  {
    path: '/videos/:videoId/products',
    route: videoProductsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
