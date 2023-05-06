import {v4 as uuid} from 'uuid';
import axios from 'axios';
const initalState = [
];

let copyState=null;

const goalsReducer = (state = initalState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'CREATE_TODO':
      console.log('payload', payload);
      const newTodo={id: uuid(), todo: payload.todo, completed: false};
      axios.post("http://localhost:3001/todos", newTodo)
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
      return [...state, newTodo];
    case 'SET_TODO':
      if (state.some((todo) => todo.id === payload.id)) {
        return state;
      } else {
        console.log("ran here");
        return [...state, { id: payload.id, todo: payload.todo, completed: payload.completed}];
      }
    case 'CHECK_UNCHECK_TODO':
        console.log('payload', payload);
        copyState = state.map((todo) => {
          if (todo.id === payload.id) {
            const newCheck = !todo.completed;
            return {...todo, completed: newCheck};
          }
          return todo;
        });
        axios.patch("http://localhost:3001/todos",{id:payload.id});
        return [...copyState];
    default:
      return state;
  }
};

export default goalsReducer;