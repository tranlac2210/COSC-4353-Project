const express = require("express")
const bodyParser = require("body-parser")


const app = express();
const PORT = 9000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("Get")

    res.send("Hello from my");
});

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));