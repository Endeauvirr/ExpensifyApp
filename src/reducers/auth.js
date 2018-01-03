const authReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN': {
    return {
      uid: action.uid,
      photoURL: action.photoURL,
      displayName: action.displayName
    };
  }
  case 'LOGOUT': {
    return {};
  }
  default: {
    return state;
  }
  }
};

export default authReducer;
