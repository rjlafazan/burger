var connection = require("../config/connection.js");

var orm = {
    selectAll: function (table, cb) {
        var queryString = 'SELECT * FROM ' + table + ';';
		connection.query(queryString, function(err, result){
			if(err)throw err;
			cb(result);
   
    }
}

module.exports = orm;
