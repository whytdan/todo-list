import React, { useEffect, useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.css';
import { TodoItem as ToDoItemType } from '../ToDoItem/types';
import ToDoCreateForm from '../ToDoCreateForm/ToDoCreateForm';

const ToDoList = () => {
  const [todoItems, setTodoItems] = useState<ToDoItemType[]>([]);

  const handleToDoItemIsDoneChange = (id: number) => {
    const updatedToDoItems = todoItems.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, isDone: !todoItem.isDone } : todoItem
    );
    setTodoItems(updatedToDoItems);
  };

  const handleAddToDo = (createdToDo: ToDoItemType) => {
    setTodoItems([createdToDo, ...todoItems])
  }

  useEffect(() => {
    const fetchToDoItems = async () => {
      const response = await fetch('http://localhost:8000/todoItems');
      const data = await response.json();
      setTodoItems(data);
    };

    fetchToDoItems();
  }, []);

  return (
    <>

      <ToDoCreateForm handleAddToDo={handleAddToDo} />
    
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
