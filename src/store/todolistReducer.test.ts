import {addNewTodolistAC, removeToDoListAC, todolistDataType, todolistReducer} from "./todolistReducer";


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