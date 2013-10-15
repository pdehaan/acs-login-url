'use strict';
var loginurl = require('../lib/loginurl');

// I have normalized the URL encoding so that the JSON feed versions are capitalized
// In reality, the JSON feed returned by ACS uses lowercase, however, it makes no difference
// so rather than incur a cost of normalizing in this library, I just alter the test data!
var expected = {
	live: 'https://login.live.com/login.srf?wa=wsignin1.0&wtrealm=https%3A%2F%2Faccesscontrol.windows.net%2F&wreply=https%3A%2F%2Farapsysdemo.accesscontrol.windows.net%2Fv2%2Fwsfederation&wp=MBI_FED_SSL&wctx=cHI9d3NmZWRlcmF0aW9uJnJtPXVybiUzQWJsYWlyZm9yY2UxJmN4PWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlMkZwcml2YXRl0',
	facebook: 'https://www.facebook.com/dialog/oauth?client_id=244371105710158&redirect_uri=https%3A%2F%2Farapsysdemo.accesscontrol.windows.net%2Fv2%2Ffacebook%3Fcx%3DcHI9d3NmZWRlcmF0aW9uJnJtPXVybiUzQWJsYWlyZm9yY2UxJmN4PWh0dHAlM0ElMkYlMkZsb2NhbGhvc3QlMkZwcml2YXRlJmlwPUZhY2Vib29rLTI0NDM3MTEwNTcxMDE1OA2&scope=email'
};

describe('when creating login urls', function() {
	var options = {
		realm: 'urn:blairforce1',
		namespace: 'arapsysdemo',
		api: '244371105710158',
		exactMatch: true
	};

	var url = 'http://localhost/private';

	loginurl.initialize(options);

	it('should match the Windows Live login generated by the JSON feed', function() {
		var result = loginurl.createLiveLogin(url);
		result.should.equal(expected.live);
	});

	it('should match the Facebook login generated by the JSON feed', function() {
		var result = loginurl.createFacebookLogin(url);
		result.should.equal(expected.facebook);
	});
});