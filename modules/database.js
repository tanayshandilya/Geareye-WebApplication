const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'svits_app'
});

con.connect(function(err) {
  if (err) throw err;
  console.log(`MySQL Database connection established successfully: ${new Date()}`);
});

module.exports = con;