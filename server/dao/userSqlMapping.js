// CRUD SQL语句
var user = {
	insert:'INSERT INTO user(id, username) VALUES(0,?)',
	update:'update user set username=? where id=?',
	delete: 'delete from user where id=?',
	queryById: 'select * from user where id=?',
	queryAll: 'select * from sila_site'
};

module.exports = user;