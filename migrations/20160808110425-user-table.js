var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.createTable('user_table', {
		id : { type : 'int', primaryKey : true},
		mob_num : { type : 'string'},
		user_id : { type : 'string'},
		created_at : { type : 'timestamp' },
		updated_at : { type : 'timestamp' },
		status : {type : 'string'}
	}, callback );
};

exports.down = function(db, callback) {
  	db.dropTable('user_table', callback);
};
