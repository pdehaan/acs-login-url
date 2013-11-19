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
Copyright (C) 2013 Jonathan Blair


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.