const addGoal = (userId,goalid,goal,target) => ({
    type: 'CREATE_GOAL',
    payload: {
      userId: userId,
      goalid: goalid,
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
  
  const deleteGoal = (userId,id) => ({
    type: 'DELETE_GOAL',
    payload: {
      userId: userId,
      id: id
    }
  });

  const decrementGoal = (userId,id) => ({
    type: 'DECREMENT_GOAL',
    payload: {
      userId: userId,
      id: id}
  });

  const incrementGoal = (userId,id) => ({
    type: 'INCREMENT_GOAL',
    payload: {
      userId: userId,
      id: id}
  });

  const addTodo = (userId,todo) => ({
    type: 'CREATE_TODO',
    payload: {
      userId: userId,
      todo: todo}
  });

  const checkUncheckTodo=(userId,id) =>({
    type: 'CHECK_UNCHECK_TODO',
    payload: {
      userId,
      id: id}
  })

  const setTodo = (id,todo,completed) => ({
    type: 'SET_TODO',
    payload: {
      id: id,
      todo: todo,
      completed: completed,
    }
  });

  const clearTodo = () => ({
    type: 'CLEAR_TODOS'
  });

  const clearGoals = () => ({
    type: 'CLEAR_GOALS'
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
    clearTodo,
    clearGoals,
  };
  