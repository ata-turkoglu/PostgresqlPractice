const { Client } = require("pg")

const client = new Client({
    host: "localhost",
    user : "postgres",
    port: 5432,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,

})

client.connect()

module.exports = client