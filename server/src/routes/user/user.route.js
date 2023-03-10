import express from "express";
import {signUp, signIn} from "./user.controller.js"


const router = express.Router();

router.get('/', (req, res) => {
    res.json("User Hello")
})

router.post('/signup', signUp);

router.post('/signin', signIn)

export default router;