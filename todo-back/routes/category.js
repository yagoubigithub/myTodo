const express = require("express");
const router = express.Router();


const { userById } = require("../controllers/user");

const { create, list , categoryById, remove, get, update } = require("../controllers/category");


const { isAuth, requireSignin } = require("../controllers/auth");

router.post("/category/create/:userId", requireSignin, isAuth, create);
router.post("/category/update/:userId", requireSignin, isAuth, update);
router.get("/categories/:userId", requireSignin, isAuth, list);
router.get("/category/:categoryId/:userId", requireSignin, isAuth, get);
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, remove);




router.param("userId", userById);
router.param("categoryId",categoryById);

module.exports = router
