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


function ToDo() {
  const [todoData, setTodoData] = useState([]);
  const [content,setContent] = useState([]);
  const [counter,setCounter] = useState(0);

  useEffect(()=>{
      geTodoList();
  },[])

  const geTodoList = () => {
    const localData = localStorage.getItem("todoList");
    console.log('>>>'+localData);
    if(localData.length){
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

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(content.taskName)
    console.log(counter)

    if(content.taskName == "" || content.taskName == undefined){
        alert("Add a task name...");
        return false;
    }

    let taskObj = {id : counter,task:content.taskName,complete:false};
    todoData.push(taskObj);
    setTodoData(todoData);
    setCounter(counter+1);
    localStorage.setItem('todoList', JSON.stringify(todoData));
    console.log(JSON.stringify(todoData));

  }
  console.log(todoData);
  return (
    <>
      <div  className="header">
        <h2>My To Do List</h2>
        <form  onSubmit={onSubmit}>
            <input type="text" name="taskName" placeholder="Task Title..."  onChange={onChangeHandle} required/>
            <button type='submit' className="addBtn">Add</button>
        </form>
        
      </div>
      <ul >
        {
            todoData.length ?
            todoData.map((todo)=>(<li data={todo.complete} className={ todo.complete ? "checked": ""}   key={todo.id}  onClick={()=>onClickChangeHandle(todo.id)}>{todo.task}</li>))
            :
            <></>
          }
      </ul>
    </>
  );
}




const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ToDo />);