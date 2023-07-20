import React from 'react'

function Favourites() {
  return (
    <div className='container flex justify-center items-center w-full h-full p-2'>
<div class=" grid grid-rows-2 grid-flow-col gap-4 w-full">
  <div class="bg-blue-200 row-span-2  col-span-2 rounded-lg">01</div>
  <div class="bg-green-100 col-span-1 rounded-lg h-52">02</div>
  <div class="bg-pink-100  col-span-1 rounded-lg h-52">03</div>
</div>
    </div>

  )
}

export default Favourites