import { Connection, createConnection } from 'mysql2'
import 'dotenv/config'

const connection: Connection = createConnection( {
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
})

connection.connect()

connection.query('SELECT * FROM nadestack.NADE',
function (error, results) {
    if (error) throw error
    console.log(results)
})
connection.end()