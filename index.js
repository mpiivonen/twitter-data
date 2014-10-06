
var printHelp = function(callback) {
  return callback("this is help");
}

var printVersion = function(callback) {
  return callback("Version: 0.0.1");
}

var arguments = process.argv.slice(2);

if(arguments.indexOf('-h') != -1 || arguments.indexOf('--help') != -1) {
  printHelp(function(help){
    console.log(help);
  });
}
if(arguments.indexOf('-v') != -1 || arguments.indexOf('--version') != -1){
  printVersion(function(version){
    console.log(version);
  });
}
