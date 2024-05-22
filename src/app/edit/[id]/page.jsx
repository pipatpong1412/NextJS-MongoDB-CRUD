'use client'

import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from "../../../../configs/axios";

export default function EditPostPage({ params }) {
    const { id } = params

    const [postData, setPostData] = useState('')
    const [post, setPost] = useState({
        title: '',
        img: '',
        content: ''
    })

    const hdlChange = (e) => {
        setPost(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const router = useRouter()

    const getPostById = async (id) => {
        try {
            const res = await axios.get(`/api/posts/${id}`)

            if (res.status !== 200) {
                throw new Error('Failed to fecth data')
            }
            setPostData(res.data.post)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPostById(id)
    }, [id])

    const hdlSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.put(`/api/posts/${id}`, post)

            if (res.status !== 200) {
                throw new Error('Failed to fecth data')
            }
        } catch (error) {
            console.log(error)
        }
        router.push('/')
    }

    return (
        <div className='container mx-auto py-10'>
            <h3 className='text-3xl font-bold'>Edit Post</h3>
            <hr className='my-3' />
            <Link href='/' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go Back</Link>
            <form onSubmit={hdlSubmit}>
                <input onChange={hdlChange} value={post.title} name='title' type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.title} />
                <input onChange={hdlChange} value={post.img} name='img' type="text" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.img} />
                <textarea onChange={hdlChange} value={post.content} name='content' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder={postData.content}></textarea>
                <button type="submit" className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Edit Post</button>
            </form>
        </div>
    )
}
