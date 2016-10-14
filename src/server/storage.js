const utils = require('./utils');
const R = require('ramda');
const storage = {instances: {}};
const clone = utils.cloneByJSON;

const getInstances = (query) => {
    if (query && Object.keys(query).length > 0) {
        return utils.convertSetToArray(storage.instances)
            .filter(x => {
                object = utils.reduceToSameProps(x, query);
                return R.equals(object, query);
            });
    }
    else {
        return utils.convertSetToArray(storage.instances);
    }
}

const getInstance = (id) => {
    const instance = storage.instances[id];
    return instance ? clone(instance) : undefined;
}

const storeInstance = (instance) => {
    instance.lastNotificationDate = new Date().getTime() + "";
    console.log("STORE: storing instance ", instance)
    storage.instances[instance.id] = instance;
    return storage.instances[instance.id];
}

const deleteInstance = (id) => {
    if (storage.instances[id]) {
        console.log("STORE: deleting instance ", id)
        const item = clone(storage.instances[id]);
        delete storage.instances[id];
        return item;
    }
    else {
        return undefined;
    }
}

module.exports.storeInstance = storeInstance;
module.exports.deleteInstance = deleteInstance;
module.exports.getInstances = getInstances;
module.exports.getInstance = getInstance;

