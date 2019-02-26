const express = require('express');
const bp = require('body-parser');
const connection = require('./modules/database');

const port = process.env.PORT || 4800;
const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Hello'
	});
});

app.get('/add/:rfid', (req, res) => {
	connection.query('SELECT * FROM `rfid` WHERE `rfid` = ?', req.params.rfid, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				res.end('ID already registered');
			} else {
				connection.query('INSERT INTO `rfid` ( `rfid` ) VALUES (?)', req.params.rfid, (err) => {
					if (!err) {
						res.end('Added successfully');
					} else {
						res.end(`SQL Error: ${err}`);
					}
				});
			}
		} else {
			res.end(`SQL Error: ${err}`);
		}
	});
});

app.get('/validate/:rfid', (req, res) => {
	connection.query('SELECT * FROM `rfid` WHERE `rfid` = ?', req.params.rfid, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				res.end('true');
			} else {
				res.end('false');
			}
		} else {
			res.end(`SQL Error: ${err}`);
		}
	});
});

app.listen(port, () => {
    console.log(`Server is live at ${port}`);
});