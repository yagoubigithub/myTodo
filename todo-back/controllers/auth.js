const {signup, findOneByEmail,authenticate} = require("../models/user")

const jwt = require("jsonwebtoken") //to generate sign token
const expressJwt = require("express-jwt") // for authorization


//create user if not exist
exports.signup = (req, res) => {

   //find the user first 
   findOneByEmail(req.body.email).then(user=>{
      if(user){
         return res.status(400).json({
            error : "This user alrady exist ,Please signin"
         })
      }
      //signup the new user
      signup( req.body ).then(user=>{

         //delete dangerous cridential from the responce
         user.salt = undefined;
         user.hashed_password = undefined;


         res.status(200).json({
            ...user
         })
      })
      .catch(err=>{
         res.status(400).json({
            err  : err.message 
         })
      })


   })
  

  

   
   
    
 }

 exports.signin = (req, res) => {


   //find user based on email
   const {email, password} = req.body;
   findOneByEmail(email).then(user=>{

      if(!user){
         return res.status(400).json({
            error : "User with that email doesn't exist ,Please signup"
         })
      }


       //if user is found make sure the email and password match

      // create authenticate method in user model

      if(!authenticate(password, user.hashed_password, user.salt)){
         return res.status(401).json({
            error : "Email and password don't match"
         })

      }


        // generate a signed token with user id and secret
        const token  = jwt.sign({id : user.id}, process.env.JWT_SECRET);

        //pressist the token as 't' in cookiewith ewpiry date
        res.cookie("t", token, {expire : new Date() + 9999})
        // return token and user to frontend client
  
        const {id, name,email} = user;
        return res.json({token, user: {id,name,email}})


   }) .catch(err=>{
      res.status(400).json({
         err  : err.message 
      })
   })


 }

 //sign out clear cookie 
 exports.signout = (req, res) => {

   res.clearCookie("t");
   res.json({message : "Signout success"})
}


//decode  JWT and added to the req as auth object
exports.requireSignin = expressJwt({
   secret: process.env.JWT_SECRET,
   algorithms: ["HS256"], // added later
   userProperty: "auth",
 });


//if the user is authenticate or not
 //compare the user from express-jwt output with the user from the request
 exports.isAuth = (req,res,next)=>{
    
   let user = req.profile && req.auth && req.profile.id == req.auth.id;

   if(!user){
       return res.status(403).json({
           error :  "Access denied"
       })
   }
   next();
}
