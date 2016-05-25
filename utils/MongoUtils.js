var DEFAULT_HOST = 'localhost';
var DEFAULT_DB = 'mazes';

module.exports = {

	fixturesDb: function() {
		return process.env.MONGO_DB || DEFAULT_DB;
	},

	fixturesOptions: function() {
		var mongoOptions = {
			host: process.env.MONGO_HOST || DEFAULT_HOST
		};
		if (process.env.MONGO_PORT) {
			mongoOptions.port = process.env.MONGO_PORT;
		}
		if (process.env.MONGO_USER) {
			mongoOptions.user = process.env.MONGO_USER;
		}
		if (process.env.MONGO_PASS) {
			mongoOptions.pass = process.env.MONGO_PASS;
		}
		return mongoOptions;
	},

	mongoUrl: function() {
		if (process.env.MONGODB_URI) {
			return process.env.MONGODB_URI;
		}

		var mongoUrl = '';
		if (process.env.MONGO_USER) {
			mongoUrl += process.env.MONGO_USER;

			if (process.env.MONGO_PASS) {
				mongoUrl += ':' + process.env.MONGO_PASS;
			}

			mongoUrl += '@';
		}

		if (process.env.MONGO_HOST) {
			mongoUrl += process.env.MONGO_HOST;
		} else {
			mongoUrl += DEFAULT_HOST;
		}

		if (process.env.MONGO_PORT) {
			mongoUrl += ':' + process.env.MONGO_PORT;
		}

		mongoUrl += '/' + (process.env.MONGO_DB || DEFAULT_DB);
		return mongoUrl;
	}

};