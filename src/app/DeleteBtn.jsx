'use client'

import axios from 'axios'
import React from 'react'

export default function DeleteBtn({ id }) {

    const hdlDelete = async () => {
        const confirmed = confirm('Are you syre?')
        if (confirmed) {
            const res = await axios.delete(`http://localhost:3000/api/posts?id=${id}`)
            if (res.status === 200) {
                window.location.reload()
            }
        }
    }
    return (
        <a onClick={hdlDelete} className="bg-red-500 text-white border py-2 px-3 rounded-md text-lg hover:cursor-pointer">
            Delete
        </a>
    )
}
