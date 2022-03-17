import React,{ useState } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import '../components/Todo.css'

const list = [
  {id : "1" , text : "Complete online JavaScript course" , isComplete : true},
  {id : "2" , text : "Jog around the park", isComplete : false},
  {id : "3" , text : "10 minutes mediatation", isComplete : false},
  {id : "4" , text : "Read for an hour", isComplete : false},
  {id : "5" , text : "Pick up groceries", isComplete : false},
  {id : "6" , text : "Complete Todo app", isComplete : false}

]

const Todo = () => {

  const [todolist,settodolist] = useState(list)

  const AddNewList = (todoValue) =>{
    var list = {id : Math.random() , text : todoValue}
    settodolist ([...todolist,list])

}
const Delete = (id)=>{
    if (window.confirm('Are you sure you want to delete ?')){
        settodolist(todolist.filter((f)=> f.id !== id))
        
    }
}

const completedtodo = id =>{
    let updatedTodos = todolist.map(todo => {
        if (todo.id === id) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      });
      settodolist(updatedTodos);
    
}
const clearcompleted = ()=>{
  settodolist(todolist.filter((f)=> f.isComplete === false))
}

  return (
    <div className="app-dark">
      
        <div className="titleContainer">
          <h1>TODO</h1>
        </div>
        <div className="todoInput">
            <TodoInput Add={AddNewList} />
        </div>
        <div className="todolist">
          <TodoList  todolist={todolist} Delete={Delete} completedtodo={completedtodo} clearcompleted={clearcompleted}/>
        </div>
      
  </div>
  )
}

export default Todo