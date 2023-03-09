import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.json("Admin Hello")
})




export default router;