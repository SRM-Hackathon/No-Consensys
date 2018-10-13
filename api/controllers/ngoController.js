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

module.exports.createNgo = function(req, res) {
	if (req.get('Content-Type') != 'application/json') {
		res.status(400);
		res.json({
			error: 'Content type should be application/json'
		});
		return;
	}

	let name = req.body.name;
	let description = req.body.description;
	let address = req.body.address;

	const query = `INSERT INTO ngos VALUES (default, $1, $2, $3)`;

	PgClient.query(query, [name, description, address])
		.then(() => {
			res.status(201);
			res.json({
				message: 'NGO has been created successfully'
			});
		})
		.catch((err) => {
			res.status(500);
			res.json({
				error: 'Could not create NGO'
			});
		});
}

module.exports.findNgoById = function(req, res) {
	let id = req.params.id;

	const query = `SELECT * FROM ngos WHERE id=$1`;
	PgClient.query(query, [id])
		.then((result) => {
			if (result.rowCount == 0)
				return Promise.reject('Could not find NGO');
			let ngo = result.rows[0];
			res.json(ngo);
		})
		.catch(() => {
			res.json({
				error: `Cannot find NGO with id ${id}`
			});
		})
}

module.exports.listAllDonationRequests = async function(req, res) {
	let id = req.params.id;

	const query = 
		`SELECT * FROM ngos
		INNER JOIN donation_requests ON donation_requests.ngo_id=ngos.id
		AND ngos.id=$1`;

	let result = await PgClient.query(query, [id]);

	let arr = [];
	result.rows.map(row => arr.push(row));
	res.json(arr);
}