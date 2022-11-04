import React from 'react';
import s from './Login.module.css'

const Login = () => {


    return (
        <div className={s.Wrapper}>
            <div className={s.formWrap}>
                <h2>Login</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, laboriosam! Lorem ipsum dolor
                    sit amet, consectetur adipisicing elit. Eius eum eveniet excepturi harum in praesentium provident
                    quidem quo quos vel.</p>
                <form action="" className={s.form}>
                    <input type="email" placeholder={"Email"} className={s.input}/>
                    <input type="password" placeholder={"Password"} className={s.input}/>
                    <div className={s.buttonWrap}>
                        <span>
                            <label htmlFor="rebMe">Remember Me !!!</label>
                            <input type="checkbox" id='rebMe'/>
                        </span>
                        <button className={s.button}>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;