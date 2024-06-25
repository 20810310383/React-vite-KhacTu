import { useState } from "react"

const TodoNew = (props) => {

    // useState hook (get/set)
    const [valueInput, setValueInput] = useState("")
    // const valueInput = "qqq"
    const {addNewTodo} = props

    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput("")
    }

    const handleOnChange = (name) => {
        setValueInput(name)
        
    }


    return (
        <>
            <input  value={valueInput} 
                    className='inpTxt' 
                    placeholder='Enter your task' 
                    type="text" 
                    required
                    onChange={(event) => {handleOnChange(event.target.value)}} 
            />
            <button className='btnAdd' onClick={handleClick} >Add</button>
            <div>My text input: {valueInput}</div>
        </>
    )
}

export default TodoNew