const EventEmitter = require('events');
const events = require('./events');
const store = require('./storage');

class MyEmitter extends EventEmitter {
    constructor () {super()};
}
const emmiter = new MyEmitter();


emmiter.on(events.DELETE_INSTANCE, (id) => {
    store.deleteInstance(id);
});

emmiter.on(events.NEW_INSTANCE, (instance) => {
    store.storeInstance(instance);
});

emmiter.on(events.CLUSTER_NEW, (message) => {
    console.log("EMMITER : CLUSTER_NEW : ", message);
    store.storeInstance(message.instance);
});

emmiter.on(events.CLUSTER_DELETE, (message) => {
    console.log("EMMITER : CLUSTER_DELETE: ", message);
    store.deleteInstance(message.instance.id);
});


module.exports = emmiter;

