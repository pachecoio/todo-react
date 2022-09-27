import './TodoList.css'
import {useEffect, useState} from "react";


enum TodoStatus {
  NEW,
  COMPLETED,
}

export class Todo {
  title!: string;
  status: TodoStatus = TodoStatus.NEW;

  constructor(title: string) {
    this.title = title
  }

  complete() {
    this.status = TodoStatus.COMPLETED;
  }

  reset() {
    this.status = TodoStatus.NEW;
  }
}

type TodoProps = {
  initialTodos?: Todo[]
}
export function TodoList({initialTodos = []}: TodoProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<string>("")

  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  const addTodo = () => {
    // @ts-ignore
    setTodos([...todos, new Todo(newTodo)])
    setNewTodo("")
  }

  const updateTodoValue = (e: any) => {
    const {value} = e.target;
    setNewTodo(value)
  }

  const deleteTodo = (index: number) => {
    const updatedTodos = [...todos]
    updatedTodos.splice(index, 1)
    setTodos(updatedTodos)
  }

  const handleComplete = (todo: Todo) => {
    if (todo.status === TodoStatus.COMPLETED) {
      todo.reset()
    } else {
      todo.complete()
    }
    setTodos([...todos])
  }

  return (
    <div className="todos">
      <h1>Test Todo list</h1>
      <div className="add">
        <input type="text" placeholder="What needs to be done?" value={newTodo} onChange={updateTodoValue}/>
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {
        todos.length ? (
          <ul className="list" data-testid="todo-list">
            {
              todos.map((todo: Todo, index: number) => (
                <li key={index} data-testid="todo-list-item">
                  <input type="checkbox" data-testid="complete" onClick={() => handleComplete(todo)}/>
                  {todo.status === TodoStatus.COMPLETED ? (
                    <s data-testid="completed-todo">{todo.title}</s>
                  ) : (
                    <span>{todo.title}</span>
                  )}
                  <button type="button" onClick={() => deleteTodo(index)}>Delete</button>
                </li>
              ))
            }
          </ul>
        ) : (
          <p>No todos</p>
        )
      }
    </div>
  );
}