import express from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { authsignIn } from "../user/user.controller.js";
import { signIn } from "../admin/admin.controller.js";

dotenv.config();

const router = express.Router();

router.post('/userLogIn', authsignIn);

router.post('/adminLogIn', signIn)


export default router;