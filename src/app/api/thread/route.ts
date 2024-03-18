import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const threadId = url.searchParams.get("id");

    let id: bigint | number | undefined;
    if (threadId !== null) {
        try {
            id = BigInt(threadId); 
        } catch (error) {
            console.error('Invalid thread ID format', error);
            return new Response(JSON.stringify({ message: 'Invalid thread ID format' }), {
                status: 400, // Bad Request
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
    try {
        const thread = await prisma.discussion_threads.findUnique({
            where: {
                id
            },
            include: {
                users:{
                    select:{
                        name: true
                    }
                },
                likes: {
                    select: {
                        user_id: true,
                        id:true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        created_at: true,
                        users: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        
        })
        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 

        return new Response(JSON.stringify(thread, replacer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error) {

        return new Response(JSON.stringify({ message: 'An error occurred while fetching thread' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}