"use strict";

const ipaddr = require('ipaddr.js');

function remote_addr(req, proxies = []) {
  var addrs = (req.headers['x-forwarded-for'] || '').split(',').filter(Boolean).map(ip => ip.trim());
  addrs.push(req.connection.remoteAddress);
  var addr;
  for(addr of addrs.reverse()) {
    let tmp = ipaddr.parse(addr);
    if(!proxies.some(proxy => tmp.match(ipaddr.parseCIDR(proxy))))
      break;
  }
  return addr;

}

function validate_http(req, range, proxies = []) {
  var addr = remote_addr(req, proxies);
  addr  = ipaddr.parse(addr);
  return range.some(cidr => addr.match(ipaddr.parseCIDR(cidr)));
}


module.exports = validate_http;
module.exports.remote_addr = remote_addr;
