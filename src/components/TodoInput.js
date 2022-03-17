import React,{ useState } from 'react'
import './TodoInput.css'

const TodoInput = ({Add}) => {
  const [todoValue,settodoValue] = useState('')
  
  const AddNewList = e =>{
    e.preventDefault();
    settodoValue('')
    Add(todoValue)
  }
  return (
    <form className='card' onSubmit={AddNewList}>
        <input type="text" value={todoValue} placeholder="Create new todo ..." onChange={(e)=>{settodoValue(e.target.value)}}/>
    </form>
  )
}

export default TodoInput
