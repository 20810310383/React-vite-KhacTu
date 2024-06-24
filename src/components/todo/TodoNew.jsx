import { useState } from "react"

const TodoNew = (props) => {

    // useState hook (get/set)
    const [valueInput, setValueInput] = useState("tú")
    // const valueInput = "qqq"
    const {addNewTodo} = props

    const handleClick = () => {
        console.log(">>> check valueInput: ",valueInput);
    }

    const handleOnChange = (name) => {
        setValueInput(name)
    }


    return (
        <>
            <input className='inpTxt' placeholder='Enter your task' type="text" onChange={(event) => {handleOnChange(event.target.value)}} />
            <button className='btnAdd' onClick={handleClick} >Add</button>
            <div>My text input: {valueInput}</div>
        </>
    )
}

export default TodoNew