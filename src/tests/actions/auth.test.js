import { login, logout } from '../../actions/auth';

test('Should setup login action object', () => {
  const uid = '112233abc';
  const photoURL = "http://photoUrl.png";
  const displayName = "Test Test";

  const action = login({ uid, photoURL, displayName });

  expect(action).toEqual({
    type: 'LOGIN',
    uid,
    photoURL,
    displayName
  });
});

test('Should setup logout action object', () => {
  const action = logout();

  expect(action).toEqual({
    type: 'LOGOUT',
  });
});
