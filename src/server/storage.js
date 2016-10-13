const utils = require('./utils');
const R = require('ramda');

const eventemmitter = require('./event-emmiter');
const {DEAD_INSTANCE, NEW_INSTANCE, BEFORE_CLUSTER_DELETE, CLUSTER_DELETE, AFTER_CLUSTER_DELETE} = require('./events');

const storage = {instances: {}};
const clone = utils.cloneByJSON;

const convertSetToArray = (object) => {
    return Object.keys(object).map(k => object[k]);
}

const deleteInstance = (id) => {
    if (storage.instances[id]) {
        delete storage.instances[id];
        return true;
    }
    else {
        return false;
    }
}

const getInstances = (query) => {
    if (query && Object.keys(query).length > 0) {
        return convertSetToArray(storage.instances)
            .filter(x => {
                object = utils.reduceToSameProps(x, query);
                return R.equals(object, query);
            });
    }
    else {
        return convertSetToArray(storage.instances);
    }
}

const getInstance = (id) => {
    const instance = storage.instances[id];
    return instance ? clone(instance) : undefined;
}

const storeInstance = (instance) => {
    instance.lastNotificationDate = new Date().getTime();
    storage.instances[instance.id] = instance;
}

eventemmitter.on(DEAD_INSTANCE, (id) => {
    console.log("storage on delete")
    deleteInstance(id);
});

eventemmitter.on(NEW_INSTANCE, (id) => {
    console.log("storage on new")
    deleteInstance(id);
});


module.exports.storeInstance = storeInstance;
module.exports.deleteInstance = deleteInstance;
module.exports.getInstances = getInstances;
module.exports.getInstance = getInstance;

