
const express = require("express");
const router = express.Router();


const { userById } = require("../controllers/user");

const { create, list , todoById, remove, get,update } = require("../controllers/todo");
const { spaceById } = require("../controllers/space");


const { isAuth, requireSignin } = require("../controllers/auth");

router.post("/todo/create/:spaceId/:userId", requireSignin, isAuth, create);
router.post("/todo/update/:userId", requireSignin, isAuth, update);
router.get("/todos/:spaceId/:userId", requireSignin, isAuth, list);
router.get("/todo/:todoId/:userId", requireSignin, isAuth, get);
router.delete("/todo/:spaceId/:todoId/:userId", requireSignin, isAuth, remove);




router.param("userId", userById);
router.param("todoId",todoById);
router.param("spaceId",spaceById);

module.exports = router