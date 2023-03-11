import express from "express";
import {signUp, 
    signIn, 
    getUsers, 
    getUserNameById, 
    getUserinfo,
    UserInfoChange, 
    passwordChange} from "./user.controller.js"


const router = express.Router();

router.get('/getUsers', getUsers);
router.get('/getUserinfo/:userName', getUserinfo);
router.get('/getUser/:id', getUserNameById)
router.put('/UserInfoChange/:id', UserInfoChange);


router.post('/signup', signUp);

router.post('/signin', signIn)

router.put('/passwordChange', passwordChange)

export default router;