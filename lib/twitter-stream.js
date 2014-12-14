var userConfig = require('../user-config.json');

module.exports = {

  connection: {},
  storage: "",

  initConfig: function(){
    this.connection = {
      "apikey": userConfig.twitter.apiKey,
      "stream" : userConfig.twitter.streamType.basic
    }

    this.storage = userConfig.local.storage;
  },

  getConnection: function(){
    return this.connection;
  },

  getStorage: function() {
    return this.storage;
  }
  
};
