import { useState } from 'react'
import './todo.css'
import TodoNew from './TodoNew'
import TodoData from './TodoData'
import reactLogo from '../../assets/react.svg'

const TodoApp = () => {
    const [todoList, setTodoList] = useState([])
  
    const addNewTodo = (name) => {
      const newTodo = {
        id: randomIntFromInterval(1, 1000000),
        name: name
      }
  
      setTodoList([...todoList, newTodo])
    }
  
    const deleteTodo = (id) => {
      const newTodo = todoList.filter(item => item.id !== id)
      setTodoList(newTodo)
      console.log("check id: ", id);
      console.log("check newTodo: ", newTodo);
    }
  
    const randomIntFromInterval = (min, max) => { // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  
    return (
  
      <div className='todo-container'>
          <div className='todo-title'>Todo list</div>
          <div>
            <TodoNew addNewTodo={addNewTodo} />
  
            {
              todoList.length > 0 ? <TodoData todoList={todoList} deleteTodo={deleteTodo} /> :
              <>
                <div className='todo-image'>
                  <img className='logo' src={reactLogo} alt="" />
                </div>
              </>          
            }
          </div>
        </div>
  
    )
}
  
export default TodoApp
