import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'flowbite-react';

/* TO - DO 
Handle Category Icon 
*/
function CategoryTab({ category }) {
    return (
        <Card
        className='w-[192px] min-h-[64px]'
            imgAlt={category['displayName']}
            imgSrc={category['icon']}
        >
            <Link to={"/products/" + category['displayName']}>
                <h5 className="text-xl text-center capitalize  font-semibold tracking-tight text-gray-900 dark:text-white">
                    <p>
                        {category['displayName']}
                    </p>
                </h5>
            </Link>
        </Card>
    )
}

export default CategoryTab

