const express = require("express");
const router = express.Router();


const { userById } = require("../controllers/user");

const { create, list , spaceById, remove, get ,update} = require("../controllers/space");


const { isAuth, requireSignin } = require("../controllers/auth");

router.post("/space/create/:userId", requireSignin, isAuth, create);
router.post("/space/update/:userId", requireSignin, isAuth, update);
router.get("/spaces/:userId", requireSignin, isAuth, list);
router.get("/space/:spaceId/:userId", requireSignin, isAuth, get);
router.delete("/space/:spaceId/:userId", requireSignin, isAuth, remove);




router.param("userId", userById);
router.param("spaceId",spaceById);

module.exports = router
