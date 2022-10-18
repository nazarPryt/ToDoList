import {v1} from "uuid";

import {
    changeFilterTaskAC,
    changeTitleToDoAC,
    deleteTodoListAC,
    setToDoListsAC,
    todolistReducer
} from "./todolist-reducer";
import {ToDoListType} from "../api/todoListAPI";

let taskID_1: string
let taskID_2: string
let taskID_3: string
let initialState: toDoListsType[]

beforeEach(() => {
    taskID_1 = v1()
    taskID_2 = v1()
    taskID_3 = v1()

    initialState = [
        {id: taskID_1, title: "What to do", filter: 'all'},
        {id: taskID_2, title: "Something is done", filter: 'all'},
        {id: taskID_3, title: "Need to buy", filter: 'all'}
    ]
})

test('test to change filter task', () => {
    const endState = todolistReducer(initialState, changeFilterTaskAC(taskID_2, 'active'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('active')
    expect(endState[2].filter).toBe('all')
})

test('test to change title of to do list', () => {
    const endState = todolistReducer(initialState, changeTitleToDoAC(taskID_3, 'nazar'))

    expect(endState[0].title).toBe('What to do')
    expect(endState[1].title).toBe('Something is done')
    expect(endState[2].title).toBe('nazar')
});

test('test to delete todoList', () => {
    const endState = todolistReducer(initialState, deleteTodoListAC(taskID_3))

    expect(endState.length).toBe(2)
})

// test('test to add new TodoList', () => {
//     const newTodolistTitle = "nazar"
//     const endState = todolistReducer(initialState, addNewTodoListAC(newTodolistTitle))
//
//     expect(endState.length).toBe(4)
//     expect(endState[0].title).toBe('nazar')
// })
test('test to Set TodoLists', () => {
    const todo: ToDoListType[] = [{id: '1', title: 'bla', addedDate: 'e', order: 1},{id: '1', title: 'bla', addedDate: 'e', order: 1}]
    const endState = todolistReducer([], setToDoListsAC(todo))
    expect(endState.length).toBe(2)
})