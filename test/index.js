"use strict";

const http    = require('http');
const url     = require('url');
const fetch   = require('nyks/http/fetch');
const drain   = require('nyks/stream/drain');
const defer   = require('nyks/promise/defer');


const expect = require('expect.js');
const allow = require('../');


describe("Minimal mock suite", function() {

  var port = 0;

  it("SHould create a mock server", function(done) {

    var server = http.createServer(function(req, res) {

      var allowed0 = allow(req, ['127.0.0.1/32'], ['172.19.100.0/24']);
      var allowed1 = allow(req, ['10.6.0.10/32']);
      var allowed2 = allow(req, ['10.7.0.6/32'], ['127.0.0.1/32']);
      var remoteAddr = allow.remote_addr(req);
      res.end(JSON.stringify({allowed0, allowed1, allowed2, remoteAddr}));
    });



    server.listen(0, '127.0.0.1', function() {
      port = server.address().port;
      console.log("Server is listening on port", port);

      done();
    });

  });

  it("Should fetch a valid IP through the local server", async () => {
    var remote = JSON.parse(await drain(fetch(`http://127.0.0.1:${port}/`)));
    expect(remote.allowed0).to.be.ok();
  });


  it("Test mocking a proxy", async () => {

    var query = {...url.parse(`http://127.0.0.1:${port}/`), headers : {
      'x-forwarded-for' : '10.7.0.6, 127.0.0.1 '
    }};

    var defered = defer();

    var req = http.request(query, defered.resolve);
    req.end();

    var remote = JSON.parse(await drain(defered));

    expect(remote.allowed1).not.to.be.ok();
    expect(remote.allowed2).to.be.ok();
  });







});
