import express from "express";
import {
    getClients,
    deactivateClient, 
    modifyClientInfo, 
    getClientOrder, 
    signIn, 
    // signUp, 
    getAdmins, 
    // passwordChange,
    getClient} from "./admin.controller.js"

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Admin Hello")
})

router.get('/getClients', getClients);

router.get('/getClient/:id', getClient);

router.get('/deactivateClient/:id', deactivateClient)

router.put('/modifyClientInfo/:id', modifyClientInfo);

router.get('/getClientOrder/:id', getClientOrder)

// router.post('/signup', signUp); // We don't use this

router.post('/signin', signIn);

// router.put('/passwordChange', passwordChange); // // We don't use this

router.get('/getAdmins', getAdmins);





export default router;