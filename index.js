const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log({ urlParam: req.query });
    res.send('Hello World!');
});

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
    console.log(`Example app listening at http://localhost:${port}`);
})