const mysql      = require('mysql');


const db = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
  
});
 
db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  db.query("CREATE DATABASE IF NOT EXISTS " + process.env.DATABASE, function (err, result) {
    if (err) throw err;
    console.log("Database created");

    const userSql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),email VARCHAR(255),hashed_password VARCHAR(255),salt VARCHAR(255))";
    db.query(userSql, function (err, result) {
      if (err) throw err;
      console.log("users created");
    });


    const categoriesSql = "CREATE TABLE IF NOT EXISTS categories (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),userId INT)";
    db.query(categoriesSql, function (err, result) {
      if (err) throw err;
      console.log("categories created");
    });


    const spacesSql = "CREATE TABLE IF NOT EXISTS spaces (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),date DATE, userId INT)";
    db.query(spacesSql, function (err, result) {
      if (err) throw err;
      console.log("SPACES created");
    });

    const todosSql = "CREATE TABLE IF NOT EXISTS todos (id INT AUTO_INCREMENT PRIMARY KEY,text TEXT, userId INT, categoryId INT, spaceId INT,beginTime VARCHAR(50) , endTime  VARCHAR(50))";
    db.query(todosSql, function (err, result) {
      if (err) throw err;
      console.log("todo created");
    });



  });
 
  console.log('connected as id ' + db.threadId);
});

module.exports = db;

