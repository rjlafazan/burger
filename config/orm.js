var connection = require("../config/connection.js");

var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne(): function(table, col, vals, cb) {
      var queryString ='INSERT INTO ' + table + ' (' + col + ') ' + 'VALUES (' + '?' + ')';

		connection.query(queryString, vals, function(err, result){
			if(err)throw err;
			cb(err, result);
		});
  }
};

module.exports = orm;
