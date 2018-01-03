import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = ({ uid, photoURL, displayName }) => ({
  type: 'LOGIN',
  uid,
  photoURL,
  displayName
});

export const startLogin = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};


export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut();
  };
};

export default startLogin;
