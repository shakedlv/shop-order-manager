import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput } from 'flowbite-react';

import api from '../../utils/api'
import InputGroup from "../../components/UI/InputGroup";
function Login() {
    const isAuthenticated = Boolean(localStorage.getItem("user_token"));


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            username,
            password,
        };
        console.log(loginData)

        api
            .post("Login", loginData)
            .then((result) => {
                if (result.status === 200) {
                    localStorage.setItem("user_token", result.data['token']);
                    localStorage.setItem("user_id", result.data['id']);

                    localStorage.setItem("user_isAdmin", result.data['isAdmin']);
                    nav("/");

                } else {
                    localStorage.setItem("user_token", "");
                    setError("Password or Username are incorrect !");

                }
            })
            .catch((ex) => {
                localStorage.setItem("user_token", "");

                setError("Password or Username are incorrect !");
                console.error(ex);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            nav("/profile");
        }
    }, [isAuthenticated])

    return (
        <main className="bg-neutral-50 w-full h-screen  flex flex-col items-center md:justify-center gap-2">
            <div className="w-full bg-white mt-12  sm:max-w-md xl:p-0 p-3">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <p className="text-red-400">{error}</p>
                    <div className="space-y-4 md:space-y-6" action="#" autoComplete="off">
                        <InputGroup id={"username"} label={"Username"} type={"text"}
                            placeholder={"Enter Username"} onChangeEvent={(e) => { setUsername(e.target.value) }} />
                        <InputGroup id={"password"} label={"password"} type={"password"}
                            placeholder={"*************"} onChangeEvent={(e) => { setPassword(e.target.value) }} />




                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button onClick={(e) => handleLogin(e)}
                            className="w-full text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-gray-300 hover:border-gray-600 hover:bg-gray-300">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to={"/register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login