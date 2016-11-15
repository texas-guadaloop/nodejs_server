var ws = require("nodejs-websocket")

var server = ws.createServer(function (conn) {
	console.log("New connection")
	//conn.on("text", function(str) {
		//console.log("Recieved "+str)
	//	console.log("Connected")
		//conn.sendText(str.toUpperCase()+"!!!")
		conn.sendText("testing..");
	//})
	conn.on("close", function(code, reason) {
		console.log("Connection closed")
	})
}).listen(8001)

console.log("listening on 8001");
