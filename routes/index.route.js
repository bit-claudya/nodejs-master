module.exports = function(app) {
	const application = require('../controllers/index.controller');
	const url = '/index';

	app.get(url, application.index);
}