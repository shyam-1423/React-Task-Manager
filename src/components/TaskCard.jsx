import React, { useState } from 'react';
import {
    Trash2,
    Edit,
    MoreVertical,
    Calendar,
    CheckCircle,
    Circle
} from 'lucide-react';
import TaskForm from './TaskForm';
import '../styles/TaskCard.scss';

const TaskCard = ({ task, onDelete, onToggleComplete }) => {
    const [showActions, setShowActions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const getPriorityClass = () => {
        switch (task.priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.setData('sourceCategory', task.category);
    };

    return (
        <>
            <div
                className={`task-card ${task.completed ? 'completed' : ''}`}
                draggable
                onDragStart={handleDragStart}
            >
                <div className="task-header">
                    <div className="task-priority">
                        <span className={`priority-indicator ${getPriorityClass()}`}></span>
                        <span className="priority-text">{task.priority}</span>
                    </div>
                    <button
                        className="more-actions-btn"
                        onClick={() => setShowActions(!showActions)}
                    >
                        <MoreVertical size={16} />
                    </button>

                    {showActions && (
                        <div className="actions-dropdown">
                            <button onClick={() => setIsEditing(true)}>
                                <Edit size={14} />
                                <span>Edit</span>
                            </button>
                            <button onClick={onDelete}>
                                <Trash2 size={14} />
                                <span>Delete</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="task-content">
                    <div className="task-title-row">
                        <button
                            className="complete-toggle"
                            onClick={onToggleComplete}
                        >
                            {task.completed ?
                                <CheckCircle size={18} className="completed-icon" /> :
                                <Circle size={18} />
                            }
                        </button>
                        <h4 className={task.completed ? 'completed-text' : ''}>
                            {task.title}
                        </h4>
                    </div>

                    <p className="task-description">
                        {task.description}
                    </p>
                </div>

                <div className="task-footer">
                    <div className="due-date">
                        <Calendar size={14} />
                        <span>Due: {formatDate(task.dueDate)}</span>
                    </div>
                </div>
            </div>

            {isEditing && (
                <TaskForm
                    task={task}
                    onClose={() => setIsEditing(false)}
                    categories={['todo', 'in-progress', 'done']}
                />
            )}
        </>
    );
};

export default TaskCard;