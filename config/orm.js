var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: function(table, col, condition, cb) {
    var colArr = [];
    for (var key in col) {
      if (col.hasOwnProperty(key)) {
        colArr.push(key + "=" + col[key]);
      }

      var devourString = colArr.toString();
    }

    var queryString =
      "UPDATE " + table + " SET " + devourString + " WHERE " + condition;

    connection.query(queryString, condition, function(err, result) {
      if (err) throw err;
      cb(err, result);
    });
  },
};

module.exports = orm;
