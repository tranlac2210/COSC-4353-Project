import express from "express";
import bodyParser  from "body-parser";
import adminRoutes from "./src/routes/admin.js";

const app = express();
const PORT = 9000;

app.use(bodyParser.json());

app.use('/admin', adminRoutes);

app.get('/', (req, res) => {

    res.send("Mainpage");
})

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));