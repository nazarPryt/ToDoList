import React, {useEffect} from 'react';

import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import {useAppDispatch} from "./store/hooks";
import {initializeAppTC} from "./auth/authReducer";


const App = React.memo(() => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    })

    return (
        <div>
            <header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1 style={{margin: 0}}>My To Do List Project :)</h1>
                <button>Log out</button>
            </header>
            <hr/>
            <hr/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'login'} element={<Login/>}/>
            </Routes>
        </div>

    );
})

export default App;
