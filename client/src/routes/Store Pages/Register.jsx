import React, { useEffect, useState } from 'react'
import InputGroup from '../../components/UI/InputGroup'
import { isValidPassword, isValidUsername, validEmail } from '../../utils/Regex'
import api from '../../utils/api'
import { Link, useNavigate } from 'react-router-dom'
import { Label, Select} from 'flowbite-react'
import {countryPhoneCodes} from '../../utils/CountryCodes'

function Register() {
    const isAuthenticated = Boolean(localStorage.getItem("user_token"));
    useEffect(() => {
        if (isAuthenticated) {
            nav("/profile");
        }
    },)


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("")
    const [phoneCode, setPhoneCode] = useState("")
    const [errors, setErrors] = useState([])
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


                }
            })
            .catch((ex) => {
                localStorage.setItem("user_token", "");
                localStorage.setItem('login_expires', "")
                localStorage.setItem("user_isAdmin", false);

                console.error(ex);
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setErrors([])
        var errorsList = []
        if (!validEmail.test(email)) {
            errorsList.push("Enter a valid email")

        }

        const [valid, error] = isValidPassword(password)

        if (!valid) {
            errorsList.push(error)
        }
        const [usernameValid, usernameError] = isValidUsername(username)
        if (!usernameValid) {
            errorsList.push(usernameError)
        }
        setErrors(errorsList)
        if (errorsList.length === 0) {
            const date = new Date();
            const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const formattedDate = utcDate.toJSON();
            var userData = {
                "id": 0,
                "username": username,
                "password": password,
                "email": email,
                "phoneNumber": phone,
                "phoneCountryCode":phoneCode,
                "firstname": fname,
                "lastname": lname,
                "birthdayDate": "2023-07-29T00:00:00",
                "isAdmin": false,
                "createdDate": formattedDate,
            }

            api.post("/Users",userData).then((result) => {
                handleLogin();
            }).catch((ex) => {
                console.log(ex)
            })
        }


    }
    return (
        <main className="bg-neutral-50 w-full min-h-[70dvh]  flex flex-col items-center md:justify-center gap-2">

            <div className="w-full bg-white mt-12  sm:max-w-md xl:p-0 p-3">
                {errors.length > 0 ? <div className='bg-red-100  border-2 text-red-800 border-red-500 rounded-xl  w-full min-h-[64px] p-2'>
                    Failed to create account :
                    <ul className='list-disc list-inside'>
                        {
                            errors.map((e, index) => {
                                return <li key={index}>{e}</li>
                            })
                        }

                    </ul>
                </div>
                    : <></>}
                <InputGroup id={"username"} label={"Username"} type={"text"}
                    placeholder={"Username"} onChangeEvent={(e) => { setUsername(e.target.value) }} />
                <InputGroup id={"email"} label={"Email"} type={"email"}
                    placeholder={"email@email.com"} onChangeEvent={(e) => { setEmail(e.target.value) }} />
                <InputGroup id={"password"} label={"Password"} type={"password"}
                    placeholder={"**********"} onChangeEvent={(e) => { setPassword(e.target.value) }} />
                <div className='flex flex-row justify-between gap-1'>
                    <InputGroup id={"fname"} label={"First Name"} type={"text"}
                        placeholder={"First Name"} onChangeEvent={(e) => { setFname(e.target.value) }} />
                    <InputGroup id={"lname"} label={"Lastname"} type={"text"}
                        placeholder={"Last Name"} onChangeEvent={(e) => { setLname(e.target.value) }} />
                </div>
                <div className='flex flex-row justify-between gap-1'>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="phonecode"
                                value="Phone Code"
                            />
                        </div>
                        <Select
                            onChange={(e) => { setPhoneCode(e.target.value) }}
                            id="phonecode"
                            required>
                            {countryPhoneCodes.map(c => {
                                return <option key={c['code']} value={c['dial_code']} >[{c['name']}]{c['dial_code']}</option>
                            })}

                        </Select>
                    </div>
                    <InputGroup id={"phone"} label={"Phone Number"} type={"text"}
                        placeholder={"0541230123"} onChangeEvent={(e) => { setPhone(e.target.value) }} />
                </div>
                <button onClick={(e) => handleRegister(e)}
                    className="w-full text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-gray-300 hover:border-gray-600 hover:bg-gray-300">Create Account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already a member <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                </p>
            </div>
        </main>

    )
}

export default Register