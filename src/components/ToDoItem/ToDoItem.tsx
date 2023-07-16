import React, { FC } from 'react';
import { TodoItem } from './types';
import './ToDoItem.css';

type ToDoItemProps = {
  data: TodoItem;
  handleToDoItemIsDoneChange: (id: number) => void;
};

const ToDoItem: FC<ToDoItemProps> = ({ data, handleToDoItemIsDoneChange }) => {
  const { id, title, isDone } = data;

  const handleIsDoneChange = () => {
    handleToDoItemIsDoneChange(id);
  };

  return (
    <li className='todoItem'>
      <p className={`title ${isDone ? 'taskIsDone' : ''}`}>{title}</p>
      <input type='checkbox' checked={isDone} onChange={handleIsDoneChange} />
    </li>
  );
};

export default ToDoItem;
