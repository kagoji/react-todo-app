import {React,useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';


function TaskAdd({props}){
  return(
    <>
      <li className=''>{props.task}</li>
    </>
  )
}

// const initData = geInitList();
// const geInitList = () => {
//   const localData = localStorage.getItem("todoList");
//   console.log('>>>'+localData);
//   return localData; 
// }
function ToDo() {
  //const initData = geInitList();
  const [todoData, setTodoData] = useState([]);
  const [content,setContent] = useState([]);
  const [counter,setCounter] = useState(0);

  useEffect(()=>{
      geTodoList();
  },[])

  const geTodoList = () => {
    const localData = localStorage.getItem("todoList");
    console.log('>>>'+localData);
    if(localData){
      setTodoData(JSON.parse(localData));
      setCounter(JSON.parse(localData).length);
    }
  }

  

  const onChangeHandle = (e) => {
    const {name,value} = e.target;
    setContent({
        ...content,
        [name]:value
    })
  }

  const onClickChangeHandle = (todoId) =>{
    console.log('Change');
    const update = todoData.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });

    setTodoData(update);
    localStorage.setItem('todoList', JSON.stringify(update));
  }

  const onClickRemove = (todoId) =>{
    console.log('CLOSE'+(todoId));

    // todoData.filter((todo) => todo.id != todoId);
    // setTodoData(todoData.filter((todo) => todo.id != todoId));
    // console.log('CLOSE DATA'+JSON.stringify(todoData));
    // localStorage.setItem('todoList', JSON.stringify(todoData));

    // const update = todoData.map((todo) => {
    //   if (todo.id != todoId) {
    //     return todo;
    //   } 
    // });
    // console.log('CLOSE DATA'+JSON.stringify(update));
    // setTodoData(update);
    // localStorage.setItem('todoList', JSON.stringify(update));

    todoData.splice((todoId),1);
    console.log('CLOSE DATA'+JSON.stringify(todoData));
    setTodoData(todoData);
    setCounter(todoData.length);
    localStorage.setItem('todoList', JSON.stringify(todoData));

 }

  let uuidGenerator = function(){
    let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = (dt + Math.random() * 32) % 32 | 0;
          dt = Math.floor(dt / 32);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(32);
      });
      return uuid;
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(content.taskName)
    console.log(counter)

    if(content.taskName == "" || content.taskName == undefined){
        alert("Add a task name...");
        return false;
    }

    let taskObj = {id : uuidGenerator(),task:content.taskName,complete:false};
    todoData.push(taskObj);
    setTodoData(todoData);
    setCounter(todoData.length);
    localStorage.setItem('todoList', JSON.stringify(todoData));
    console.log(JSON.stringify(todoData));

  }
  console.log(todoData);
  return (
    <>
      <div  className="header">
        <h2>My To Do List</h2>
        <form  onSubmit={onSubmit}>
            <input 
            type="text" 
            name="taskName" 
            placeholder="Task Title..."  
            onChange={onChangeHandle} 
            required/>
            <button type='submit' className="addBtn">Add</button>
        </form>
        
      </div>
      <ul >
        {
            todoData.length ?
            todoData.map((todo,index)=>(
            <li 
              data={todo.complete} 
              className={ todo.complete ? "checked": ""}   
              key={index}  
              onClick={()=>onClickChangeHandle(todo.id)}
            >
              {todo.task}
            <span 
              onClick={()=>onClickRemove(index)} 
              className='close'>
                x</span>
            </li>
            ))
            :
            <></>
          }
      </ul>
    </>
  );
}




const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ToDo />);