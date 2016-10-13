const {uuid, objectToQuery} = require('../server/utils');
const fetch = require('node-fetch');

const ERR = 'registryUrl option needs to be provided';
const INTERVAL = 3 * 1000;
const TIMEOUT = 10 * 1000;

const client = (opts) => {

    const {interval = INTERVAL, registryUrl, timeout = TIMEOUT} = opts;
    if (!registryUrl) throw new Error(ERR);

    const SERVICE_ID = uuid();

    console.log("UUID:", SERVICE_ID);

    let notificationTimer;
    let promiseLoop;

    const queryLoops = {};

    const getService = (data) => {
        const query = objectToQuery(data)

        return fetch(
            `${registryUrl}/api/instances?${query}`,
            {
                method: 'GET',
                timeout: timeout,
                headers: {"Content-Type": "application/json"}
            });

    }

    return {
        startRegistrationFlow: (data) => {

            notificationTimer = setInterval(() => {

                const serviceData = Object.assign({id: SERVICE_ID}, data);
                fetch(
                    `${registryUrl}/api/instances`,
                    {
                        method: 'POST',
                        timeout: timeout,
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(serviceData)
                    });
            }, interval);

        },

        stopRegistrationFlow: () => {
            //clear interval
            if (notificationTimer) clearInterval(notificationTimer);

            //unregister
            fetch(
                `${registryUrl}/api/instances/${SERVICE_ID}`,
                {
                    method: 'DELETE',
                    timeout: timeout
                });
        },

        getService: (data) => {
            return getService(data)
        },

        startQueryLoop: (id, query) => {

            queryLoop = setInterval(() => {
                getService(query)
                    .then(res => {
                        return res.json();
                    }).then(json => queryLoops[id] = JSON.parse(json));
            }, interval);

            queryLoops[id] = {}
        },

        stopQueryLoop: (id) => {
            if(queryLoops[id]) clearInterval(id);
        },

        getServicesFromQueryLoop: (queryLoopId) => {
            return queryLoops[id];
        }

    }
}

module.exports.client = client;

//TEST
const client2 = client({registryUrl: "http://localhost:3000"});
client2.startRegistrationFlow({type: "dummy"});


setTimeout(()=> {
    let bla = client2.getService({type: "dummy"});
    bla.then(resp => resp.json())

        .then(json =>
            console.log(json)
        )
}, 5000)
