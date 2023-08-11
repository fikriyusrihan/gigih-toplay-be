# Tokopedia Play Clone API 🎶

This is a simple RESTful API for Tokopedia Play Clone application. This API is built using Node.js and Express.
This application is a part of Generasi GIGIH 3.0 Final Project submission at midterm week. Any feedbacks are welcome!

## Run the Application ▶️

This application requires Node.js and MongoDB to run. Make sure you have installed Node.js, MongoDB and npm on your computer, then do the following steps.

```bash
# Move to the workspace directory
cd workspace

# Clone the repository
git clone https://github.com/fikriyusrihan/gigih-toplay-be.git

# Move to the application directory
cd gigih-toplay-be

# Install the dependencies
npm install

# Run the application
node src/index.js
```

## .env File Configuration ⚙️

This application requires a `.env` file to run. The `.env` file contains the following variables:
- `APP_PORT` - The port number where the application will run
- `MONGO_URI` - The MongoDB connection string

## API Documentation 📑

### RESTful API Endpoints
Access the API documentation at `http://localhost:3000/api/v1/docs` when the application is running.
The documentation is built using Swagger for ExpressJS. 

### WebSocket Endpoints
The WebSocket endpoints are:
- `ws://<host>:<port>/api/v1/comments?videoId=<videoId>` - To get the comments data live update of a video
  - Event: 'newComment' - To get the new comment data

## Database Schema 📚

The database schema is built using MongoDB and Mongoose. The schema shown below.
[![N|Solid](https://raw.githubusercontent.com/fikriyusrihan/gigih-toplay-be/master/gigih-toped-play.drawio.png?token=GHSAT0AAAAAABOKS3M2WBUFBBLIBDZ6L4DYZGCWFSA)]()

There are 3 collections in the database, which are:
- `videos` collection, which contains the video data.
  - Every video document has a `products` field, which contains list of product's reference oid.
  - The reason why the product data is stored in the video document is to reduce the number of queries to the database as MongoDB's slogan "data that is accessed together, should be stored together".
- `comments` collection, which contains the comment data.
  - Every comment is related to one video document.
- `products` collection, which contains the product data.
  - Product data is stored separately from the video document because the product data is not always accessed together with the video data.
  - I also try to avoid "unbounded documents" issue in MongoDB.

### Database Seeder

Please import the `src/utils/db/tokoplay.products.json` and `src/utils/db/tokoplay.videos.json` files to the database to seed the database with sample data.

## Tools ⚒️

- [Node.js](https://nodejs.org/en/) (JavaScript Runtime)
- [Express](https://expressjs.com/) (Web Framework)
- [MongoDB](https://www.mongodb.com/) (Database)
- [Mongoose](https://mongoosejs.com/) (ODM)
- [Swagger](https://swagger.io/) (API Documentation)
- [Postman](https://www.postman.com/) (API Testing)

## Bonus Checklist 📝
- Add authentication to achieve user-specific data ✅
- Implement websockets to achieve live update of the comments data ✅
- Implement search feature for videos ✅