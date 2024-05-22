'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from '../../../configs/axios'

export default function CreatePostPage() {

    const [post, setPost] = useState({
        title: '',
        img: '',
        content: ''
    })

    const router = useRouter()

    const hdlChange = (e) => {
        setPost(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        if (!post.title || !post.img || !post.content) {
            alert('Please complete all inputs')
            return
        }

        try {
            const res = await axios.post("/api/posts", post)
            if (res.status !== 200) {
                router.push('/')
            } else {
                throw new Error('Failed to create a post')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container mx-auto py-10'>
            <h3 className='text-3xl font-bold'>Create Post</h3>
            <hr className='my-3' />
            <Link href='/' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go Back</Link>
            <form onSubmit={hdlSubmit}>
                <input onChange={hdlChange} value={post.title} name='title' type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='title' />
                <input onChange={hdlChange} value={post.img} name='img' type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='imgUrl' />
                <textarea onChange={hdlChange} value={post.content} name='content' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter Your Content'></textarea>
                <button type="submit" className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Create Post</button>
            </form>
        </div>
    )
}
