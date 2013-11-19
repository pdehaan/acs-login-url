# acs-login-url

[![Build Status](https://travis-ci.org/blairforce1/acs-login-url.png)](https://travis-ci.org/blairforce1/acs-login-url)

Builds login urls for Windows Azure ACS Identity Providers (currently only Windows Live and Facebook are supported). This can be used instead of the Home Realm Discovery solutions offered by Microsoft (i.e. the pre-constructed login page, or the JSON feed).

## Installation

$ npm install acs-login-url --save

## Using the library
First, you need to initialize using your realm, ACS namespace, and chosen Identity Provider (choose either 'Live' or 'Facebook'):

```
var options = {
	realm: 'urn:realm',
	namespace: 'acs-namespace',
	ip: 'Live'
};

var mediator = loginurl.initialize(options);
```

The options should be as you setup in your Azure ACS Relying Party. The ACS Namespace is the most significant portion of the ACS management portal URL, for example:

```
https://acs-namespace.accesscontrol.windows.net/v2/
```

You can now use the returned object (mediator in this case) to generate the appropriate login URL by passing it the URL that you wish to return to after authentication:

```
var loginUrl = mediator.loginUrl('http://return-url');
```

## License and Copyright
Copyright (c) 2013 Jonathan Blair.
Licensed under the MIT license.