import 'dotenv/config.js';

const PORT = process.env.PORT || 3080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tokopedia-play';

export default {
  PORT,
  MONGO_URI,
};
