import 'dotenv/config.js';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tokopedia-play';

export default {
  PORT,
  MONGO_URI,
};
