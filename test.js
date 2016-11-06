/*var DOMParser = require('xmldom').DOMParser;

var txt = '<message to="user1@localhost" type="chat" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams" from="user2@localhost/9bde178e3e577adae708029167d64895"><body>helo</body><active xmlns="http://jabber.org/protocol/chatstates"/></message>';
//var txt = '<presence xmlns="jabber:client" type="unavailable" xmlns:stream="http://etherx.jabber.org/streams" from="user1@localhost/6a10c42e86fefde0c65401adb34fea3c"/>';
    var parser = new DOMParser();
    var message_parse = parser.parseFromString(txt, "text/xml");

if( message_parse.getElementsByTagName("message").length == 0 )
{
 console.log('no message');
}else{
	console.log('messge');
}*/
 

console.log(Math.random().toString(36).substr(2, 20));



/*            var body = message_parse.getElementsByTagName("body")[0].childNodes[0].nodeValue;   
            var type = message_parse.getElementsByTagName("message")[0].getAttribute("type");
            var from = message_parse.getElementsByTagName("message")[0].getAttribute("from");
            var from = from.substr(0, from.indexOf('/')); */





/*    xmlDoc = parser.parseFromString(txt, "text/xml");
    var pcm_parse = JSON.parse(xmlDoc);

    console.log(pcm_parse);


   var body = xmlDoc.getElementsByTagName("body")[0].childNodes[0].nodeValue;   
   var to = xmlDoc.getElementsByTagName("message")[0].getAttribute("to");
   var type = xmlDoc.getElementsByTagName("message")[0].getAttribute("type");
   var from = xmlDoc.getElementsByTagName("message")[0].getAttribute("from");
   var from = from.substr(0, from.indexOf('/')); 
   console.log(body, to, type, from); */

