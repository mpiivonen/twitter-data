var stream = require('../lib/twitter-stream.js');
var testUserConfig = require('../user-config.json');
var fs = require('fs');

exports['checkValues'] = function (test) {
    test.notEqual(testUserConfig.twitter.consumer_key.length,0);
    test.notEqual(testUserConfig.twitter.consumer_secret.length,0);
    test.notEqual(testUserConfig.twitter.access_token_key.length,0);
    test.notEqual(testUserConfig.twitter.access_token_secret.length,0);
    test.notEqual(testUserConfig.local.storage.length,0);
    test.notEqual(testUserConfig.local.maxSize.length,0);
    test.done();
};

exports['fileSize'] = function(test) {

  fs.truncate('./testfile.json', 0, function(){});
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

exports['testStreams'] = function(test) {

  stream.initConfig();
  var client = stream.createClient();
  var writeStream = fs.createWriteStream("./testfile.json", {'flags': 'a'});

  stream.saveStream(client,writeStream,1);
  setTimeout(function(){writeStream.end();},2500);

  test.notEqual(typeof client, new Object());
  test.done();
};

exports['unwatch'] = function(test) {

  test.expect(1);
    fs.unwatchFile("./testfile.json");

    test.ok(true);
    test.done();
};
