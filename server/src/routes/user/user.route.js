import express from "express";
import {signUp, 
    signIn, 
    getUsers, 
    getUserNameById, 
    getUserinfo,
    UserInfoChange, 
    passwordChange,
    authenticateToken,
    getPost,
    Logout,
    getToken,
    authsignIn} from "./user.controller.js"


const router = express.Router();

router.get('/getUsers', getUsers);
router.get('/getUserinfo/:userName', getUserinfo);
router.get('/getUser/:id', getUserNameById)
router.put('/UserInfoChange/:id', UserInfoChange);
router.get('/posts', authenticateToken, getPost);
// router.post('/authLogin', authLogin);
router.delete('/logout', Logout)
router.post('/token', getToken)




router.post('/signup', signUp);

router.post('/signin', signIn)
router.post('/authSignin', authsignIn)

router.put('/passwordChange', passwordChange)

export default router;