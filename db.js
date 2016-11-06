var mysql      = require('mysql2');
var mysqlModel = require('mysql-model');
    var appModel = mysqlModel.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '1projectK!',
      database : 'chat',
    }); 

var User = appModel.extend({
    tableName: "user_table",
});
var Message = appModel.extend({
	tableName: "message_table",
});
var Ack = appModel.extend({
	tableName: "ack_table",
});

module.exports = {
  User : User,
  Message : Message
};    