const express = require('express')
const app = express.Router()
const model = require('../models/UserModel')

app.get('/:id/todos', (req, res) => {
  const { id } = req.params;
  client.query(`SELECT * FROM todos WHERE category_id=${id}`).then((data) => {
    res.send(data.rows)
  }).catch(err => {
    console.log('err : ', err);
    res.json(err)
  })
})

const tranformRowResult = (acc, nextItem) => {

  if (acc[nextItem.todo_id]) {
    acc[nextItem.todo_id].users[nextItem.user_id] = nextItem.user_name
  } else {
    acc[nextItem.todo_id] = {
      id: nextItem.todo_id,
      name: nextItem.todo_name,
      users: { [nextItem.user_id]: nextItem.user_name }
    }
  }
  return acc

}

app.get('/:id/todos/full', (req, res) => {
  const { id } = req.params;
  client.query(`SELECT todos.id as todo_id, 
  todos.name as todo_name, users.id as user_id, 
  CONCAT(lastname,' ',firstname) as user_name FROM todos 
INNER JOIN users_todos ON todo_id=todos.id 
INNER JOIN users ON users.id = users_todos.user_id
WHERE category_id=${id};`).then((data) => {

      res.send(data.rows.reduce(tranformRowResult, {}))
      //res.send(data.rows)
    }).catch(err => {
      console.log('err : ', err);
      res.json(err)
    })
})

module.exports = app;