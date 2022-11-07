import React, {useEffect} from 'react';

import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {CircularProgress} from "@mui/material";
import {initializeAppTC} from "./components/Todolist/app-reducer";


const App = React.memo(() => {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)


    useEffect(() => {
        dispatch(initializeAppTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div>
            <header style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px"}}>
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
