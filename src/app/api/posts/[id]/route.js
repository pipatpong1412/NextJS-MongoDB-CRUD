import { connectMondodb } from "../../../../../lib/mongodb";
import Post from '../../../../../models/post';
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        await connectMondodb();
        const post = await Post.findOne({ _id: id });
        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { title, img, content } = body;

        await connectMondodb();
        await Post.findByIdAndUpdate(id, { title, img, content });

        return NextResponse.json({ message: 'Post Updated' }, { status: 200 });
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
