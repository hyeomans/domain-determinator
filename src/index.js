'use strict';

var _ = require('underscore');
var Bluebird = require('bluebird');
var readDir = Bluebird.promisify(require('fs').readdir);
var readFile = Bluebird.promisify(require('fs').readFile);
var dir;

module.exports = function(path) {
	dir = process.cwd() + path;
	return {
		settingsPerHostname: settingsPerHostname
	};
};

var parsedDomains = function() {
	return readDir(dir)
	.then(function(files) {
		return Bluebird.all(files.map(function(file) {
			return readFile(dir + file, 'utf8');
		}));
	})
	.then(function(domains) {
		return Bluebird.all(domains.map(function(domain) {
			return JSON.parse(domain);
		}));
	});
};

function settingsPerHostname(hostname) {
	return parsedDomains()
		.then(function(domains) {
			return _.find(domains, function(domain) {
				var regex = new RegExp(domain.regexp, 'i');
				return hostname.match(regex);
			});
		});
}