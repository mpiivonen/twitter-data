var stream = require('../lib/twitter-stream.js');
var testUserConfig = require('../user-config.json');

exports['checkValues'] = function (test) {
    test.notEqual(testUserConfig.twitter.consumer_key.length,0);
    test.notEqual(testUserConfig.twitter.consumer_secret.length,0);
    test.notEqual(testUserConfig.twitter.access_token_key.length,0);
    test.notEqual(testUserConfig.twitter.access_token_secret.length,0);
    test.notEqual(testUserConfig.local.storage.length,0);
    test.notEqual(testUserConfig.local.maxSize.length,0);
    test.done();
};

exports['checkInit'] = function (test) {
  stream.initConfig();
  test.equal(stream.getStorage(),testUserConfig.local.storage);
  test.deepEqual(stream.getConnection(),{
    "consumer_key": testUserConfig.twitter.consumer_key,
    "consumer_secret": testUserConfig.twitter.consumer_secret,
    "access_token_key": testUserConfig.twitter.access_token_key,
    "access_token_secret": testUserConfig.twitter.access_token_secret,
    "stream" : testUserConfig.twitter.streamType.basic,
    "optionalStream": testUserConfig.twitter.streamType.userSpecific
  });
  test.done();
};
exports['fileSize'] = function(test) {

  stream.getCompareFileSize('./testfile.json', "2 MB",function(ret){
    test.equal(ret,0);
  });

  stream.getCompareFileSize('./testfile.json', "10 B",function(ret){
    test.equal(ret,0);
  });

  stream.getCompareFileSize('./user-config.json', "300 B",function(ret){
    test.equal(ret,1);
  });

  test.done();

};
