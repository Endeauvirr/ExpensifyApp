import * as firebase from 'firebase'; // * as smth -> grab all named exports and put them into a single variable

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// const convertDataToArray = (snapshot) => {
//   const array = [];

//   snapshot.forEach((childSnapshot) => {
//     array.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });

//   console.log(array);
// };


// database.ref('notes').on('child_removed', (snapshot) => { // Event nasłuchjący na usunięcie elementu z grupy
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('notes').on('child_changed', (snapshot) => { // Event nasłuchjący na aktualizację elementu w grupie
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('notes').on('child_added', (snapshot) => { // Event nasłuchjący na dodanie elementu do listy
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('notes')
//   .once('value')
//   .then((snapshot) => {
//     convertDataToArray(snapshot);
//   });

// database.ref('notes')
//   .on('value', (snapshot) => {
//     convertDataToArray(snapshot);
//   }, (error) => {
//     console.warn(`error ocurred: ${error}`);
//   });

// database.ref('notes').push({
//   description: 'dahood',
//   createdAt: 84995939930093,
//   amount: 55566,
//   note: 'asdasd'
// });


// database.ref()
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//     console.log(`My name is ${val.name}. I want to play ${val.games.strategy}`);
//   }).catch((error) => {
//     console.warn(error);
//   });

// const onValueChange = database.ref()
//   .on('value', (snapshot) => { // Obserwujemy zmiany na bazie. Uzywamy callbacka w tym przypadku, poniewaz Promise moze tylko raz się wykonać (w odniesieniu do once() ).
//     const val = snapshot.val();
//     console.log(val);
//   }, (error) => {
//     console.warn(error);
//   });

// database.ref().off('value', onValueChange);

// database.ref().set({
//   name: 'Hoops',
//   lastName: 'Hello',
//   games: {
//     scifi: 'Star Wars',
//     strategy: 'Warhammer',
//     fantasy: 'Lord of the Rings',
//     thriller: {
//       standard: 'Heeee',
//       notStandard: 'Weeee'
//     }
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((error) => {
//   console.warn('some error here:', error);
// });

// database.ref('name').set('Da hood');

// database.ref('games/scifi').set('Cyberpunk');

// database.ref('games').update({
//   strategy: 'Warhammer 40000',
//   scifi: null,
//   'thriller/standard': 'Boooooo'
// });


// database.ref('expenses').set({
//   rating: '',
//   users: ''
// }).then(() => {
//   console.log('Something new');
// }).catch((error) => {
//   console.warn('Pooop ;( some error here:', error);
// });

// database.ref('expenses/rating').remove();
