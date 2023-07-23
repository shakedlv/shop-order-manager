import React from 'react'

function About() {
  return (
    <main className="bg-neutral-50 w-full min-h-screen pt-16 flex flex-col items-center gap-2 ">
        <p className='container border border-gray-300 rounded-md p-3'>
            <h3 className='text-lg font-bold underline underline-offset-2'>Overview</h3>
            <span className=''>
                Food market web application with a shop website and a admin order managments 
                User can login or use the site as guest and purchase food from the store,
                Admin can view orders and pickup time , add and change products.
            </span>
        </p>
        <p className='container border border-gray-300 rounded-md p-3'>
            <h3 className='text-lg font-bold underline underline-offset-2'>Client (front-end)</h3>
            <span className=''>
                <ol className='list-disc px-4'>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://reactjs.org/docs/getting-started.html">React</a> with  <a className='text-blue-400 hover:underline' href="https://redux.js.org/introduction/getting-started">Redux</a>
                    </li>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://tailwindcss.com/">Tailwind CSS</a> with  <a className='text-blue-400 hover:underline' href="https://flowbite.com/">Flowbite</a>
                    </li>
                </ol>
            </span>
        </p>
        <p className='container border border-gray-300 rounded-md p-3'>
            <h3 className='text-lg font-bold underline underline-offset-2'>Service (back-end)</h3>
            <span className=''>
                <ol className='list-disc px-4'>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro">.NET 6.0 </a>
                        </li>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://github.com/swagger-api/swagger-ui">Swagger UI</a>
                    </li>
                </ol>
            </span>
        </p>
    </main>

  )
}

export default About