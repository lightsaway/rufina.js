const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    constructor () {super()};
}
const emmiter = new MyEmitter();

module.exports = emmiter;

