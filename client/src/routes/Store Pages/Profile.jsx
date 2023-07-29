import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Avatar } from 'flowbite-react';
import api from '../../utils/api';
import { HiCheck, HiExclamation } from 'react-icons/hi'
import { Toaster, toast } from 'react-hot-toast';
function Profile() {
  const isAdmin = localStorage.getItem("user_isAdmin") === "true";

  const nav = useNavigate();

  const HandleLogout = () => {
    localStorage.setItem("user_token", "");
    localStorage.setItem("user_isAdmin", "");
    nav("/")
  }
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    var userId = localStorage.getItem("user_id");

    api
      .get("/Users/" + userId)
      .then((result) => {
        if (result.status === 200) {
          setUser(result.data);
          setLoading(prev => false);

        } else {
          setLoading(prev => true);

        }
      })
      .catch((ex) => {
        setLoading(prev => true);

        console.error(ex);
      });

  }, [])
  const [newPassword, setNewPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")





  const HandleChangePassword = (e) => {
    e.preventDefault();

    var failed = false;


    api.get("Login?password=" + oldPassword).then((result) => {
      if (result.status === 200) {
        if (result.data === user['password']) {
          user['password'] = newPassword;
          api.put('Users', user).then((result) => {
            if (result.status !== 200) {
              failed = true;
            }

          }).catch((ex) => {
            failed = true;
          })
        }
        else {
          failed = true;
        }

      }
      else {
        failed = true;
      }
    }).catch((ex) => {
      failed = true;
    });

    if(failed)
    {
      notifyFaild();

    }
    else
    {
      notifySuccsess();
      HandleLogout();
    }


  }


  const notifySuccsess = () => {
    toast.custom(
      (t) => (
        <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:text-red-200">
          <HiCheck/>
          </div>
          <div className="ml-3 text-sm font-normal"> Password Updated Succsessfuly !</div>
          <button onClick={() => toast.dismiss(t.id)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      ),
      { id: "unique-notification", position: "bottom-right" }
    );
  }
  const notifyFaild = () => {
    toast.custom(
      (t) => (
        <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:text-red-200">
          <HiExclamation/>
          </div>
          <div className="ml-3 text-sm font-normal"> Failed to update password !</div>
          <button onClick={() => toast.dismiss(t.id)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      ),
      { id: "unique-notification", position: "bottom-right" }
    );
  }

  return (
    <main className="bg-neutral-50 w-full  pt-14 flex flex-col sm:flex-row items-center justify-around gap-2">

      {loading ? " loading" :
        <>
          <div className=' flex flex-col gap-2'>
            <Avatar img="" className='m-3 ' />

            <button onClick={() => HandleLogout()} className='px-3 py-1 border border-gray-400 rounded-md hover:bg-slate-700 hover:text-white hover:ease-in transition-all '>
              logout
            </button>
            {isAdmin ? <Link to={"/dashboard"} className='px-3 py-1 border border-gray-400 rounded-md hover:bg-slate-700 hover:text-white hover:ease-in transition-all '>
              Admin Dashboard
            </Link> : <></>}
          </div>
          <div>
            <form className="flex max-w-md flex-col gap-4 m-12">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="oldpsw"
                    value="Old Password"
                  />
                </div>
                <TextInput
                  onChange={(e) => setOldPassword(e.target.value)}

                  id="oldpsw"
                  placeholder="****************"
                  required
                  type="password"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="newpsw"
                    value="New Password"
                  />
                </div>
                <TextInput
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="newpsw"
                  placeholder="****************"
                  required
                  type="password"
                />

              </div>
              <button onClick={(e) => HandleChangePassword(e)} className='px-3 py-1 border border-gray-400 rounded-md hover:bg-slate-700 hover:text-white hover:ease-in transition-all '>
                Change Password
              </button>
            </form>
          </div>
        </>}
      <Toaster />
    </main>


  )
}

export default Profile