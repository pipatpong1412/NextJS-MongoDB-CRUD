import { connectMondodb } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, img, content } = await req.json()
        await connectMondodb()
        await Post.create({ title, img, content })
        return NextResponse.json({ message: 'Post created' }, { status: 201 })
    } catch (error) {
        console.log(error);
    }
}

export async function GET() {
    try {
        await connectMondodb()
        const posts = await Post.find({})
        return NextResponse.json({ posts })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get('id')
        await connectMondodb()
        await Post.findByIdAndDelete(id)
        return NextResponse({ message: 'Post Deleted' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}