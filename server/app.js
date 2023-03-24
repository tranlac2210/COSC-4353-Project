import express from "express";
import bodyParser  from "body-parser";
import cors from "cors"
import adminRoutes from "./src/routes/admin/admin.route.js";
import userRoutes from "./src/routes/user/user.route.js"
import AuthRoutes from "./src/routes/auth/auth.route.js"
import session from "express-session";

const app = express();

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
}));

app.use(cors());

app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);

app.use('/api/user', userRoutes);

app.use('/api/auth', AuthRoutes);


app.get('/', (req, res) => {

    res.send("Mainpage");
})

export default app;