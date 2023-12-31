import React from 'react';
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai';
import {Link} from 'react-router-dom';

function Footer() {
    return (

        <footer className="bg-white mt-2 border-t w-[100dvw] h-[27dvh]">
            <div className="mx-auto w-full max-w-screen-xl p-4 px-8 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to={"/"} className="flex items-center">
                            <img src={"/logo192.png"} className="h-8 mr-3" alt="Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap ">FOODIFY</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">Resources</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link to={"/about"} className="hover:underline">About</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">Contact Us</h2>
                            <ul className="text-gray-500  font-medium">
                                <li className="mb-4">
                                    <a href="https://github.com/shakedlv" className="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/shaked-levy/" className="hover:underline">LinkedIn</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center ">© 2023 <a href="https://www.linkedin.com/in/shaked-levy/" className="hover:underline">Shaked Levy</a>
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
    
                        <a href="https://www.linkedin.com/in/shaked-levy/" target='_blank' rel="noreferrer" className="text-gray-500 hover:text-gray-900 ">
                            <AiFillLinkedin/>
                            <span className="sr-only">LinkedIn page</span>
                        </a>
                        <a href="https://github.com/shakedlv" target='_blank' rel="noreferrer" className="text-gray-500 hover:text-gray-900 ">
                            <AiFillGithub/>
                            <span className="sr-only">GitHub account</span>
                        </a>
 
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer