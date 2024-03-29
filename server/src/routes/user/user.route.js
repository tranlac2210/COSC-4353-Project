import express from "express";
import {signUp, 
    signIn, 
    getUsers, 
    UserInfoChange, 
    passwordChange,
    authenticateToken,
    Userpostfuel,
    getUsersorder,
    getPost,
    // Logout,
    // getToken,
    authsignIn,
    fuelQuote} from "./user.controller.js"


const router = express.Router();

router.get('/getUsers', getUsers);
router.post('/UserInfoChange', authenticateToken, UserInfoChange); 
router.post('/Userpostfuel', authenticateToken, Userpostfuel); 
router.post('/fuelQuote', authenticateToken, fuelQuote); 
router.get('/getUsersorder', authenticateToken, getUsersorder); 
router.get('/authGetUsers', authenticateToken, getPost); 
// router.delete('/logout', Logout) // We don't use this
// router.post('/token', getToken) // We don't use this
router.post('/signup', signUp);
router.post('/signin', signIn)
router.post('/authSignin', authsignIn) 
router.post('/passwordChange',authenticateToken, passwordChange) 

export default router;