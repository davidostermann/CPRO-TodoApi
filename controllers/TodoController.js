const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
  client.query('SELECT * from todos').then((data) => {
    res.send(data.rows)
  }).catch(err => {
    res.json(err)
  })
})

app.post('/', (req, res) => {
  const { name, categoryId } = req.body; // es6 destructuring
  client.query(`INSERT INTO todos(id, name, category_id) VALUES (DEFAULT, '${name}', ${categoryId});`).then((data) => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })
})

module.exports = app;