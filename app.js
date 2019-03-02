const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const connection = require('./modules/database');
const filename = './index.html';

const port = process.env.PORT || 3800;
const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

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

app.get('/api/:rfid/:count', (req, res) => {
	connection.query('SELECT * FROM `items` WHERE `item_rfid` = ?', req.params.rfid, (err, result) => {
		if (!err) {
			if (result.length > 0) {
				connection.query('UPDATE `items` SET `item_state`= "varified" WHERE `item_rfid` = ?', req.params.rfid, (err) => {
					if (!err) {
						res.end('already exists');
					} else {
						res.end('already exists');
					}
				});
			} else {
				connection.query('INSERT INTO `items` ( `item_rfid`, `item_timestamp`, `item_position` ) VALUES (?,?,?)', 
					[req.params.rfid, new Date(), req.params.count], 
				(err) => {
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

app.post('/app/api/sync', (req, res) => {
	connection.query('SELECT * FROM `items` ORDER BY `item_position`', (err, result) => {
		if (!err) {
			if ( result.length > 0 ) {
				res.json({
					status: 'success',
					data: result
				});
			} else {
				res.json({
					status: 'no-data'
				});
			}
		} else {
			res.json({
				status: 'error',
				message: err
			});
		}
	});
});

app.post('/app/api/update/:item_rfid', (req, res) => {
	connection.query('UPDATE `items` SET `'+req.body.property+'`= ? WHERE `item_rfid` = ?', [req.body.value, req.params.item_rfid], (err) => {
		if (!err) {
			res.json({
				status: 'success'
			});
		} else {
			res.json({
				status: 'error',
				message: err
			});
		}
	});
});

app.post('/app/api/truncate', (req, res) => {
	connection.query('TRUNCATE TABLE `items`;', (err) => {
		if (!err) {
			res.json({
				status: 'success'
			});
		} else {
			res.json({
				status: 'error'
			});
		}
	});
});

app.listen(port, () => {
    console.log(`Server is live at ${port}`);
});