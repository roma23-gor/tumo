import express from "express";
import fs from "fs";

const app = express();

app.use(express.static('./'));
app.use(express.json());

app.post('/stats', (req, res) => {
    fs.appendFileSync('statistik.txt', JSON.stringify(req.body) + '\n');
});

app.listen(4000, () => {
    console.log('Ok');
});