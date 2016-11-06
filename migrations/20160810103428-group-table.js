var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('group_table',{
		id : { type : 'int', primaryKey : true },
		group_id : { type : 'string' },
		group_user : { type : 'string' },
		created_at : { type : 'timestamp' },
		updated_at : { type : 'timestamp' }
	}, callback);
};

exports.down = function(db, callback) {
	db.dropTable('group_table', callback);
};
