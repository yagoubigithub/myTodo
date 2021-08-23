const {findOneById} = require("../models/user")



//midlaware to get user using the id and added to the req as profile
exports.userById = (req, res, next, id) => {
 findOneById(id).then(user=>{

    if(!user){
       return res.status(400).json({
          error : "User with that id doesn't exist "
       })
    }

    req.profile = user;
    next();

})


}