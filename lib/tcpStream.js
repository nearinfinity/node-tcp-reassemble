var util = require("util");
var events = require("events");

var tcpStream = module.exports = function(sourceIP, destIP) {
  this.sourceIP = sourceIP;
  this.destinationIP = destIP;
  events.EventEmitter.call(this);
};
util.inherits(tcpStream, events.EventEmitter);


tcpStream.prototype.emitData = function (packet, emitMessage) {
  if (packet.tcp.fin) {
    emitMessage = 'end';
  }
  this.emit(emitMessage, {data: packet.tcp.data, source: this.sourceIP, dest: this.destinationIP});
};