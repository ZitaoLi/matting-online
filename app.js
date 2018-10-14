const express = require('express')
const app = express()
const port = 3000

// app.set('view engine', 'ejs')

app.use("/", express.static(__dirname + "/public"));
// app.use("/", express.static(__dirname + "/public/html"));

// app.get('/', (req, res) => res.render('index'));
// app.get('/fuck', (req, res) => res.render('fuck'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))  