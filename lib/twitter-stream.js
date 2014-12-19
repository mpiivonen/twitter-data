var userConfig = require('../user-config.json'),
    Twitter = require('ntwitter'),
    fs = require('fs'),
    fse = require('fs.extra'),
    prettyBytes = require('pretty-bytes');


// Return a string containing file size and unit e.g 1 kB
function getFileSize(file,cb) {
  fs.stat(file, function (err, stats) {
    return cb(prettyBytes(stats.size));
  });
}

// Return true if file size is larger than maxSize, otherwise false
function compareFileSize(file,maxSize,cb) {

  console.log("Comparing size " + file + " max size " + maxSize );
  var units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"  ];
  getFileSize(file,function(size){

    var fileUnit = size.split(" ");
    var maxUnit = maxSize.split(" ");

    if(units.indexOf(fileUnit[1]) < units.indexOf(maxUnit[1])) {
      return cb(0);
    }
    else if(units.indexOf(fileUnit[1]) === units.indexOf(maxUnit[1]) && Number(fileUnit[0]) <= Number(maxUnit[0])) {
      return cb(0);
    }
    else{
      return cb(1);
    }
  });

}

module.exports = {

  connection: {},
  storage: "",
  maxSize: "",

  initConfig: function(){

    this.connection = {
      "consumer_key": userConfig.twitter.consumer_key,
      "consumer_secret": userConfig.twitter.consumer_secret,
      "access_token_key": userConfig.twitter.access_token_key,
      "access_token_secret": userConfig.twitter.access_token_secret,
      "stream" : userConfig.twitter.streamType.basic,
      "optionalStream": userConfig.twitter.streamType.userSpecific
    }

    this.storage = userConfig.local.storage;
    this.maxSize = userConfig.local.maxSize;
  },
  createClient: function() {
    var client =  new Twitter({
      consumer_key: this.connection.consumer_key,
      consumer_secret: this.connection.consumer_secret,
      access_token_key: this.connection.access_token_key,
      access_token_secret: this.connection.access_token_secret
    });

    return client;
  },

  saveStream: function(client,writeStream) {
    var storage = this.storage,
        maxSize = this.maxSize,
        logNumber = 0;

        writeStream.once('open', function(fd) {
          client.stream('statuses/sample', function(stream) {
            stream.on('data', function (data) {
              writeStream.write(JSON.stringify(data)+'\n');
            });
          });
        });

    fs.watchFile(storage, function (cb) {
      compareFileSize(storage,maxSize,function(res){
        if(res){
          console.log("File size exceeded");
          fse.copy(storage, './'+storage+'.'+logNumber, function (err) {
            if (err) {
              throw err;
            }
            logNumber++;
            fs.truncate(storage, 0, function(){console.log('log copied')})
          });
        }
        else {
          console.log("File size under desired size");
        }
      });
    });

  },

  getConnection: function(){
    return this.connection;
  },

  getStorage: function() {
    return this.storage;
  }
};
