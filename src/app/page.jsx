'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from 'next/link'
import axios from "../../configs/axios";
import DeleteBtn from "./DeleteBtn";

export default function Home() {

  const [postData, setPostData] = useState([])

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts')

      if (res.status !== 200) {
        throw new Error('Failed to fecth posts')
      }
      setPostData(res.data.posts)

    } catch (error) {
      console.log('Error loading posts: ', error)
    }
  }

  // console.log(postData);

  useEffect(() => {
    getPosts()
  }, [])


  return (
    <main className="container mx-auto my-3">
      <h1>NextJS Crud + MongoDB</h1>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded"><Link href='/create'>Create Post</Link></button>
      <div className="grid grid-cols-4 mt-3 gap-5">
        {postData && postData.map(post => (
          <div key={post._id} className="shadow-xl my-10 p-10 rounded-xl">
            <h4>{post.title}</h4>
            <Image width={300} height={0} src={post.img} alt={post.name} />
            <p>{post.content}</p>
            <div className="mt-5">
              <Link className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg " href={`/edit/${post._id}`}>Edit</Link>
              <DeleteBtn id={post._id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
