const express = require('express')
const client = require('../model/db')
const model = require('../model/UserModel')

module.exports = express.Router()

.get('/', (req, res) => {
  model.getAllUsers().then((data) => {
    res.send(data.rows)
  }).catch(err => {
    res.json(err)
  })
})

.post('/', (req, res) => {
  const {firstname, lastname} = req.body
  model.createUser(firstname, lastname).then((data) => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })
})

.get('/:id', (req, res) => {
  const { id } = req.params;
  model.getUserById(id).then((data) => {
    res.send(data.rows)
  }).catch(err => {
    res.json(err)
  })
})

.put('/:id', (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body; // es6 destructuring
  model.updateUser(id, firstname, lastname).then((data) => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
})

.delete('/:id', (req, res) => {
  const { id } = req.params;
  model.deleteUser(id).then((data) => {
    res.json(data)
  }).catch(err => {
    res.json(err)
  })
})

.get('/:id/todos', (req, res) => {
  const { id } = req.params;
  model.getUserTodos(id).then((data) => {
    res.send(data.rows)
  }).catch(err => {
    console.log('err : ', err);
    res.json(err)
  })
})