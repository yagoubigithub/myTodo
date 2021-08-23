
const {create , read , findOneById, removeSpace, update} = require("../models/space")



//create new space and return the new data
exports.create = (req, res) => {

   console.log(req.body)
    create( req.body , req.profile.id ).then(space=>{

     
        res.status(200).json({
           ...space
        })
     })
     .catch(err=>{
        res.status(400).json({
           error  : err.message 
        })
     })

}

//get all spaces 

exports.list = (req, res)=>{

   read(req.profile.id).then(( spaces)=>{
      
       res.json(spaces)
   })
   .catch(err=>{
      res.status(400).json({
         error  : err.message 
      })
   })
   
}


//get one
exports.spaceById = (req, res, next, id) => {

 findOneById(id).then(space=>{

    if(!space){
       return res.status(400).json({
          error : "space with that id doesn't exist "
       })
    }

    req.space = space;
    next();

})


}



//remove the space form the database by calling the removeSpace model
exports.remove = (req, res)=>{
   removeSpace(req.space.id, req.profile.id).then(( spaces)=>{
      
      res.json(spaces)
  })
  .catch(err=>{
     res.status(400).json({
        error  : err.message 
     })
  })
}


exports.get = (req, res) => {

 
   return res.json(req.space)
  
  }


  //update the space and return the updated data
  exports.update = (req, res) => {
    update( req.body , req.profile.id ).then(space=>{

     
        res.status(200).json({
           ...space
        })
     })
     .catch(err=>{
        res.status(400).json({
           error  : err.message 
        })
     })

}
