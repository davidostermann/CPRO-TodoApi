const client = require('./db.js')

const catchError = ( fn ) => {
  return fn().catch( err => {
    console.log('MODEL ERROR SQL : ', err.code)
    return Promise.reject(err);
  })
}

module.exports = {

  getAllUsers() {
    return catchError(() => client.query('SELECT * from use'))
  },
  createUser(firstname, lastname) {
    return catchError(() => client.query(`INSERT INTO users(id, firstname, lastname) VALUES (DEFAULT, '${firstname}', '${lastname}');`))
  },
  getUserById(id) {
    return catchError(() => client.query(`SELECT * from users WHERE id=${id}`))
  },
  updateUser(id, firstname, lastname) {
    return catchError(() => client.query(`UPDATE users 
    SET firstname = '${firstname}', lastname = '${lastname}'
   WHERE id=${id};`))
  },
  deleteUser(id) {
    return catchError(() => client.query(`DELETE FROM users WHERE id=${id};`))
  },
  getUserTodos(id) {
    return catchError(() => client.query(`SELECT * FROM todos, users_todos WHERE id = todo_id AND user_id = ${id}`))
  }
}