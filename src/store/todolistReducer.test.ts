import {
    addNewTodolistAC, changeTodolistFilterAC,
    changeToDoListTitleAC,
    removeToDoListAC,
    todolistDataType,
    todolistReducer
} from "./todolistReducer";


let startState: todolistDataType[]

beforeEach(()=>{
    startState = [
        {id: '1', title: "What to do", filter: 'all'},
        {id: '2', title: "Something is done", filter: 'all'},
        {id: '3', title: "Need to buy", filter: 'all'}
    ]
})

test('test REMOVE-TO-DO-LIST',()=>{
    const action = removeToDoListAC('2')
    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState).not.toStrictEqual(startState)
    expect(endState[0]).not.toBe(startState[0])
})

test('test ADD-NEW-TODOLIST', ()=>{
    const action = addNewTodolistAC('nazar')
    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe('nazar')

})

test('test CHANGE-TODOLIST-TITLE', () => {
    const action = changeToDoListTitleAC('1', 'nazar')
    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe('nazar')
    expect(endState[1].title).toBe('Something is done')
    expect(endState[2].title).toBe('Need to buy')
})

test('test to CHANGE-TODOLIST-FILTER', () => {
    const action = changeTodolistFilterAC('1', 'completed')
    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe('completed')
    expect(endState[1].filter).toBe('all')
    expect(endState[2].filter).toBe('all')
})