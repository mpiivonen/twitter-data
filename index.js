var config = require('./package.json');
var stream = require('./lib/twitter-stream.js');
var fs = require('fs');
var start = 0;

var getStream = function(start,callback) {
  if(start) {
    stream.initConfig();
    var file = stream.getStorage();
    var writeStream = fs.createWriteStream(file, {'flags': 'a'});
    var client = stream.createClient();
    stream.saveStream(client,writeStream);
    return callback("Getting stream");
  }
}
var printHelp = function(callback) {
  var help = 'Help: \n';
  help += config.help;
  help += '\n';

  return callback(help);
}

var printVersion = function(callback) {
  var version = 'Version: '+ config.version + '\n';
  version += 'Licence: ' + config.license + '\n';
  version += config.copyright;
  return callback(version);
}

var userArgs= process.argv.slice(2);
var useOptionalStream = '';

// check if start option passed via commandline
if(userArgs.indexOf('-s') != -1 || userArgs.indexOf('--start') != -1) {
  start = 1;
}
// set selected stream
if(userArgs.indexOf('--stream') != -1) {
  useOptionalStream = userArgs[(userArgs.indexOf('--stream')+1)];
}

if(userArgs.indexOf('-h') != -1 || userArgs.indexOf('--help') != -1) {
  printHelp(function(help){
    console.log(help);
  });
}
else if(userArgs.indexOf('-v') != -1 || userArgs.indexOf('-V') != -1 || userArgs.indexOf('--version') != -1){
  printVersion(function(version){
    console.log(version);
  });
}
else {
  getStream(start, function(status){
    console.log(status);
  });
}
