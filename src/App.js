import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import TaskManager from './components/TaskManager';
import './styles/App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <TaskManager />
        <footer className="app-footer">
          <div className="footer-content text-center">
            <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;