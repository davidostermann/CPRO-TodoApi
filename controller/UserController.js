const express = require('express')
const app = express.Router()
const client = require('../model/db')
const model = require('../model/UserModel')

app.get('/', (req, res) => {
  client.query('SELECT * from users').then((data) => {
    res.send(data.rows)
  }).catch(err => {
    res.json(err)
  })
})

app.post('/', (req, res) => {
  const { firstname, lastname } = req.body; // es6 destructuring
  client.query(`INSERT INTO users(id, firstname, lastname) VALUES (DEFAULT, '${firstname}', ${lastname});`).then((data) => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })
})

app.get('/:id', (req, res) => {
  const { id } = req.params;
  client.query(`SELECT * from users WHERE id=${id}`).then((data) => {
    res.send(data.rows)
  }).catch(err => {
    res.json(err)
  })
})

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body; // es6 destructuring
  client.query(`UPDATE users 
    SET firstname = '${firstname}', lastname = '$ {lastname}'
   WHERE id=${id};`).then((data) => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
})

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  client.query(`DELETE FROM users WHERE id=${id};`).then((data) => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })
})

app.get('/:id/todos', (req, res) => {
  const { id } = req.params;
  client.query(`SELECT * FROM todos, users_todos WHERE id = todo_id AND user_id = ${id}`).then((data) => {
    res.send(data.rows)
  }).catch(err => {
    console.log('err : ', err);
    res.json(err)
  })
})

module.exports = app;