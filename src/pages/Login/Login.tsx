import React from 'react';
import s from './Login.module.css'
import * as Yup from 'yup';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Navigate} from "react-router-dom";
import {loginTC} from "../../auth/authReducer";
import LinearProgress from "@mui/material/LinearProgress";
import {CustomizedSnackbars} from "../../components/ErrorSnackBar/ErrorSnackBar";

const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(3, 'Must be min 3 characters or more')
                .required('Required'),
        }),
        onSubmit: value => {
            dispatch(loginTC(value))
            formik.resetForm()
        }
    })
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={s.Wrapper}>
            <div className={s.formWrap}>
                <h2>Login</h2>
                {status === "loading" && <LinearProgress/>}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, laboriosam! Lorem ipsum dolor
                    sit amet, consectetur adipisicing elit. Eius eum eveniet excepturi harum in praesentium provident
                    quidem quo quos vel.</p>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <input type="email" placeholder={"Email"} className={s.input} {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                    <input type="password" placeholder={"Password"}
                           className={s.input} {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                    <div className={s.buttonWrap}>
                        <span>
                            <label htmlFor="rebMe">Remember Me !!!</label>
                            <input type="checkbox" id='rebMe' {...formik.getFieldProps('rememberMe')}/>
                        </span>
                        <button className={s.button} type="submit">Log in</button>
                    </div>
                </form>
            </div>
            <CustomizedSnackbars/>
        </div>
    );
};

export default Login;