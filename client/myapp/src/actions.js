const addGoal = (goal,target) => ({
    type: 'CREATE_GOAL',
    payload: {
      goal: goal,
      target: target,
    }
  });
  
  const deleteGoal = (id) => ({
    type: 'DELETE_GOAL',
    payload: {id: id}
  });

  const decrementGoal = (id) => ({
    type: 'DECREMENT_GOAL',
    payload: {id: id}
  });

  const incrementGoal = (id) => ({
    type: 'INCREMENT_GOAL',
    payload: {id: id}
  });

  const addTodo = (todo) => ({
    type: 'CREATE_TODO',
    payload: {todo: todo}
  });

  const checkUncheckTodo=(id) =>({
    type: 'CHECK_UNCHECK_TODO',
    payload: {id: id}
  })

  module.exports = {
    addGoal,
    deleteGoal,
    decrementGoal,
    incrementGoal,
    addTodo,
    checkUncheckTodo,
  };
  