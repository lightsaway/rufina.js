/* LOCAL EVENTS */
const BEFORE_DELETE = "BEFORE_DELETE";
const DELETE_INSTANCE = "DELETE_INSTANCE";
const AFTER_DELETE = "AFTER_DELETE";

const NEW_INSTANCE = "NEW_INSTANCE";
const AFTER_NEW_INSTANCE = "AFTER_NEW_INSTANCE";
const BEFORE_NEW_INSTANCE = "BEFORE_NEW_INSTANCE";

/* CLUSTER NOTIFY EVENTS */
const CLUSTER_NOTIFY_DELETE = "CLUSTER_NOTIFY_DELETE";
const CLUSTER_NOTIFY_UPDATE = "CLUSTER_NOTIFY_UPDATE";

/* CLUSTER UPDATE EVENTS */
const BEFORE_CLUSTER_DELETE = "BEFORE_CLUSTER_DELETE";
const CLUSTER_DELETE = "CLUSTER_DELETE";
const AFTER_CLUSTER_DELETE = "AFTER_CLUSTER_DELETE";

const BEFORE_CLUSTER_NEW  = "BEFORE_CLUSTER_NEW";
const CLUSTER_NEW = "CLUSTER_NEW";
const AFTER_CLUSTER_NEW  = "AFTER_CLUSTER_NEW";


module.exports = {
    DELETE_INSTANCE: DELETE_INSTANCE,
    NEW_INSTANCE: NEW_INSTANCE,
    BEFORE_DELETE : BEFORE_DELETE,
    AFTER_DELETE : AFTER_DELETE,
    AFTER_NEW_INSTANCE: AFTER_NEW_INSTANCE,
    BEFORE_NEW_INSTANCE : BEFORE_NEW_INSTANCE,

    BEFORE_CLUSTER_DELETE : BEFORE_CLUSTER_DELETE,
    CLUSTER_DELETE : CLUSTER_DELETE,
    AFTER_CLUSTER_DELETE : AFTER_CLUSTER_DELETE,

    BEFORE_CLUSTER_NEW : BEFORE_CLUSTER_NEW,
    CLUSTER_NEW : CLUSTER_NEW,
    AFTER_CLUSTER_NEW : AFTER_CLUSTER_NEW,

    CLUSTER_NOTIFY_UPDATE: CLUSTER_NOTIFY_UPDATE,
    CLUSTER_NOTIFY_DELETE : CLUSTER_NOTIFY_DELETE
};