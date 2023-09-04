import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Label, TextInput, Avatar, Table } from 'flowbite-react';
import api from '../../utils/api';
import { Toaster } from 'react-hot-toast';
import { notifyFailed, notifySuccess } from '../../utils/notify';
import { HiCheck, HiX } from 'react-icons/hi';
import { Logout } from '../../utils/auth';


/* TO-DO
    Show order items
 */

function Profile() {
  const isAdmin = localStorage.getItem("user_isAdmin") === "true";

  const nav = useNavigate();

  const HandleLogout = () => {
    Logout();

    nav("/")
  }
  const [user, setUser] = useState({})
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    var userId = localStorage.getItem("user_id");
    api
      .get("/Users/" + userId)
      .then((result) => {
        if (result.status === 200) {
          setUser(result.data);
          api.get("Orders/User/" + userId).then(res => {
              setOrders(res.data);
              setLoading(prev => false);
            }).catch(err => {
              setLoading(prev => true);
            })
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

    if (failed) {
      notifyFailed("Failed to update password !");

    }
    else {
      notifySuccess("Password Updated Succsessfuly !");
      HandleLogout();
    }


  }




  return (
    <main className="bg-neutral-50 w-full min-h-[70dvh] pt-14 flex flex-col sm:flex-col items-center justify-around gap-2">

      {loading ? " loading" :
        <div className='flex flex-row items-center justify-around w-full'>
          <div className=' flex flex-col gap-2'>
            <Avatar img={localStorage.getItem("user_picture")} alt='Profile Avatar' className='m-3 ' />
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

        </div>}
      <div className='container border-t border-t-gray-300 p-3'>
        <h3 className='text-2xl font-bold'>My Orderers</h3>
        <div>
          <Table>
            <Table.Head>
              <Table.HeadCell>
                #
              </Table.HeadCell>
              <Table.HeadCell>
                Order Date
              </Table.HeadCell>
              <Table.HeadCell>
                Pickup Branch
              </Table.HeadCell>
              <Table.HeadCell>
                Pickup Date
              </Table.HeadCell>
              <Table.HeadCell>
                Amount
              </Table.HeadCell>
              <Table.HeadCell>
                Is Paid
              </Table.HeadCell>
              <Table.HeadCell>
                Status
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {orders.map((o) => {
                var pickUpDate = new Date(o['pickUpDate']);
                var createdDate = new Date(o['createdDate']);

                return <Table.Row key={o['id']} className='hover:bg-slate-300 hover:cursor-pointer'>
                  <Table.Cell>
                    {o['id']}
                  </Table.Cell>
                  <Table.Cell>
                  {createdDate.toDateString()}
                  </Table.Cell>
                  <Table.Cell >
                    {o['branch']['displayName']}<br/> 
                    <span className='text-gray-400 text-sm'>
                    {o['branch']['address']}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {pickUpDate.toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {o['orderItems'].length}
                  </Table.Cell>
                  <Table.Cell>
                    {o['isPaid']? <HiCheck/> : <HiX/>}
                  </Table.Cell>
                  <Table.Cell>
                    {o['status']}
                  </Table.Cell>
                </Table.Row>
              })}
            </Table.Body>
          </Table>

        </div>
      </div>
      <Toaster />
    </main>


  )
}

export default Profile