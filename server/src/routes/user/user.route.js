import express from "express";


const router = express.Router();

router.get('/', (req, res) => {
    res.json("User Hello")
})

export default router;