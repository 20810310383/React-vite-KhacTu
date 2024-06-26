import { useState } from 'react'
import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew'
import TodoData from './components/todo/TodoData'
import reactLogo from './assets/react.svg'


// () => {}
const App = () => {

  const [todoList, setTodoList] = useState([])

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }

    setTodoList([...todoList, newTodo])
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
          todoList.length > 0 ? <TodoData todoList={todoList} /> :
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

export default App
