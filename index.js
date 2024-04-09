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
        if (err) throw err
        response(200, 'Ok', result, res)
    })
})

app.post('/product', (req, res) => {
    const { name, price, description } = req.body;
    const sql = `INSERT INTO products (name, price, description) VALUES ('${name}', ${price}, '${description}')`;

    db.query(sql, (err, result) => {
        if (err) throw response(500, 'Internal Server Error', err, res)
        console.log(result);
        if (result?.affectedRows) {
            const datas = {
                isSuccess: result.affectedRows,
                id: result.insertId
            }
            response(201, 'Created', datas, res)
        }
    })
})

app.put('/product', (req, res) => {
    const { id, name, price, description } = req.body;
    const sql = `UPDATE products SET name = '${name}', price = ${price}, description = '${description}' WHERE id = ${id}`;

    db.query(sql, (err, result) => {
        if (err) response(500, 'Internal Server Error', err, res)
        if (result?.affectedRows) {
            const datas = {
                isSuccess: result.affectedRows,
                message: result.message
            }
            response(200, 'Ok', datas, res)
        } else {
            response(404, 'Not Found', null, res)
        }
    })
})

app.delete('/product', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM products WHERE id = ${id}`;

    db.query(sql, (err, result) => {
        if (err) response(500, 'Internal Server Error', err, res)
        if (result?.affectedRows) {
            const datas = {
                isDelete: result.affectedRows,
                message: result.message
            }
            response(200, 'Ok', datas, res)
        } else {
            response(404, 'Not Found', null, res)
        }
    })
})

app.listen(port, () => {
    console.log(`running app listening at ${host}:${port}`);
})