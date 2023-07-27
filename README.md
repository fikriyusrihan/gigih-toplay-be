# Tokopedia Play Clone API 🎶

This is a simple RESTful API for Tokopedia Play Clone application. This API is built using Node.js and Express.
This application is a part of Generasi GIGIH 3.0 Final Project submission at midterm.

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

The application will run on port 3000. You can change the port by changing the `PORT` variable in `.env` file.

## API Documentation 📑

Access the API documentation at `http://localhost:3000/api/v1/docs` when the application is running.
The documentation is built using Swagger for ExpressJS. 
The documentation contains the API endpoints, request body, response body, and example responses.

## Database Schema 📚

The database schema is built using MongoDB and Mongoose. The schema shown below.
[![N|Solid](https://raw.githubusercontent.com/fikriyusrihan/gigih-toplay-be/master/gigih-toped-play.drawio.png?token=GHSAT0AAAAAABOKS3M2WBUFBBLIBDZ6L4DYZGCWFSA)]()

There are 3 collections in the database, which are:
- `videos` collection, which contains the video data. Every video document has a `products` field, which contains list of product's reference id. The reason why the product data is stored in the video document is to reduce the number of queries to the database as MongoDB's slogan "data that is accessed together, should be stored together".
- `comments` collection, which contains the comment data. Every comment is related to one video document.
- `products` collection, which contains the product data. Product data is stored separately from the video document because the product data is not always accessed together with the video data. I also try to avoid "unbounded documents" issue in MongoDB.

## Tools ⚒️

- [Node.js](https://nodejs.org/en/) (JavaScript Runtime)
- [Express](https://expressjs.com/) (Web Framework)
- [MongoDB](https://www.mongodb.com/) (Database)
- [Mongoose](https://mongoosejs.com/) (ODM)
- [Swagger](https://swagger.io/) (API Documentation)
- [Postman](https://www.postman.com/) (API Testing)

## Possible Improvements 📈
- Add authentication and authorization
- Add unit testing
- Implement WebSockets for real-time comments data update
- Using Docker for containerization