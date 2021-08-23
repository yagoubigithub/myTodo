const db = require("./db");


//create one todo
//return the new data
exports.create = (todo, userId, spaceId) => {
  console.log(todo);
  const { text, categoryId, beginTime, endTime } = todo;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO  todos (text,userId, categoryId, spaceId, beginTime, endTime)
        VALUES (?, ?, ? , ? , ?, ?)`,
      [text, userId, categoryId, spaceId, beginTime, endTime],
      (err, results, fields) => {
        if (err) {
          reject(err);
        }
        get(results.insertId)
          .then((category) => {
            resolve(category);
          })
          .catch((err) => {
            reject(err);
          });
      }
    );
  });
};


//get one todo
const get = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM todos WHERE id=?`, [id], (err, results, fields) => {
      if (err) {
        reject(err);
      }

      resolve(results[0]);
    });
  });
};

exports.findOneById = get;


//read the todos table joind with categories table to get the name of the category insted of the categoryId
const read = (userId, spaceId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT t.* , c.name,c.userId FROM todos t JOIN categories c ON c.id=t.categoryId WHERE t.userId=? AND t.spaceId=? `,
      [userId, spaceId],
      (err, results, fields) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      }
    );
  });
};
exports.read = read;



//delete todo
//retun all todo in the space
exports.removeTodo = (id, userId, spaceId) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE  FROM todos WHERE id=? `, [id], (err, results, fields) => {
      if (err) {
        reject(err);
      }

      read(userId, spaceId)
        .then((results) => resolve(results))
        .catch((err) => reject(err));
    });
  });
};

//update
//return all todo in  space
exports.update = (todo, userId) => {
  const { id, text, categoryId, beginTime, endTime } = todo;

  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE todos SET text=?,categoryId=?,beginTime=?,endTime=? 
          WHERE id=? `,
      [text, categoryId, beginTime, endTime, id, userId],
      (err, results, fields) => {
        if (err) {
          reject(err);
        }

        get(results.insertId)
          .then((todo) => {
            resolve(todo);
          })
          .catch((err) => {
            reject(err);
          });
      }
    );
  });
};
