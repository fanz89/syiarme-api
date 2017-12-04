var mysql = require("mysql");
var config = require('../config-db.json');

// console.log(config);

function Connection() {
 
  this.pool = null;
  
  this.init = function() {
    this.pool = mysql.createPool(config);
  }
 
  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      console.log('Connected!!');
      callback(err, connection);
    });
  };
}

module.exports = new Connection();