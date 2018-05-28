[![Build Status](https://travis-ci.org/131/httpaddr.svg?branch=master)](https://travis-ci.org/131/httpaddr)
[![Coverage Status](https://coveralls.io/repos/github/131/httpaddr/badge.svg?branch=master)](https://coveralls.io/github/131/httpaddr?branch=master)
[![Version](https://img.shields.io/npm/v/httpaddr.svg)](https://www.npmjs.com/package/httpaddr)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Code style](https://img.shields.io/badge/code%2fstyle-ivs-green.svg)](https://www.npmjs.com/package/eslint-plugin-ivs)


# Motivation

Filter HTTP remote address through a list of CIDR (with proxies white list support)

# API

```

const allow = require('httpaddr');


var server = http.createServer(function(req, res) {
  var allowed = allow(req, ["127.0.0.1/32"]);
  console.log("Allow only from localhost");

  var allowedproxy = allow(req, ["127.0.0.1/32"], ["someproxies/24"]);
  console.log("Allow only from allowedproxy");
});


server.listen(8080);

```

# Notes
CIDR are filtered through the [ipaddr.js module](https://www.npmjs.com/package/ipaddr.js)




# Credits 
* [131](https://github.com/131)
