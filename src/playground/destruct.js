// //// Arrays

const address = ['1299 S Junior Street', 'Philly', 'Vacuum', '33445'];

const [street = 'blakz city', city, state, zip] = address;

console.log(`You're in ${street}, and hood like ${city}, looks like its a flying ${state}, and its zip is ${zip}`);



// //// Objects
// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };

// const { title, author } = book;

// const { name = 'Self published' } = book.publisher;

// console.log(`${title}, ${author}, ${name}`);

