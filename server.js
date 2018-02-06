const express = require('express');
const app = express();
const request = require('request-promise');

var mem_id = "apower";
var apiCall = module.exports = {};

var apiCall = {
  serviceBoard: function() {
    return request({
      "method": "GET",
      "uri": "xxx",
      "json": "true",
      "headers": {
        'authorization': "xxx",
        'content-type': "application/json",
        'cache-control': "no-cache"
      },
      "qs": {
        'orderBy': 'status/name asc',
        'pageSize': 300,
        'conditions': "resources contains '" + mem_id + "' AND status/id not in (17,165,36,163,164,42,73,46,78,148,34,132,45,159,60,168,106,51,72,95)"
      }
    });
  }
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3001, () => console.log('Example app listening on port 3001!'))

function main() {
  return apiCall.serviceBoard();
}

main().then(function(result) {
  console.log(result);
});

