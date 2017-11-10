const express = require('express')
const userController = require('./controllers/UserController')
const todoController = require('./controllers/TodoController')
const catController = require('./controllers/CatController')
const app = express()

app.use(express.json()) // middleware qui permet de parser du json envoyé en POST

const { Client } = require('pg')
const client = new Client({
  connectionString: 'postgres://postgres:changeme@localhost:5432/tododb'
})
client.connect().then( () => {
  console.log('successfully connected')
}).catch( (err) => {
  console.log('error :', err)
})

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