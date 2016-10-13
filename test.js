const storage = require('./src/server/storage');
const R = require('ramda');

storage.storeInstance(

    {id:'1'}

);

storage.storeInstance(

    {id:'2'}

);

console.log(storage.getInstances());

storage.deleteInstance(2);

console.log(storage.getInstances());


var query = { bla: "bla" ,foo:"foo"}
var toFilter = {bla:"bla", foo: "foo", bar: "bar"}
const filtered = Object.keys(toFilter)
    .filter( key => Object.keys(query).indexOf(key) > -1)
    .reduce(
        (prev, curr) =>  {  prev[curr] = toFilter[curr]; return prev;} , {}
    )

console.log(query)
console.log(filtered)

console.log(R.equals(filtered,query) )