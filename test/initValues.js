var stream = require('../lib/twitter-stream.js');
var testUserConfig = require('../user-config.json');

exports['checkValues'] = function (test) {
    test.notEqual(testUserConfig.twitter.apiKey.length,0);
    test.notEqual(testUserConfig.twitter.streamType.basic.length,0);
    test.notEqual(testUserConfig.local.storage.length,0);
    test.done();
};

exports['checkInit'] = function (test) {
  stream.initConfig();
  test.equal(stream.getStorage(),testUserConfig.local.storage);
  test.deepEqual(stream.getConnection(),{
    "apikey": testUserConfig.twitter.apiKey,
    "stream" : testUserConfig.twitter.streamType.basic
  });

  test.done();
};
