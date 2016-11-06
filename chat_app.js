// Log messages to the output area
var output = document.getElementById("output");
function log(message) {
 var line = document.createElement("div");
 line.textContent = message;
 output.appendChild(line);
}
function connectHandler(cond) {
 if (cond == Strophe.Status.CONNECTED) {
 log("connected");
 connection.send($pres());
 }
}
var url = "ws://localhost:5280/";
var connection = null;
var connectButton = document.getElementById("connectButton");
connectButton.onclick = function() {
 var username = document.getElementById("username").value;
 var password = document.getElementById("password").value;
connection = new Strophe.Connection(
 {proto: new Strophe.Websocket(url)});
 connection.connect(username, password, connectHandler);
}