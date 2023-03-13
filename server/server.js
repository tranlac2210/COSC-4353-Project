import express from "express";
import bodyParser  from "body-parser";
import cors from "cors"
import adminRoutes from "./src/routes/admin/admin.route.js";
import userRoutes from "./src/routes/user/user.route.js"
import AuthRoutes from "./src/routes/auth/auth.route.js"

const app = express();
const PORT = 9000;

app.use(cors());

app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);

app.use('/api/user', userRoutes);

app.use('/api/auth', AuthRoutes);


app.get('/', (req, res) => {

    res.send("Mainpage");
})

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}...`));