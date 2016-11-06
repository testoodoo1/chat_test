var crypto = require('crypto');
var Client = require('node-xmpp-client');
var xmpp = require('node-xmpp-server');



var dev_id = '876';
hostname = '192.168.1.16';
username = 'pjtku5';//received from server by dev_id
to_hash = dev_id+username;
console.log(to_hash);
password = 'secret'; //encrypt of dev_id and username


var client2 = new Client({
    jid: username+'@'+hostname,
    password: 'secret',
    port:5245,
    host:hostname,
    preferredSaslMechanism: 'PLAIN'
  })





  client2.on('online', function () {
    console.log('client2: online')
/*    var data_json = '{ "posts": [ { "id": "1", "title": "16 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone0.png" }, { "id": "2", "title": "15 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone1.png"  }, { "id": "3", "title": "12 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone2.png" }, { "id": "4", "title": "18 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone3.png" }, { "id": "5", "title": "10 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone4.png" }, { "id": "6", "title": "14 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone5.png" }, { "id": "7", "title": "18 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone6.png" }, { "id": "8", "title": "22 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone7.png" }, { "id": "9", "title": "12 % discount on android smart phones", "url": "http://10.200.10.9/images/Test/phone8.png" }, { "id": "10", "title": "New Town Coffee House", "url": "http://10.200.10.9/images/Test/phone9.png" } ] }';
    var notify_data = JSON.stringify(data_json);

    connection.execute('SELECT user_id from DeviceTable', function(err, rows){
      if(rows.length > 0){
        for(var j=0; j < rows.length; j++){
          var message = new xmpp.Stanza('message').c('pcm', xmlns="projectk:mobile:data").t('{"data": {"to":"'+rows[j].user_id+'","from":"pjtku5","action":"notify", "notify_count" : "10", "notify_data":'+notify_data+'}, "message_id":"test123","message_type" : "data"}').up();
          client2.send(message);
          console.log('message_sent to :'+rows[j].user_id);
        }
      }
    });*/    

  })

  client2.on('stanza', function (stanza) {
    console.log('RECEIVED :'+stanza.toString());
     

  })

  client2.on('error', function (error) {
    console.log('client2 error msg :', error)
  })

