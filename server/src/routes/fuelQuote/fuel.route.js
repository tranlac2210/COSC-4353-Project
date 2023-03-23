import express from "express";
import {getFuelInfo, quotes} from "./fuel.controller.js"


const router = express.Router();
router.post('/getFuelInfo', getFuelInfo);
//router.post('/quotes', quotes);



export default router;