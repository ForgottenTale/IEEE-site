const mysql = require('mysql');
const {schema} = require('./ddl.js'); 
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

connection.connect();

connection.query(schema.join(), function (err, results, fields) {
  if (err) throw error;
});

module.exports = {
  findOne: function (id, done) {
    let query = "SELECT * FROM USERS WHERE email='" + id.email + "';";
    connection.query(query, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      done(null, results[0]);
    })
  },

  insertUser: function (user, done) {
    
    let values = [user.name, user.email, user.password]
    .map(elem=>{
      return "'" + elem + "'"
    })
    .join(',');
    let query = "INSERT INTO users(name, email, password) VALUES(" + values + ");";
    console.log(query);
    connection.query(query, (err, results, fields) => {
      done(err, results);
    })
  },

  insertIntoForm: function (record) {
    let insertIntoForm = `insert into form(name, email, subject, msg) values('` + [record.name, record.email, record.subject, record.msg].join("', '") + "');";
    connection.query(insertIntoForm, (err, results, fields) => {
      if (err) throw err;
      console.log("INSERTED IN DB")
    })
  }
}