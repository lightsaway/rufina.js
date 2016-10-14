const eventemmitter = require('./event-emmiter');
const redis = require("redis");
const events = require("./events")
const utils = require("./utils");

const defaultErrorHandler = (error) => {
    console.log(error);
}

const DEFAULT_TOPIC = "REGISTRY_PUB_SUB";

const createCli = (options) => {
    if (!options) options = {};
    let client;
    if (options) client = redis.createClient(options);
    else client = redis.createClient();

    client.on("error", options.errorHandler || defaultErrorHandler)
    return client;

}

const init = (options) => {

    const PUBLISHER_ID = utils.uuid();

    const PUB_SUB_CHANNEL = options ? (options.PUB_SUB_CHANNEL ? options.PUB_SUB_CHANNEL : DEFAULT_TOPIC) : DEFAULT_TOPIC;
    const pub = createCli(options);
    const sub = createCli(options);
    sub.subscribe(PUB_SUB_CHANNEL);

    eventemmitter.on(events.CLUSTER_NOTIFY_DELETE, (message) => {
        pub.publish(PUB_SUB_CHANNEL, JSON.stringify({action: events.DELETE_INSTANCE, pubId:PUBLISHER_ID,  instance : message}));
    });

    eventemmitter.on(events.CLUSTER_NOTIFY_UPDATE, (message) => {
        pub.publish(PUB_SUB_CHANNEL, JSON.stringify({action: events.NEW_INSTANCE, pubId:PUBLISHER_ID, instance : message}));
    });

    sub.on("message",  (channel, msg) => {
        const message = JSON.parse(msg);
        const {action, pubId} = message;

        //skip if we sended the message
        if(pubId === PUBLISHER_ID) return;

        console.log(action, message);
        switch (action) {
            case events.NEW_INSTANCE :
                eventemmitter.emit(events.BEFORE_CLUSTER_NEW, message);
                eventemmitter.emit(events.CLUSTER_NEW, message);
                eventemmitter.emit(events.AFTER_CLUSTER_NEW, message);
                break;
            case events.DELETE_INSTANCE :
                eventemmitter.emit(events.BEFORE_CLUSTER_DELETE, message);
                eventemmitter.emit(events.CLUSTER_DELETE, message);
                eventemmitter.emit(events.AFTER_CLUSTER_DELETE, message);
                break;
            default:
                console.log("unknown action recieved from redis");
                break;
        }
    });

    return {sub, pub};

}

module.exports.init = init;
