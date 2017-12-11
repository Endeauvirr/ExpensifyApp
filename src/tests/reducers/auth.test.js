import authReducer from '../../reducers/auth';

test('Should set user ID', () => {
  const uid = '112233abc';

  const state = authReducer({}, {
    type: 'LOGIN',
    uid
  });

  expect(state).toEqual({
    uid
  });

});


test('Should set empty object on logout', () => {
  const uid = '112233abc';

  const state = authReducer({ uid }, {
    type: 'LOGOUT'
  });

  expect(state).toEqual({});
});
