import express from "express";
import {signUp, signIn, getUsers,getUserinfo,UserInfoChange, passwordChange} from "./user.controller.js"


const router = express.Router();

router.get('/getUsers', getUsers);
router.get('/getUserinfo/:userName', getUserinfo);
router.put('/UserInfoChange', UserInfoChange);


router.post('/signup', signUp);

router.post('/signin', signIn)

router.put('/passwordChange', passwordChange)

export default router;