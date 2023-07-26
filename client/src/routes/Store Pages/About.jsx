import React from 'react'
import { Accordion } from 'flowbite-react';

function About() {
  return (
    <main className="bg-neutral-50 w-full min-h-[70dvh] pt-16 flex flex-col items-center gap-2 ">

        <Accordion className='w-3/5'>
            <Accordion.Panel>
                <Accordion.Title>Overview</Accordion.Title>
                <Accordion.Content>
                Food market web application with a shop website and a admin order managments 
                User can login or use the site as guest and purchase food from the store,
                Admin can view orders and pickup time , add and change products.
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Client (front-end)</Accordion.Title>
                <Accordion.Content>
                <ol className='list-disc px-4'>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://reactjs.org/docs/getting-started.html">React</a> with  <a className='text-blue-400 hover:underline' href="https://redux.js.org/introduction/getting-started">Redux</a>
                    </li>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://tailwindcss.com/">Tailwind CSS</a> with  <a className='text-blue-400 hover:underline' href="https://flowbite.com/">Flowbite</a>
                    </li>
                </ol>
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Service & API (back-end)</Accordion.Title>
                <Accordion.Content>
                <ol className='list-disc px-4'>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/intro">.NET 6.0 </a>
                        </li>
                    <li> 
                        Used <a className='text-blue-400 hover:underline' href="https://github.com/swagger-api/swagger-ui">Swagger UI</a>
                    </li>
                </ol>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>

    </main>

  )
}

export default About