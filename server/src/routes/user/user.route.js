import express from "express";
import {signUp, 
    signIn, 
    getUsers, 
    UserInfoChange, 
    passwordChange,
    authenticateToken,
    getPost,
    Logout,
    getToken,
    getFuelInfo,
    authsignIn} from "./user.controller.js"


const router = express.Router();

router.get('/getUsers', getUsers);
router.post('/UserInfoChange', authenticateToken, UserInfoChange); // unit test
router.get('/authGetUsers', authenticateToken, getPost); // unit test
router.delete('/logout', Logout) // unit test
router.post('/token', getToken) // unit test
router.post('/getFuelInfo', authenticateToken, getFuelInfo);
router.post('/signup', signUp); // unit test
router.post('/signin', signIn)
router.post('/authSignin', authsignIn) // unit test
router.post('/passwordChange',authenticateToken, passwordChange) // unit test

export default router;