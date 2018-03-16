
var https = require('https');
var querystring = require('querystring');
var { ELASTIC_ENDPOINT_URL,  ELASTIC_ENDPOINT_PORT} = require("../constants");

function addFiles(data) { 
  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
     hosts: [ 'http://localhost:9200']
  });
  //console.log(data);

client.bulk({
  body:data
}, function (err, resp) {
  if(err)
  console.log(err);
});

//   client.ping({
//     requestTimeout: 30000,
// }, function(error) {
//     if (error) {
//         console.error('elastyicsearch cluster is down!');
//     } else {
//         console.log('Everything is ok');
//     }
// });
  // var options = {
  //   host: ELASTIC_ENDPOINT_URL,
  //   port: ELASTIC_ENDPOINT_PORT,
  //   path: '/file/',
  //   method: 'POST'
  // };
  //  console.log(data);


  //   var post_data = querystring.stringify(data);
  //   var req = https.request(options, function(res) {
  //   res.setEncoding('utf-8');
  //   var responseString = '';

  //   res.on('data', function(data) {
  //     responseString += data;
  //   });

  //   res.on('end', function() {
  //     console.log(responseString);
  //     var responseObject = JSON.parse(responseString);
  //     success(responseObject);
  //   });
  // });

  // try{
  // req.write(post_data);
  // req.end();
  // }catch(ex){
  //   console.log(ex);
  // }
}

module.exports = addFiles;