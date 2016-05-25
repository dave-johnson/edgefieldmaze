'use strict';

var fs = require('fs');
var express = require('express');
var BPromise = require('bluebird');

var httpApp = express();
var httpPort = Number(process.env.PORT || 5005);
var httpServer = require('http').createServer(httpApp);

var MongoUtils = require('./utils/MongoUtils');

//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//mongoose.connect(MongoUtils.mongoUrl());

//const Mazes = mongoose.model('mazes', { maze: Schema.Types.Mixed });

var monk = require('monk');
var db = monk(MongoUtils.mongoUrl());


const _collection = db.get('mazes');

// parse input
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
httpApp.use(bodyParser.urlencoded({extended: false}));
httpApp.use(bodyParser.json());


/**
 * APPLICATION ROUTING
 */
httpApp.get('/api/mazes/:id', BPromise.coroutine(function*  (req, resp) {

	let maze = yield _collection.findOne(
		{
			_id: req.params.id
		}
	);

	if(maze)
		return resp.json(maze);

	return resp.sendStatus(404);
}));

httpApp.post('/api/mazes', BPromise.coroutine(function*  (req, resp) {

	yield _collection.insert(
		req.body.json,
		{
			w: 1
		}
	);

	return resp.sendStatus(200);

}));

httpApp.use(express.static('public'));
httpApp.use(function (err, req, res, next) {
	debug(err.stack);
	res.status(500).json({error: 'Internal Server Error'});
});


httpServer.listen(httpPort, function() {
	console.log('started');
});