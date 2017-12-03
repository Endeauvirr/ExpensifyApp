const promise = new Promise((resolve, reject) => {

  setTimeout(() => {
    // reject('bbom');
    resolve({
      boom: 'box',
      poop: 'hello'
    });
  }, 1500);

});

console.log('Im waiting');

promise.then((data) => {
  // return data; // we also can return a new promise
  console.log(data.boom);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        boom: 'boxPoop',
        poop: 'hello'
      });
    }, 1500);
  });

}).then((response) => {
  console.log(response.boom);
}).catch((error) => {
  console.warn('Not good - promise is not resolved');
});
