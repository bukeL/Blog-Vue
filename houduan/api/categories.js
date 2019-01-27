var mysql = require('mysql')

//1 创建连接
var mysql      = require('mysql');
var json = {}
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'baixiu_dev'
});
 
connection.connect();
 
connection.query('SELECT * from users', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
   json = results
});
 
connection.end();

module.exports = json