
const db  = require("./db")


//inster in to the categories table a new category
//return the new data
exports.create =  (name,userId) =>{
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO  categories (name,userId)
        VALUES (?, ?)`, [name, userId], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
            get(results.insertId).then(category=>{
                resolve(category)
            })
            .catch(err=>{
                reject(err)
            })
          });
    })
   
  }

  //get one category from the db

  const get =  (id) =>{
   
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM categories WHERE id=?`, [id], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
    
            resolve(results[0])
          });
    })
   
  }
  
  exports.findOneById = get;



  //get all category from the database user created 

  const read =  (userId) =>{
   
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM categories WHERE userId=? `, [userId], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
    
            resolve(results)
          });
    })
   
  }
  exports.read = read;


  //delete category
  exports.removeCategory =  (id, userId) =>{
   
    return new Promise((resolve, reject)=>{
        db.query(`DELETE  FROM categories WHERE id=? `, [id], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
    
            read(userId).then(results=>resolve(results))
            .catch(err=>reject(err))
          });
    })
   
  }
  
  

  //update the category using the id and userId
  
  exports.update =  (category,userId) =>{
    const {id, name} = category
      
     
      return new Promise((resolve, reject)=>{
          db.query(`UPDATE   categories SET name=?
          WHERE id=?  AND userId=?`, [name,id, userId], (err, results, fields) =>{
             if(err) {
                 
               reject(err)
              }
              get(results.insertId).then(space=>{
                  resolve(space)
              })
              .catch(err=>{
                  reject(err)
              })
            });
      })
     
    }