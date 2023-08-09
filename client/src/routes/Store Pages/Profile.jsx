import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Avatar } from 'flowbite-react';
import api from '../../utils/api';
import { Toaster } from 'react-hot-toast';
import { notifyFaild, notifySuccsess } from '../../utils/notify';


/* TO-DO
    Display open orders 
 */

function Profile() {
  const isAdmin = localStorage.getItem("user_isAdmin") === "true";

  const nav = useNavigate();

  const HandleLogout = () => {
    localStorage.setItem("user_token", "");
    localStorage.setItem("user_isAdmin", "");
    localStorage.setItem('login_expires', "")
    localStorage.setItem("user_isAdmin", false);

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
      notifyFaild("Failed to update password !");

    }
    else
    {
      notifySuccsess("Password Updated Succsessfuly !");
      HandleLogout();
    }


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