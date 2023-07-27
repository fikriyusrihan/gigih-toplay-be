# Tokopedia Play Clone API 🎶

This is a simple API for Tokopedia Play Clone application. This API is built using Node.js and Express.
This application is a part of Generasi GIGIH 3.0 Final Project submission at Midterm.

## Run the Application ▶️

This application requires Node.js and MongoDB to run. Make sure you have installed Node.js and npm on your computer, then do the following steps.

```bash
# Move to the workspace directory
cd workspace

# Clone the repository
git clone https://github.com/fikriyusrihan/gigih-toplay-be.git

# Move to the application directory
cd gigih-toplay-be

# Run the application
node src/index.js
```

## API Documentation 📑

Access the API documentation at `http://localhost:3000/api/v1/docs` when the application is running.
The documentation is built using Swagger for ExpressJS.

## Database Schema 📚

The database schema is built using MongoDB and Mongoose. The schema shown below.
[![N|Solid](https://raw.githubusercontent.com/fikriyusrihan/gigih-toplay-be/master/gigih-toped-play.drawio.png?token=GHSAT0AAAAAABOKS3M2WBUFBBLIBDZ6L4DYZGCWFSA)]()

There are 3 collections in the database, which are:
- `videos` collection, which contains the video data.
- `comments` collection, which contains the comment data.
- `products` collection, which contains the product data.

A video document may have many comments and products.
A comment document may relate to one video document.

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