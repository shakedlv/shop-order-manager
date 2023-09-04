import React from 'react'

function Favorites() {
  return (
    <div className='container flex justify-center items-center w-full h-full p-2'>
      <div className=" grid grid-rows-2 grid-flow-col gap-4 w-full">
        <div className="row-span-2  col-span-2 rounded-lg bg-no-repeat bg-cover bg-catering"></div>
        <div className="bg-green-100 col-span-1 rounded-lg h-52 bg-no-repeat bg-cover bg-basket"></div>
        <div className="bg-pink-100  col-span-1 rounded-lg h-52 bg-no-repeat bg-cover bg-morning"></div>
      </div>
    </div>

  )
}

export default Favorites