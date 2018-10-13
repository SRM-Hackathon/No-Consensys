const PgClient = require('../app').PgClient;

module.exports.listAllDonationRequests = async function(req, res) {
	const query = `SELECT * FROM donation_requests`;

	let result = await PgClient.query(query);

	let arr = [];
	result.rows.map(row => arr.push(row));
	res.json(arr);
}

module.exports.findDonationRequestById = async function(req, res) {
	let id = req.params.id;
	const query = `SELECT * FROM donation_requests WHERE id=$1`;

	let result = await PgClient.query(query, [id]);

	if (result.rowCount == 0) {
		res.status(404);
		res.json({
			error: `Cannot find donation request by id ${id}`
		});
		return;
	}

	res.json(result.rows[0]);
}