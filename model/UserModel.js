const client = require('./db.js')

module.exports = {

  getAllUsers() {
    return client.query('SELECT * from users')
  },
  createUser(firstname, lastname) {
    return client.query(`INSERT INTO users(id, firstname, lastname) VALUES (DEFAULT, '${firstname}', '${lastname}');`)
  },
  getUserById(id) {
    return client.query(`SELECT * from users WHERE id=${id}`)
  },
  updateUser(id, firstname, lastname) {
    return client.query(`UPDATE users 
    SET firstname = '${firstname}', lastname = '${lastname}'
   WHERE id=${id};`)
  },
  deleteUser(id) {
    return client.query(`DELETE FROM users WHERE id=${id};`)
  },
  getUserTodos(id) {
    return client.query(`SELECT * FROM todos, users_todos WHERE id = todo_id AND user_id = ${id}`)
  }
}