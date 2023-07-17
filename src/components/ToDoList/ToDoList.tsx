import React, { useEffect, useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './ToDoList.css';
import { TodoItem as ToDoItemType } from '../ToDoItem/types';
import ToDoCreateForm from '../ToDoCreateForm/ToDoCreateForm';
import ToDoEditModal from '../ToDoEditModal/ToDoEditModal';

type ToDoItemToEdit = {
  id: number;
  title: string;
}

const editToDoTitle = async (id: number, title:string) => {

  const body = {
    title,
  }

  const response = await fetch(`http://localhost:8000/todoItems/${id}`, {
    method: 'PATCH', 
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const editedToDo = await response.json();
  return editedToDo;
}

const ToDoList = () => {
  const [todoItems, setTodoItems] = useState<ToDoItemType[]>([]);
  const [itemToEdit, setItemToEdit] = useState<ToDoItemToEdit | null>(null);

  const handleToDoItemIsDoneChange = (id: number) => {
    const updatedToDoItems = todoItems.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, isDone: !todoItem.isDone } : todoItem
    );
    setTodoItems(updatedToDoItems);
  };

  const handleRemoveToDo = (id: number) => {
    const filteredToDoItems = todoItems.filter(toDoItem => toDoItem.id !== id);
    setTodoItems(filteredToDoItems);
  }

  const handleAddToDo = (createdToDo: ToDoItemType) => {
    setTodoItems([createdToDo, ...todoItems])
  }

  const switchToEditMode = (id: number, title: string) => {
    setItemToEdit({
      id, 
      title
    })
  }

  const closeEditModal = () => setItemToEdit(null);

  const handleEditToDo = async (id: number, newTitle: string) => {

    const updatedToDo = await editToDoTitle(id, newTitle);

    const updatedToDoItems = todoItems.map(todoItem => todoItem.id === id ? updatedToDo : todoItem )


    setTodoItems(updatedToDoItems);
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

      {itemToEdit ? <ToDoEditModal handleEditToDo={handleEditToDo} closeEditModal={closeEditModal} itemToEdit={itemToEdit}/> : null}
    
      <h1 className='heading'>My ToDo List</h1>

      <ul className='todoItemsList'>
        {todoItems.map((todoItem) => (
          <ToDoItem
            key={todoItem.id}
            data={todoItem}
            handleToDoItemIsDoneChange={handleToDoItemIsDoneChange}
            handleRemoveToDo={handleRemoveToDo}
            switchToEditMode={switchToEditMode}
          />
        ))}
      </ul>
    </>
  );
};

export default ToDoList;
