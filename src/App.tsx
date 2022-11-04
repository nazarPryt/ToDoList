import React from 'react';

import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";


const App = React.memo(() => {


    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'login'} element={<Login/>}/>
            </Routes>
        </div>

);
})

export default App;
