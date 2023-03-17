/*import express from 'express';

let app = express();

app.get("/", function(req, res){

res.send("Привіт, світ");

});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send('<h1>Привіт' + name + '</h1>');
    
    });

app.listen(3000, function(){

console.log("Екземпляр запущено через порт 3000");

});

import express from 'express';

let app = express();

app.get("/", function(req, res){

res.send("Привіт, світ");

});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.redirect('https://www.google.com/search?q=' + name);
    
    });

app.listen(3000, function(){

console.log("Екземпляр запущено через порт 3000");

});


import fs from 'fs';
fs.writeFileSync('fail.txt', 'hellow' + '\n');
fs.appendFileSync('fail.txt', 'illia')
console.log(fs.readFileSync('fail.txt', 'utf8'))

;

console.log(fs.readFileSync('fail.txt', 'utf8'))

import express from 'express';
    let app = express();

app.get("/", function(req, res){
    res.send("<h1>Привіт, світ</h1>");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Привіт " + name +"</h1>");
});

app.listen(3000, function(){
    console.log("Екземпляр запущено через порт 3000");
});
*/


import express  from "express";
import {appendFileSyns} from 'fs';

const app = express();

app.use(express.static('./'));
app.use(express.json());

app.post('/stats', (req, res) => {
    appendFileSyns('statistik.txt', JSON.stringify(req.body) + '/n')
});

app.listen(4000, () => {
    console.log('Ok');
});