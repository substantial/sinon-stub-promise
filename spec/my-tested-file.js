var async1 = require('./async').async1;
var async2 = require('./async').async2;

// THIS DOESN'T WORK: with chained then

module.exports = () => {
  return async1()
    .then((res) => {
      console.log('async1 finished', res);
      return async2();
    })
    .then((res2) => {
      console.log('async2 finished', res2);
    })
};

// THIS WORKS: with nested THEN

//
// module.exports = () => {
//   return async1()
//     .then((res) => {
//       console.log('async1 finished', res);
//
//       return async2().then((res2) => {
//         console.log('async2 finished', res2);
//       })
//     });
// };
