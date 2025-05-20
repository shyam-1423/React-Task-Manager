// Action Types
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK_COMPLETED = 'TOGGLE_TASK_COMPLETED';
export const MOVE_TASK = 'MOVE_TASK';

// Action Creators
export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const editTask = (task) => ({
    type: EDIT_TASK,
    payload: task,
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
});

export const toggleTaskCompleted = (taskId) => ({
    type: TOGGLE_TASK_COMPLETED,
    payload: taskId,
});

export const moveTask = (taskId, fromCategory, toCategory) => ({
    type: MOVE_TASK,
    payload: {
        taskId,
        fromCategory,
        toCategory,
    },
});