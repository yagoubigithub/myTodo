
const {create , read , findOneById, removeTodo, update} = require("../models/todo")



//create new todo
exports.create = (req, res) => {

    create( req.body.todo , req.profile.id, req.space.id ).then(todo=>{
        res.status(200).json({
           ...todo
        })
     })
     .catch(err=>{
        res.status(400).json({
           error  : err.message 
        })
     })

}


//update the todo 

exports.update = (req, res) => {
  

   update( req.body , req.profile.id ).then(todo=>{
       res.status(200).json({
          ...todo
       })
    })
    .catch(err=>{
       res.status(400).json({
          error  : err.message 
       })
    })

}


//get all todo in one space
exports.list = (req, res)=>{

   read(req.profile.id , req.space.id).then(( todos)=>{
      
       res.json(todos)
   })
   .catch(err=>{
      res.status(400).json({
         error  : err.message 
      })
   })
   
}



//midelware todo to get the todo and added to the req

exports.todoById = (req, res, next, id) => {

 findOneById(id).then(todo=>{

    if(!todo){
       return res.status(400).json({
          error : "todo with that id doesn't exist "
       })
    }

    req.todo = todo;
    next();

})


}


//remove todo

exports.remove = (req, res)=>{
   removeTodo(req.todo.id, req.profile.id, req.space.id).then(( todos)=>{
      res.json(todos)
  })
  .catch(err=>{
     res.status(400).json({
        error  : err.message 
     })
  })
}


//get the todo
exports.get = (req, res) => {
   return res.json(req.todo)
  
  }