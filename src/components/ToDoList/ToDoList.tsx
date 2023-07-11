import React, { useState } from 'react';
import { localTodoItems } from './consts';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.css';

const ToDoList = () => {
  const [todoItems, setTodoItems] = useState(localTodoItems);

  const handleToDoItemIsDoneChange = (id: number) => {
    const updatedToDoItems = todoItems.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, isDone: !todoItem.isDone } : todoItem
    );
    setTodoItems(updatedToDoItems);
  };

  console.log('todoItems:', todoItems);

  return (
    <>
      <h1 className='heading'>My ToDo List</h1>

      <ul className='todoItemsList'>
        {todoItems.map((todoItem) => (
          <ToDoItem
            key={todoItem.id}
            data={todoItem}
            handleToDoItemIsDoneChange={handleToDoItemIsDoneChange}
          />
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
