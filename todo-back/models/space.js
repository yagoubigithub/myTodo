
const db  = require("./db")

//create new space using the name and date
exports.create =  (space,userId) =>{
  const {name, date} = space
    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO  spaces (name,date,userId)
        VALUES (?,?, ?)`, [name,date, userId], (err, results, fields) =>{
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

  //get one

  const get =  (id) =>{
   
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM spaces WHERE id=?`, [id], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
    
            resolve(results[0])
          });
    })
   
  }
  
  exports.findOneById = get;



  //read all user spaces

  const read =  (userId) =>{
   
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM spaces WHERE userId=? `, [userId], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
    
            resolve(results)
          });
    })
   
  }
  exports.read = read;


  //delete space from the database
  //return all spaces
  exports.removeSpace =  (id, userId) =>{
   
    return new Promise((resolve, reject)=>{
        db.query(`DELETE  FROM spaces WHERE id=? `, [id], (err, results, fields) =>{
           if(err) {     
             reject(err)
            }
            read(userId).then(results=>resolve(results))
            .catch(err=>reject(err))
          });
    })
   
  }

  //update the space
  
  exports.update =  (space,userId) =>{
    const {id, name, date} = space
      
     
      return new Promise((resolve, reject)=>{
          db.query(`UPDATE   spaces SET name=?,date=?
          WHERE id=?  AND userId=?`, [name,date,id, userId], (err, results, fields) =>{
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