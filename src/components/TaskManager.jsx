import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Plus,
    Search,
    Sun,
    Moon,
    Layout,
    Calendar,
    CheckCircle2,
    ListChecks
} from 'lucide-react';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import '../styles/TaskManager.scss';

const TaskManager = () => {
    // const dispatch = useDispatch();
    const { tasks, categories } = useSelector(state => state);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Count total tasks
    const totalTasks = Object.values(tasks).reduce(
        (sum, categoryTasks) => sum + categoryTasks.length,
        0
    );

    // Count completed tasks
    const completedTasks = Object.values(tasks).reduce(
        (sum, categoryTasks) => sum + categoryTasks.filter(task => task.completed).length,
        0
    );

    // Get today's date
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className={`task-manager ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    {/* Sidebar */}
                    <div className="col-lg-3 sidebar">
                        <div className="sidebar-header">
                            <div className="app-brand">
                                <Layout className="brand-icon" />
                                <h1>TaskFlow</h1>
                            </div>
                            <button
                                className="theme-toggle-btn"
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        <div className="sidebar-content">
                            <div className="date-display">
                                <Calendar size={18} />
                                <span>{today}</span>
                            </div>

                            <div className="task-stats">
                                <div className="stat-card">
                                    <ListChecks size={20} />
                                    <div className="stat-details">
                                        <h3>{totalTasks}</h3>
                                        <p>Total Tasks</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <CheckCircle2 size={20} />
                                    <div className="stat-details">
                                        <h3>{completedTasks}</h3>
                                        <p>Completed</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="add-task-btn"
                                onClick={() => setIsFormOpen(true)}
                            >
                                <Plus size={20} />
                                <span>Add New Task</span>
                            </button>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="col-lg-9 main-content">
                        <div className="content-header">
                            <h2>My Tasks</h2>
                            <div className="search-box">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="task-columns-container">
                            {categories.map(category => (
                                <TaskColumn
                                    key={category}
                                    category={category}
                                    tasks={tasks[category].filter(task =>
                                        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        task.description.toLowerCase().includes(searchTerm.toLowerCase())
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Form Modal */}
            {isFormOpen && (
                <TaskForm
                    onClose={() => setIsFormOpen(false)}
                    categories={categories}
                />
            )}
        </div>
    );
};

export default TaskManager;