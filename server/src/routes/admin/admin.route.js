import express from "express";
import {getClients, deactivateClient, modifyClientInfo, getClientOrder, signIn, signUp, getAdmins, passwordChange} from "./admin.controller.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Admin Hello")
})

router.get('/getClients', getClients);

router.get('/deactivateClient/:id', deactivateClient)

router.post('/modifyClientInfo', modifyClientInfo);

router.get('/getClientOrder/:id', getClientOrder)

router.post('/signup', signUp);

router.post('/signin', signIn);

router.put('/passwordChange', passwordChange);

router.get('/getAdmins', getAdmins);




export default router;