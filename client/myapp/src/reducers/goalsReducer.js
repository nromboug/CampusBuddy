const initalState = [
];

let copyState = null;
let index = 0;

const goalsReducer = (state = initalState, action) => {
  const {type, payload} = action;

  switch (type) {
    case 'CREATE_GOAL':
      console.log('payload', payload);
      const newGoal = { userId: payload.userId, id: payload.goalid, goal: payload.goal, progress: 0, target: payload.target };
      return [...state, newGoal];
    case 'SET_GOAL':
        if (state.some((goal) => goal.id === payload.id)) {
          return state;
        } else {
          return [...state, { id: payload.id, goal: payload.goal, progress: payload.progress, target: payload.target }];
        }
    case 'DELETE_GOAL':
        copyState = [...state];
        index = copyState.findIndex((x) => x.id === payload.id);
        copyState.splice(index, 1);
        return [...copyState]; 
    case 'DECREMENT_GOAL':
        copyState = state.map((goal) => {
        if (goal.id === payload.id && goal.progress!==0) {
            const newProgress = goal.progress - 1;
            return {...goal, progress: newProgress};
        }
          return goal;
        });
        return copyState;
    case 'INCREMENT_GOAL':
        copyState = state.map((goal) => {
        if (goal.id === payload.id && goal.progress < goal.target) {
            const newProgress = goal.progress + 1;
            return {...goal, progress: newProgress};
            }
            return goal;
        });
        return copyState;
    default:
      return state;
  }
};

export default goalsReducer;