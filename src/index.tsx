import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);




// GET http://localhost:8000/todoItems/
// POST http://localhost:8000/todoItems/ {}

// PATCH http://localhost:8000/todoItems/4 {}
// PUT http://localhost:8000/todoItems/4  {}
// DELETE http://localhost:8000/todoItems/4 


