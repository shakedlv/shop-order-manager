import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from '../../utils/api'
function Login() {
    const isAuthenticated = Boolean(localStorage.getItem("user_token"));
	const isAdmin = localStorage.getItem("user_isAdmin") === "true";


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
            if(isAdmin)
            {
                nav("/dashboard");
            }
            else
            {
                nav("/profile");

            }
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
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                            <input type="text" name="username" id="username" autoComplete="new-username" onChange={(e) => { setUsername(e.target.value) }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                autoComplete="new-password" onChange={(e) => { setPassword(e.target.value) }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
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
                            Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login