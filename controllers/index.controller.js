var modelName = 'Index';
const Index = require('../models/index');

exports.index = function(req,res) {
	res.status(200).send('Hello World');
};