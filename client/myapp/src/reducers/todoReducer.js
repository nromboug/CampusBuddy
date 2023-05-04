import {v4 as uuid} from 'uuid';
const initalState = [
  {
    id: uuid(),
    todo: 'Make a Session',
    completed: false,
  }
];

let copyState=null;

const goalsReducer = (state = initalState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'CREATE_TODO':
      console.log('payload', payload);
      return [...state, {id: uuid(), todo: payload.todo, completed: false}];
    case 'CHECK_UNCHECK_TODO':
        console.log('payload', payload);
        copyState = state.map((todo) => {
          if (todo.id === payload.id) {
            const newCheck = !todo.completed;
            return {...todo, completed: newCheck};
          }
          return todo;
        });
        return [...copyState];
    default:
      return state;
  }
};

export default goalsReducer;