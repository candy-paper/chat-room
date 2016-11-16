var mysql = require('mysql');
var util = require('util');
var User = {
    connect: function () {
        var client = mysql.createConnection({
            user: 'root',
            password: '',
            port: 3307,
            host: '127.0.0.1'
        });
        client.connect();
        client.query("use logindb");
        return client;
    },
    register: function (user, callback) {
        var self = this;
        var sql = "select * from  user where email=" + user.email;
        var client = self.connect();
        client.query(sql, function (err, results) {
            if (results && results.length > 0) {
                callback(new Error('email has been exist'), results);
            } else {
                self.add(user, callback);
            }
        });
        client.end();
    },
    add: function (user, callback) {
        var self = this;
        var client = self.connect();
        var sql = util.format("INSERT INTO USER(name, password,email,createtime) VALUES('%s', '%s','%s','%s')", user.name, user.password,user.email,user.createtime);
        client.query(sql,callback);

    }
};
module.exports = User;