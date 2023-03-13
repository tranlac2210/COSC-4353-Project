import express from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();


let posts = [
    {
        username: 'Chu',
        title: 'Post 1'
    },
    {
        username: 'Chuong',
        title: 'Post 2'
    }
]

router.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})

router.post('/login', (req, res) => {
    // Authenticate User

    const username = req.body.username;

    const user = { name: username};

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    })
})

let refreshTokens = [];

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})

router.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) res.sendStatus(401);

    if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken({name: user.name})

        res.json({
            accessToken: accessToken
        })
    })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

export default router;