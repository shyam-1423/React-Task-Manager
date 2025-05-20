import {
    ADD_TASK,
    EDIT_TASK,
    DELETE_TASK,
    TOGGLE_TASK_COMPLETED,
    MOVE_TASK
} from '../actions';
import { v4 as uuidv4 } from 'uuid';

// Initial state with sample tasks
const initialState = {
    tasks: {
        'todo': [
            {
                id: uuidv4(),
                title: 'Learn Redux',
                description: 'Study Redux state management',
                priority: 'high',
                dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                completed: false,
                category: 'todo',
                createdAt: new Date().toISOString(),
            },
            {
                id: uuidv4(),
                title: 'Create Task Manager App',
                description: 'Build a task manager with React and Redux',
                priority: 'medium',
                dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
                completed: false,
                category: 'todo',
                createdAt: new Date().toISOString(),
            },
        ],
        'in-progress': [
            {
                id: uuidv4(),
                title: 'Design UI Components',
                description: 'Create modern UI components using SCSS and Bootstrap',
                priority: 'high',
                dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                completed: false,
                category: 'in-progress',
                createdAt: new Date().toISOString(),
            },
        ],
        'done': [
            {
                id: uuidv4(),
                title: 'Setup Project',
                description: 'Initialize React project with necessary dependencies',
                priority: 'low',
                dueDate: new Date().toISOString().split('T')[0],
                completed: true,
                category: 'done',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
            },
        ],
    },
    categories: ['todo', 'in-progress', 'done'],
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK: {
            const { category = 'todo' } = action.payload;
            const newTask = {
                ...action.payload,
                id: uuidv4(),
                completed: false,
                createdAt: new Date().toISOString(),
            };

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [category]: [...state.tasks[category], newTask],
                },
            };
        }

        case EDIT_TASK: {
            const { id, category } = action.payload;
            const updatedTasks = state.tasks[category].map(task =>
                task.id === id ? { ...task, ...action.payload } : task
            );

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [category]: updatedTasks,
                },
            };
        }

        case DELETE_TASK: {
            // Find which category the task is in
            let targetCategory = '';
            Object.keys(state.tasks).forEach(category => {
                if (state.tasks[category].some(task => task.id === action.payload)) {
                    targetCategory = category;
                }
            });

            // If category found, filter out the task
            if (targetCategory) {
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [targetCategory]: state.tasks[targetCategory].filter(
                            task => task.id !== action.payload
                        ),
                    },
                };
            }

            return state;
        }

        case TOGGLE_TASK_COMPLETED: {
            // Find which category the task is in
            let targetCategory = '';
            let targetTask = null;

            Object.keys(state.tasks).forEach(category => {
                const task = state.tasks[category].find(task => task.id === action.payload);
                if (task) {
                    targetCategory = category;
                    targetTask = task;
                }
            });

            if (targetCategory && targetTask) {
                // Toggle completed status
                const updatedTask = { ...targetTask, completed: !targetTask.completed };

                // If task is now completed, move it to 'done' category
                // If task is uncompleted and was in 'done', move it back to 'todo'
                let fromCategory = targetCategory;
                let toCategory = targetCategory;

                if (updatedTask.completed && targetCategory !== 'done') {
                    toCategory = 'done';
                } else if (!updatedTask.completed && targetCategory === 'done') {
                    toCategory = 'todo';
                }

                // If category changed, move the task
                if (fromCategory !== toCategory) {
                    return {
                        ...state,
                        tasks: {
                            ...state.tasks,
                            [fromCategory]: state.tasks[fromCategory].filter(
                                task => task.id !== action.payload
                            ),
                            [toCategory]: [...state.tasks[toCategory], updatedTask],
                        },
                    };
                }

                // If category didn't change, just update the task
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        [targetCategory]: state.tasks[targetCategory].map(task =>
                            task.id === action.payload ? updatedTask : task
                        ),
                    },
                };
            }

            return state;
        }

        case MOVE_TASK: {
            const { taskId, fromCategory, toCategory } = action.payload;

            // Find the task to move
            const taskToMove = state.tasks[fromCategory].find(task => task.id === taskId);

            if (!taskToMove) {
                return state;
            }

            // Update the task with new category
            const updatedTask = { ...taskToMove, category: toCategory };

            // Remove task from source category and add to destination category
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [fromCategory]: state.tasks[fromCategory].filter(task => task.id !== taskId),
                    [toCategory]: [...state.tasks[toCategory], updatedTask],
                },
            };
        }

        default:
            return state;
    }
};

export default tasksReducer;