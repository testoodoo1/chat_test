var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('message_table', {
		id : { type : 'int', primaryKey :true },
		group_id : { type : 'string' },
		from_user : { type : 'string'},
		to_user : { type : 'string' },
		message_id : { type : 'string' },
		message_body : { type : 'string' },
		status : { type : 'string' },
		created_at : { type : 'timestamp' },
		updated_at : { type : 'timestamp' }
	}, callback );
};

exports.down = function(db, callback) {
  	db.dropTable( 'message_table', callback);
};
