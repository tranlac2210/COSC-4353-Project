import express from "express";
import {signIn, signUp, confirmOrderDatabase, priceModule, passwordChange} from "../controllers/user.js"


const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello");
})

router.post('/signIn', signIn);

router.post('/signup', signUp);

router.post('/confirmOrderDatabase', confirmOrderDatabase);

router.post('/priceModule', priceModule);

router.post('/passwordChange', passwordChange);

export default router;