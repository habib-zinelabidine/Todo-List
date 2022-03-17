import React from 'react'

import './TodoList.css'


const TodoList = ({todolist,Delete,completedtodo,clearcompleted}) => {
    return (
    <ul className='list'>
        {todolist.map((valeur)=>{
            return(
                <li  key={valeur.id}  >
                   <label onClick={()=>completedtodo(valeur.id)} className={valeur.isComplete ? 'complete' : 'non-complete'}>{valeur.text}</label>
                   <button onClick={()=>{Delete(valeur.id)}}>X</button>
                </li>
            );
        })}
        <li className='item'>{todolist.length > 1 ? `${todolist.length} items left `: `${todolist.length} item left`}
        <button className='btn-clear' onClick={clearcompleted}>Clear Completed</button></li>
    </ul>
  )
}

export default TodoList
