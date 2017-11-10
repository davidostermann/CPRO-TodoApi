const { Client } = require('pg')
const client = new Client({
  connectionString: 'postgres://postgres:changeme@localhost:5432/tododb'
})
client.connect().then(() => {
  console.log('successfully connected')
  
}).catch((err) => {
  console.log('error :', err)
})


module.exports = client;