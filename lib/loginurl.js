'use strict';

var qs = require('qs'),
	util = require('util');

function urlEncodeForACS(context) {
	var data = new Buffer(qs.stringify(context)).toString('base64');
	var match = data.match(/=/g);
	var count = match ? match.length : 0;
	return data.replace(/=/g, '') + count.toString();
}

function setupLiveLogin(options) {
	return function createLiveLogin(url) {
		var wctx = {
			pr: 'wsfederation',
			rm: options.realm,
			cx: url
		};

		var query = {
			wa: 'wsignin1.0',
			wtrealm: 'https://accesscontrol.windows.net/',
			wreply: util.format('https://%s.accesscontrol.windows.net/v2/wsfederation', options.namespace),
			wp: 'MBI_FED_SSL',
			wctx: urlEncodeForACS(wctx)
		};
		
		return util.format('https://login.live.com/login.srf?%s', qs.stringify(query));
	};
}

function setupFacebookLogin(options) {
	return function createFacebookLogin(url) {
		var wctx = {
			pr: 'wsfederation',
			rm: options.realm,
			cx: url,
			ip: util.format('Facebook-%s', options.api)
		};

		var query = {
			client_id: options.api,
			redirect_uri: util.format('https://%s.accesscontrol.windows.net/v2/facebook?cx=%s', options.namespace, urlEncodeForACS(wctx)),
			scope: 'email'
		};

		return util.format('https://www.facebook.com/dialog/oauth?%s', qs.stringify(query));
	};
}

module.exports.initialize = function(options) {
	var choice = options.ip.toLowerCase();

	if (choice !== 'live' && choice !== 'facebook') {
		throw new Error('Identity Provider is not supported: ' + options.ip);
	}

	if (choice === 'live') {
		options.loginUrl = setupLiveLogin(options);
		options.logoutUrl = function() {
			return 'https://login.live.com/login.srf?wa=wsignout1.0';
		};
	}

	if (choice === 'facebook') {
		options.loginUrl = setupFacebookLogin(options);
	}

	return options;
};



