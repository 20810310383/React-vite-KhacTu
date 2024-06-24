
const TodoNew = (props) => {
    console.log("check props: ", props);
    const {addNewTodo} = props

    const handleClick = () => {
        alert("click me")
    }

    const handleOnChange = (name) => {
        console.log(">> handleOnChange: ", name);
    }


    return (
        <>
            <input className='inpTxt' placeholder='Enter your task' type="text" onChange={(event) => {handleOnChange(event.target.value)}} />
            <button className='btnAdd' onClick={handleClick} >Add</button>
        </>
    )
}

export default TodoNew