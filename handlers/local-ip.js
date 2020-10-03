const { lookup } = require("dns").promises;
const { hostname } = require("os");

module.exports = async function getMyIPAddress(options) {
  return (await lookup(hostname(), options)).address;
};
