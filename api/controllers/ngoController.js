const PgClient = require('../app').PgClient;

module.exports.listAllNgos = function(req, res) {
	const query = `SELECT * FROM ngos`;

	let arr = [];
	PgClient.query(query)
		.then((result) => {
			result.rows.map(row => arr.push(row));
		})
		.then(() => {
			res.json(arr);
		})
		.catch((err) => {
			res.json({
				error: err
			});
		});
}