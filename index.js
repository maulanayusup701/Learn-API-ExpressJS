const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./connection');
const response = require('./response');
require('dotenv').config();
const port = process.env.PORT
const host = process.env.HOST

app.use(bodyParser.json())

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';

    db.query(sql, (err, result) => {
        response(200, 'Ok', result, res)
    })
})

app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM products WHERE id = ${id}`;

    db.query(sql, (err, result) => {
        // console.log({ id: id });
        response(200, 'Ok', result, res)
    })
})

app.post('/product/create', (req, res) => {
    const { name, price, description, } = req.body;

    const sql = `INSERT INTO products (name, price, description,) VALUES ('${name}', '${price}', '${description}')`;
    db.query(sql, (err, result) => {
        console.log(result);
    })
    res.send("oke");
})

app.post("/register", (req, res) => {
    res.send('User has been created!');
})

app.post("/login", (req, res) => {
    console.log({ requestFromOutside: req.body });
    res.send('User has been logged in!');
})

app.put("/username", (req, res) => {
    console.log({ updateData: req.body });
    res.send("Username has been updated");
})

app.listen(port, () => {
    console.log(`running app listening at ${host}:${port}`);
})