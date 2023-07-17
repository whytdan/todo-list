import React, { FC, useEffect, useState } from 'react'

type ToDoEditModalProps = {
  itemToEdit: {
    id: number,
    title: string
  },
  handleEditToDo: (id: number, title: string) => void;
  closeEditModal: () => void
}

const ToDoEditModal: FC<ToDoEditModalProps> = ({itemToEdit, closeEditModal, handleEditToDo}) => {

  const [newTitleValue, setNewTitleValue] = useState(itemToEdit.title);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTitleValue(e.currentTarget.value);
  }

  useEffect(() => {
    setNewTitleValue(itemToEdit.title)
  }, [itemToEdit]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditToDo(itemToEdit.id, newTitleValue);
    closeEditModal();
  }


  return (
    <div className='editModal'>
      <h2>Update ToDo</h2>
      <form className='editModalForm' onSubmit={handleSubmit}>
        <input value={newTitleValue} onChange={handleChange} />

        <div>
          <button onClick={closeEditModal}>Cancel</button>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default ToDoEditModal