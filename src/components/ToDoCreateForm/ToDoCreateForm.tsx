import React, { FC, useState } from 'react';
import './ToDoCreateForm.css';
import { TodoItem } from '../ToDoItem/types';

const createToDo = async (title: string) => {
  const payload = {
    title,
    isDone: false,
  };

  const response = await fetch('http://localhost:8000/todoItems', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const createdToDo = await response.json();
  return createdToDo;
};

type ToDoCreateFormProps = {
  handleAddToDo: (createdToDo: TodoItem) => void;
}

const ToDoCreateForm: FC<ToDoCreateFormProps> = ({handleAddToDo}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdToDo = await createToDo(inputValue);
    setInputValue('');
    handleAddToDo(createdToDo);
  }

  return (
    <div className='formContainer'>
      <h1>Add ToDo</h1>
      <form className='createForm' onSubmit={handleFormSubmit}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Add ToDo'
          required
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default ToDoCreateForm;
