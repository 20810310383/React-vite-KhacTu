import { useState } from 'react'
import './components/todo/todo.css'
import TodoNew from './components/todo/TodoNew'
import TodoData from './components/todo/TodoData'
import reactLogo from './assets/react.svg'


// () => {}
const App = () => {

  const str = "khắc tú"
  const age = 22
  const data = {
    address: "hà nội",
    country: "vietnam"
  }

  const addNewTodo = (name) => {
    alert(`call me ${name}`)
  }
  

  return (
    <div className='todo-container'>
      <div className='todo-title'>Todo list</div>
      <div>
        <TodoNew addNewTodo={addNewTodo} />
        <TodoData
            name={str}
            age={age}
            data={data}
            
        />
        <div className='todo-image'>
           <img className='logo' src={reactLogo} alt="" />
        </div>
      </div>
    </div>
  )
}

export default App
