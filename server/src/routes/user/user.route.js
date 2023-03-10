import express from "express";
import {signUp, signIn, getUsers, passwordChange} from "./user.controller.js"


const router = express.Router();

router.get('/getUsers', getUsers);

router.post('/signup', signUp);

router.post('/signin', signIn)

router.put('/passwordChange', passwordChange)

export default router;