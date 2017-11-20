import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = () => ({
  type: 'SET'
});

const resetCount = () => ({
  type: 'RESET'
});

// REDUCERS
// 1. Reduktory są czystymi funkcjami. Zaleza wylacznie od argumentow przekazanych do funkcji i nie korzystają z zewnętrznych elementów
// 2. Nigdy w reduktorze nie zmieniamy stanu ani akcji. Zwracamy nowy obiekt.

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT': {
      return {
        count: state.count - action.decrementBy
      };
    }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state;
  }
};

const store = createStore(countReducer);




store.subscribe(() => {
  console.log(store.getState());
});


store.dispatch(incrementCount({ incrementBy: 5 }));


store.dispatch(decrementCount({ decrementBy: 55 }));

store.dispatch(incrementCount({ incrementBy: 3 }));

store.dispatch(resetCount());
