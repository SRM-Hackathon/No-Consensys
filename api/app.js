const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pgClient = new pg.Client({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	keepAlive: true
});
pgClient.connect()
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => {
		console.error('Error connecting to database: ' + err);
	});
module.exports.PgClient = pgClient;

const ApiRouter = require('./routers/apiRouter');

app.use('/api/', ApiRouter);

const port = 8001;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
