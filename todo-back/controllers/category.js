
const {create , read , findOneById, removeCategory, update} = require("../models/category")


//create category buy create model and return the new category
exports.create = (req, res) => {
    create( req.body.category , req.profile.id ).then(category=>{
     
        res.status(200).json({
           ...category
        })
     })
     .catch(err=>{
        res.status(400).json({
           error  : err.message 
        })
     })

}

//retun all catigories

exports.list = (req, res)=>{

   read(req.profile.id).then(( categories)=>{
      
       res.json(categories)
   })
   .catch(err=>{
      res.status(400).json({
         error  : err.message 
      })
   })
   
}



//get one category using his id
exports.categoryById = (req, res, next, id) => {

 findOneById(id).then(category=>{

    if(!category){
       return res.status(400).json({
          error : "category with that id doesn't exist "
       })
    }

    req.category = category;
    next();

})


}



//remove category

exports.remove = (req, res)=>{
   removeCategory(req.category.id, req.profile.id).then(( categories)=>{
      
      res.json(categories)
  })
  .catch(err=>{
     res.status(400).json({
        error  : err.message 
     })
  })
}


exports.get = (req, res) => {

 
   return res.json(req.category)
  
  }

  

  exports.update = (req, res) => {

  
   update( req.body , req.profile.id ).then(category=>{
       res.status(200).json({
          ...category
       })
    })
    .catch(err=>{
       res.status(400).json({
          error  : err.message 
       })
    })

}
