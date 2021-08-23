const db  = require("./db")

const {encryptPassword} = require("../helpers/user")

const uuidv1 = require('uuid').v1;


exports.signup =  (user) =>{
    const {name, email, password} = user;
   
    
    const salt   = uuidv1();
    const hashed_password = encryptPassword(password, salt)
    


    return new Promise((resolve, reject)=>{
        db.query(`INSERT INTO users (name, email, hashed_password, salt)
        VALUES (?, ? , ? ,?)`, [name, email, hashed_password, salt], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
            
            const userId= results.insertId;

            db.query(`INSERT INTO categories (name, userId)
            VALUES (?, ? ) ,(?, ?), (?, ?)`, ["Study", userId, "  Work", userId,"Sport", userId], (err, results, fields) =>{
               if(err) {
                   
                 reject(err)
                }

                db.query(`INSERT INTO  spaces (name,date,userId)
                VALUES (?,?, ?)`, ["My first  todo space",new Date().toISOString().split("T")[0], userId], (err, results, fields) =>{
                   if(err) {
                       
                     reject(err)
                    }


                    get(userId).then(user=>{
                      resolve(user)
                  })
                  .catch(err=>{
                      reject(err)
                  })
                  })


              })
    
           
          });
    })
   
  }
  
  

  
const get =  (id) =>{
   
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM users WHERE id=?`, [id], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
    
            resolve(results[0])
          });
    })
   
  }
  
  exports.findOneById = get;

  exports.findOneByEmail =  (email) =>{
   
    


    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM users WHERE email=?`, [email], (err, results, fields) =>{
           if(err) {
               
             reject(err)
            }
    
            resolve(results[0])
          });
    })
   
  }
  
  exports.authenticate = (password, hashed_password, salt)=>{
      return encryptPassword(password, salt) === hashed_password

  }