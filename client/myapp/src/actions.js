const addGoal = (goal,target) => ({
    type: 'CREATE_GOAL',
    payload: {
      goal: goal,
      target: target,
    }
  });

  const setGoal = (id,goal,progress,target) => ({
    type: 'SET_GOAL',
    payload: {
      id: id,
      goal: goal,
      progress: progress,
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

  const setTodo = (id,todo,completed) => ({
    type: 'SET_TODO',
    payload: {
      id: id,
      todo: todo,
      completed: completed,
    }
  });

  module.exports = {
    addGoal,
    setGoal,
    deleteGoal,
    decrementGoal,
    incrementGoal,
    addTodo,
    checkUncheckTodo,
    setTodo,
  };
  