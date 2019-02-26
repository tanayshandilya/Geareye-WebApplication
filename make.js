const conn = require('./modules/database');

const SQL = 'CREATE TABLE IF NOT EXISTS `rfid` (`id` int(100) NOT NULL AUTO_INCREMENT, `rfid` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8';

conn.query(SQL, (err) => {
	if (!err) {
		console.log('Query successfully executed');
	} else {
		console.log(err);
	}
});