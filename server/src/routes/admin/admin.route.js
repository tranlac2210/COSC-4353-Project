import express from "express";
import {getClients, deactivateClient, modifyClientInfo, getClientOrder} from "./admin.controller.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Admin Hello")
})

router.get('/getClients', getClients);

router.get('/deactivateClient/:id', deactivateClient)

router.post('/modifyClientInfo', modifyClientInfo);

router.get('/getClientOrder/:id', getClientOrder)




export default router;