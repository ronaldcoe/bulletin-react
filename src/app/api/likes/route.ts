import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { user_id, thread_id } = await request.json();
    try {
        const now = new Date();
        const like = await prisma.likes.create({
            data: {
                user_id: BigInt(user_id),
                discussion_thread_id:BigInt(thread_id),
                created_at: now,
                updated_at: now,

            }
        });
        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 
        return new Response(JSON.stringify(like, replacer), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating like', error);
        return new Response(JSON.stringify({ message: 'An error occurred while creating like' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    try {
        const like = await prisma.likes.delete({
            where: {
                id: id,
            }
        });
        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 
        return new Response(JSON.stringify(like, replacer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting like', error);
        return new Response(JSON.stringify({ message: 'An error occurred while deleting like' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}