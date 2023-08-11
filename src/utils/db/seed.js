import * as fs from 'fs';
import mongoose from 'mongoose';
import Product from '../../models/product.model.js';
import Video from '../../models/video.model.js';
import config from '../../config/index.js';

const seedProducts = async () => {
  try {
    const rawData = fs.readFileSync('./src/utils/db/tokoplay.products.json');
    const data = JSON.parse(rawData, (key, value) => {
      if (key === '_id' && typeof value === 'object' && value.$oid) {
        return new mongoose.Types.ObjectId(value.$oid);
      }
      return value;
    });

    await Product.deleteMany();
    await Product.insertMany(data);
  } catch (error) {
    console.error(error);
  }
};

const seedVideos = async () => {
  try {
    const rawData = fs.readFileSync('./src/utils/db/tokoplay.videos.json');
    const data = JSON.parse(rawData, (key, value) => {
      if (key === '_id' && typeof value === 'object' && value.$oid) {
        return new mongoose.Types.ObjectId(value.$oid);
      }

      if (value instanceof Object && '$oid' in value) {
        return new mongoose.Types.ObjectId(value.$oid);
      }

      return value;
    });

    await Video.deleteMany();
    await Video.insertMany(data);
  } catch (error) {
    console.error(error);
  }
};

export default {
  seedProducts,
  seedVideos,
};
