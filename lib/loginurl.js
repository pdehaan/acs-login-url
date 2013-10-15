'use strict';

var qs = require('qs'),
	util = require('util');


var mediator = module.exports = {};

function urlEncodeForACS(context) {
	var data = new Buffer(qs.stringify(context)).toString('base64');
	var match = data.match(/=/g);
	var count = match ? match.length : 0;
	return data.replace(/=/g, '') + count.toString();
}


mediator.initialize = function(options) {
	this.options = options;
};

mediator.createLiveLogin = function(url) {
	var options = this.options;

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

mediator.createFacebookLogin = function(url) {
	var options = this.options;

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
