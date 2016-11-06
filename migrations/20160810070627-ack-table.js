var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('ack_table', {
		id : { type : 'int', primaryKey : true },
		message_id : { type : 'string' },
		status : { type : 'string' },
		created_at : { type : 'timestamp' },
		updated_at : { type : 'timestamp' }

	}, callback );
  
};

exports.down = function(db, callback) {
  db.dropTable('ack_table', callback);
};
