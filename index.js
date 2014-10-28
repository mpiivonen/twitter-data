var config = require('./package.json');
var stream = require('./lib/twitter-stream.js');

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

if(userArgs.indexOf('-h') != -1 || userArgs.indexOf('--help') != -1) {
  printHelp(function(help){
    console.log(help);
  });
}
else if(userArgs.indexOf('-v') != -1 || arguments.indexOf('-V') != -1 || userArgs.indexOf('--version') != -1){
  printVersion(function(version){
    console.log(version);
  });
}
else {
  stream.initConfig();
}
