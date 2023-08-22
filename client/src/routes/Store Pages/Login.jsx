import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from '../../utils/api'
import { Label, TextInput } from "flowbite-react";


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

        api
            .post("Login", loginData)
            .then((result) => {
                if (result.status === 200) {
                    console.log(result.data)
                    localStorage.setItem("user_token", result.data['token']);
                    localStorage.setItem("user_id", result.data['id']);
                    
                    localStorage.setItem("user_picture", result.data['profilePicture']);

                    const today = new Date()
                    const tomorrow = new Date(today)
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    localStorage.setItem('login_expires', tomorrow.toDateString())


                    localStorage.setItem("user_isAdmin", result.data['isAdmin']);

                    nav("/");

                } else {
                    localStorage.setItem("user_token", "");
                    localStorage.setItem('login_expires', "")
                    localStorage.setItem("user_isAdmin", false);

                    setError("Password or Username are incorrect !");

                }
            })
            .catch((ex) => {
                localStorage.setItem("user_token", "");
                localStorage.setItem('login_expires', "")
                localStorage.setItem("user_isAdmin", false);

                setError("Password or Username are incorrect !");
                console.error(ex);
            });
    };

    useEffect(() => {

        if (new Date() >= new Date(localStorage.getItem("login_expires"))) {
            localStorage.setItem("user_token", "");
            localStorage.setItem('login_expires', "")
        }
        else if (isAuthenticated) {
            nav("/profile");
        }
    }, [])

    return (
        <main className="bg-neutral-50 w-full min-h-[70dvh]   flex flex-col items-center md:justify-center gap-2">
            <div className="w-full bg-white mt-12  sm:max-w-md xl:p-0 p-3">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <p className="text-red-400">{error}</p>
                    <div className="space-y-4 md:space-y-6" action="#" autoComplete="off">
                        <div className='mb-2'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor={'username'}
                                    value={"username"}
                                />
                            </div>
                            <TextInput
                                onChange={(e) => { setUsername(e.target.value) }}
                                id={'username'}
                                placeholder={"Username"}
                                type="text"
                                autoComplete="new-password"
                                value={username}
                            />
                        </div>
                        <div className='mb-2'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor={'password'}
                                    value={"Password"}
                                />
                            </div>
                            <TextInput
                                onChange={(e) => { setPassword(e.target.value) }}
                                id={'password'}
                                placeholder={"*********"}
                                type="password"
                                autoComplete="new-password"
                                value={password}
                            />
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