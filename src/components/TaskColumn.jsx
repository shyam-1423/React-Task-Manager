import React from 'react';
import { useDispatch } from 'react-redux';
import {
    moveTask,
    deleteTask,
    toggleTaskCompleted
} from '../actions';
import TaskCard from './TaskCard';
import {
    Circle,
    Clock,
    ClipboardList,
    CheckSquare
} from 'lucide-react';
import '../styles/TaskColumn.scss';

const TaskColumn = ({ category, tasks }) => {
    const dispatch = useDispatch();

    const getCategoryIcon = () => {
        switch (category) {
            case 'todo':
                return <ClipboardList size={18} />;
            case 'in-progress':
                return <Clock size={18} />;
            case 'done':
                return <CheckSquare size={18} />;
            default:
                return <Circle size={18} />;
        }
    };

    const getCategoryTitle = () => {
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        const taskId = e.dataTransfer.getData('taskId');
        const sourceCategory = e.dataTransfer.getData('sourceCategory');

        if (sourceCategory !== category) {
            dispatch(moveTask(taskId, sourceCategory, category));
        }
    };

    return (
        <div
            className="task-column"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="column-header">
                {getCategoryIcon()}
                <h3>{getCategoryTitle()}</h3>
                <span className="task-count">{tasks.length}</span>
            </div>

            <div className="task-list">
                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <p>No tasks here yet</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={() => dispatch(deleteTask(task.id))}
                            onToggleComplete={() => dispatch(toggleTaskCompleted(task.id))}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskColumn;