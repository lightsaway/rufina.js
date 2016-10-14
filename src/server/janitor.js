const storage = require('./storage');
const emmiter = require('./event-emmiter');
const events = require('./events');;

let DEFAULT_CLEANUP_TIME = 10 * 1000;
let DEFAULT_DEAD_AGE = 600 * 1000;
let janitorLoop;

const agePredicate = ({lastNotificationDate}) => {
    const ageFromNow = new Date().getTime() - lastNotificationDate;
    const shouldBeCleaned = ageFromNow > DEFAULT_DEAD_AGE;
    return shouldBeCleaned;
}

const start = ({interval = DEFAULT_CLEANUP_TIME, deadAge  = DEFAULT_DEAD_AGE}) => {
    janitorLoop = setInterval(() => {

        console.log("Running janitor loop");
        const deadKeys = Object.keys(storage.getInstances())
                .map(key => storage.getInstances()[key])
                .filter(agePredicate)
                .forEach(instance => {
                            console.log("Found dead item : ", instance.id);
                            emmiter.emit(events.DELETE_INSTANCE, instance.id);
                            emmiter.emit(events.CLUSTER_NOTIFY_DELETE, instance.id);
                })
    }, interval);
}

const stop = () => {
    if (janitorLoop) clearInterval(janitorLoop);
}

module.exports = {stop: stop, start: start}
