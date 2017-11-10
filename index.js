const express = require('express')
const userController = require('./controller/UserController')
const todoController = require('./controller/TodoController')
const catController = require('./controller/CatController')
const app = express()

app.use(express.json()) // middleware qui permet de parser du json envoyé en POST

app.get('/', (req, res) => {
  res.send('coucou')
})

// Users

app.use('/user', userController)
app.use('/todo', todoController)
app.use('/category', catController)

app.listen(3000, function(err) {
  if(err) {
    console.log('NO CONNEXION')
  }
  console.log('CONNEXTION REUSSI SUR LE PORT 3000')
})