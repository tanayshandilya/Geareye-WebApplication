const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const connection = require('./modules/database');
const filename = './index.html';

const port = process.env.PORT || 4800;
const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.get('/', (req, res) => {
	res.writeHead(200, {"Content-Type":"text/html"});
    fs.readFile(filename, "utf8", function (err, data) {
    if (!err) {
    	res.write(data);
    	res.end();
    } else {
    	res.write(err);
    	res.end();
    }
    });
});

app.get('/api/:rfid', (req, res) => {
	connection.query('SELECT * FROM `rfid` WHERE `rfid` = ?', req.params.rfid, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				res.end('already exists');
			} else {
				connection.query('INSERT INTO `rfid` ( `rfid` ) VALUES (?)', req.params.rfid, (err) => {
					if (!err) {
						res.end('added successfully');
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

app.listen(port, () => {
    console.log(`Server is live at ${port}`);
});