const mysql = require('mysql');
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'svits_app'
// });
const con = mysql.createConnection({
  host     : 'reoftapi.cn5ycqth9imu.ap-south-1.rds.amazonaws.com',
  user     : 'reoftapiuser',
  password : '#Re0FtapiT3sT',
  database : 'svits_app'
});

con.connect(function(err) {
  if (err) throw err;
  console.log(`MySQL Database connection established successfully: ${new Date()}`);
});

module.exports = con;