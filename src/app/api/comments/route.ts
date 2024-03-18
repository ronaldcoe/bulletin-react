import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url)

    const threadId = url.searchParams.get("id")
    let id: bigint | number | undefined;

    if (threadId !== null) {
        try {
            id = BigInt(threadId); // Use BigInt if your database type is bigint
            // For numeric IDs, you could use: id = parseInt(threadId, 10);
        } catch (error) {
            console.error('Invalid thread ID format', error);
            return new Response(JSON.stringify({ message: 'Invalid thread ID format' }), {
                status: 400, // Bad Request
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }

    try {
        const comments = await prisma.comments.findMany({
            where: {
                discussion_thread_id: id
            },
            include: {
                users: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            },
            orderBy: [
                {
                    created_at: 'asc'
                }
            ]
        })
        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 

        return new Response(JSON.stringify(comments, replacer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error fetching comments', error)
        return new Response(JSON.stringify({ message: 'An error occurred while fetching comments' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export async function POST(request: Request) {
    const { content, user_id, thread_id } = await request.json();
    try {
        const now = new Date();
        const comment = await prisma.comments.create({
            data: {
                content,
                user_id: BigInt(user_id),
                discussion_thread_id: BigInt(thread_id),
                created_at: now,
                updated_at: now,
            }
        });
        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 
        return new Response(JSON.stringify(comment, replacer), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating comment', error);
        return new Response(JSON.stringify({ message: 'An error occurred while creating comment' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// Delete comment by ID
export async function DELETE(request: Request) {
    const url = new URL(request.url)
   
    const commentId = url.searchParams.get("id")

   
    if(commentId === null) {
        return new Response(JSON.stringify({ statusText: 'Invalid comment ID format' }), {
            status: 400, // Bad Request
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const comment = await prisma.comments.delete({
            where: {
                id:BigInt(commentId)
            }
        });
        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 
        return new Response(JSON.stringify(comment, replacer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting comment', error);
        return new Response(JSON.stringify({ message: 'An error occurred while deleting comment' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}