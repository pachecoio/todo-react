import {Todo, TodoList} from "./TodoList";
import {fireEvent, getByText, render, screen} from "@testing-library/react";

describe("Test todo list", () => {
  test("should render todo list component", () => {
    render(<TodoList/>)
    const title = screen.getByText(/Test Todo list/i)
    expect(title).toBeVisible()
    expect(title).toBeInTheDocument()
  })

  test("Should initialize with empty list", () => {
    render(<TodoList/>)
    const emptyList = screen.getByText(/No todos/i)
    expect(emptyList).toBeVisible()
    expect(emptyList).toBeInTheDocument()
  })

  test("Should have input available", () => {
    render(<TodoList/>)
    const input = screen.getByPlaceholderText("What needs to be done?")
    expect(input).toBeVisible()
    expect(input).toHaveValue("")
  })

  test("should add new todo", () => {
    render(<TodoList/>)
    const input = screen.getByPlaceholderText("What needs to be done?")
    fireEvent.change(input, {target: {value: 'New todo'}})
    // @ts-ignore
    expect(input.value).toBe("New todo")
    const button = screen.getByText("Add Todo")
    expect(button).toBeVisible()
    fireEvent.click(button)
    const emptyList = screen.queryByText('No todos')
    expect(emptyList).not.toBeInTheDocument()

    const list = screen.queryByTestId('todo-list')
    expect(list).toBeInTheDocument()

    const listItems = screen.queryAllByTestId('todo-list-item')
    expect(listItems).toHaveLength(1)
  })

  test("should initialize with list of todos", () => {
    render(<TodoList initialTodos={[
      new Todo("todo 1"),
      new Todo("todo 2")
    ]}/>)
    const listItems = screen.queryAllByTestId("todo-list-item")
    expect(listItems).toHaveLength(2)
  })

  test("should have todo delete action", () => {
     render(<TodoList initialTodos={[
      new Todo("todo 1"),
    ]}/>)
    const deleteBtn = screen.getByText("Delete")
    expect(deleteBtn).toBeInTheDocument()
    expect(deleteBtn).toBeVisible()
  })

  test("should delete todo", () => {
     render(<TodoList initialTodos={[
      new Todo("todo to be deleted")
    ]}/>)
    expect(screen.getByText("todo to be deleted")).toBeInTheDocument()
    const deleteBtn = screen.getByText("Delete")
    fireEvent.click(deleteBtn)
    expect(screen.queryByText("todo to be deleted")).not.toBeInTheDocument()
  })

  test("should have complete checkbox", () => {
    render(<TodoList initialTodos={[
      new Todo("todo 1")
    ]}/>)
    const completeCheckbox = screen.getByTestId("complete")
    expect(completeCheckbox).toBeInTheDocument()
    expect(completeCheckbox).toBeVisible()
  })

  test("should complete and reset a todo", () => {
    render(<TodoList initialTodos={[
      new Todo("todo 1")
    ]}/>)
    const completeCheckbox = screen.getByTestId("complete")
    fireEvent.click(completeCheckbox)
    expect(screen.getByText("todo 1")).toBeInTheDocument()
    expect(screen.getByTestId("completed-todo")).toBeInTheDocument()
    fireEvent.click(completeCheckbox)
    expect(screen.queryByTestId("completed-todo")).not.toBeInTheDocument()
  })
})