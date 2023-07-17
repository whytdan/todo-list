import React, { FC } from 'react';
import { TodoItem } from './types';
import deleteIcon from '../../assets/remove.png';
import editIcon from '../../assets/pencil.png'
import './ToDoItem.css';

type ToDoItemProps = {
  data: TodoItem;
  handleToDoItemIsDoneChange: (id: number) => void;
  handleRemoveToDo:  (id: number) => void;
  switchToEditMode: (id:number, title: string) => void;
};

const updateIsDone = async (id: number, isDone: boolean) => {

  const body = {
    isDone
  }

  const response = await fetch(`http://localhost:8000/todoItems/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
}

const deleteToDo = async (id: number) => {

  const response = await fetch(`http://localhost:8000/todoItems/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
}

const ToDoItem: FC<ToDoItemProps> = ({ data, handleToDoItemIsDoneChange, handleRemoveToDo, switchToEditMode }) => {
  const { id, title, isDone } = data;

  const handleIsDoneChange = async () => {
    await updateIsDone(id, !isDone);
    handleToDoItemIsDoneChange(id);
  };

  const handleRemoveIconClick = async () => {
    await deleteToDo(id);
    handleRemoveToDo(id);
  }

  const handleEditIconClick = () => {
    switchToEditMode(id, title);
  }

  return (
    <li className='todoItem'>
      <p className={`title ${isDone ? 'taskIsDone' : ''}`}>{title}</p>
      <input type='checkbox' checked={isDone} onChange={handleIsDoneChange} />

      <img onClick={handleEditIconClick} className='editIcon' src={editIcon} alt='Edit Icon' />
      <img onClick={handleRemoveIconClick} className='deleteIcon' src={deleteIcon} alt='Delete Icon' />
    </li>
  );
};

export default ToDoItem;
