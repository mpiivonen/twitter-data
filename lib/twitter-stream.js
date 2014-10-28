var userConfig = require('../user-config.json');

module.exports = {
  initConfig: function(){
    var connection = {
      "apikey": userConfig.twitter.apiKey,
      "stream" : userConfig.twitter.streamType.basic,
    }
    var storage = userConfig.local.storage;

    console.log("Using:");
    console.log("api-key: " + connection.apikey);
    console.log("stream type: " + connection.stream);
    console.log("Saving stream on disk:")
    console.log(storage);
  }
};
