

const user1 = {
    id: 1,
    name: 'Ali'

}
const user2 = {
    id: 2,
    name: 'REaz'

}


const logID = function () {

    return this.id

}

logID.call(user1);

console.log(logID.call(user1));
console.log(logID.call(user2));

