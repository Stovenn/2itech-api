"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.log(req.url);
    res.json({ message: 'hello' });
});
app.listen(3000, () => console.log("Server is running..."));
//# sourceMappingURL=main.js.map