const express = require("express");
const app = express();

app.get("/api/test", (req, res) => {
    res.json({"testkey": "testvalue"})
});

app.listen(5000);