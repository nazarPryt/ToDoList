import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksDataType,
    tasksReducer
} from "./tasksReducer";


let startState: tasksDataType = {}

beforeEach(() => {
    startState = {
        ['first']:
            [
                {id: '1', isDone: true, subject: "HTML&CSS"},
                {id: '2', isDone: true, subject: "JS"},
                {id: '3', isDone: false, subject: "React"},
                {id: '4', isDone: false, subject: "Redux"}
            ],
        ['second']:
            [
                {id: '1', isDone: true, subject: "Clean my house"},
                {id: '2', isDone: true, subject: "Have a rest"}
            ],
        ['third']:
            [
                {id: '1', isDone: true, subject: "Butter"},
                {id: '2', isDone: true, subject: "Milk"}
            ]
    }
})

test('test to CHANGE-TASK-STATUS', () => {
    const action = changeTaskStatusAC('first', '1')
    const endState = tasksReducer(startState, action)

    expect(endState['first'][0].isDone).toBeFalsy()
    expect(endState['second'][0].isDone).toBeTruthy()
    expect(endState['third'][0].isDone).toBeTruthy()
})

test('test to CHANGE-TASK-TITLE', () => {
    const action = changeTaskTitleAC('third', '1', 'nazar')
    const endState = tasksReducer(startState, action)

    expect(endState['third'][0].subject).toBe('nazar')
    expect(endState['third'][1].subject).toBe('Milk')
})

test('test to REMOVE-TASK', () => {
    const action = removeTaskAC('first', '1')
    const endState = tasksReducer(startState, action)

    expect(endState['first'].length).toBe(3)
    expect(endState['first'][0].id).toBe('2')
})

test('test to ADD-NEW-TASK', () => {
    const action = addNewTaskAC('third', 'nazar')
    const endState = tasksReducer(startState, action)

    expect(endState['third'].length).toBe(3)
    expect(endState['third'][0].subject).toBe('nazar')
    //adding NEW-TASK in the beginning of Array
})

// test('test to CHANGE-TASK-FILTER', () => {
//     const actionForCompleted = changeTaskFilterAC('first', "completed")
//     const endStateForCompleted = tasksReducer(startState, actionForCompleted)
//     expect(endStateForCompleted[actionForCompleted.todolistID].length).toBe(2)
//     expect(endStateForCompleted[actionForCompleted.todolistID][0].isDone).toBeTruthy()
//     expect(endStateForCompleted[actionForCompleted.todolistID][1].isDone).toBeTruthy()
//
//     const actionForActive = changeTaskFilterAC('first', "active")
//     const endStateForActive = tasksReducer(startState, actionForActive)
//     expect(endStateForActive[actionForActive.todolistID].length).toBe(2)
//     expect(endStateForActive[actionForActive.todolistID][0].isDone).toBeFalsy()
//     expect(endStateForActive[actionForActive.todolistID][1].isDone).toBeFalsy()
//
//     const actionForAll = changeTaskFilterAC('first', "all")
//     const endStateForAll = tasksReducer(startState, actionForAll)
//     expect(endStateForAll[actionForAll.todolistID].length).toBe(4)
//     expect(endStateForAll[actionForAll.todolistID][0].isDone).toBeTruthy()
//     expect(endStateForAll[actionForAll.todolistID][1].isDone).toBeTruthy()
//     expect(endStateForAll[actionForAll.todolistID][2].isDone).toBeFalsy()
//     expect(endStateForAll[actionForAll.todolistID][3].isDone).toBeFalsy()
// })

