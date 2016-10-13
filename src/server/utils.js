const reduceToSameProps = (object, criteriaObject) => {
  return Object.keys(object)
      .filter( key => Object.keys(criteriaObject).indexOf(key) > -1)
      .reduce(
          (prev, curr) =>  {  prev[curr] = object[curr];
              return prev;} , {}
      )
}

module.exports.reduceToSameProps = reduceToSameProps;

const cloneByJSON = (clonable) => JSON.parse(JSON.stringify(clonable));
module.exports.cloneByJSON = cloneByJSON;

const convertSetToArray = (object) =>{
    return Object.keys(object).map(k => object[k]);
}

module.exports.convertSetToArray = convertSetToArray;

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
})};

module.exports.uuid = uuid;


const objectToQuery = (obj) => {
    const parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
}
module.exports.objectToQuery = objectToQuery;