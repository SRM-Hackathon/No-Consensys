const fs = require('fs-extra');
const solc = require('solc');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');
const solContractPath = path.resolve(__dirname, 'contracts', 'reqContract.sol');

fs.removeSync(buildPath);

let solFile = fs.readFileSync(solContractPath, 'utf8');
let output = solc.compile(solFile, 1).contracts;
fs.ensureDirSync(buildPath);

for (contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(':', '') + '.json'),
		output[contract]
	);
}