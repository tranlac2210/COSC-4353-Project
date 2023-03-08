import express from "express";
import {signIn, signUp, passwordChange} from "../controllers/admin.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello");
})

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/passwordchange', passwordChange);



export default router;