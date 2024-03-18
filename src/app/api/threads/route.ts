import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const threads = await prisma.discussion_threads.findMany({
            include: {
                users:{
                    select:{
                        name: true
                    
                    }
                },
                likes: {
                    select: {
                        user_id: true,

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
            },
            orderBy: [
                {
                    created_at: 'desc',
                },
            ],
        });

        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 

        return new Response(JSON.stringify(threads, replacer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching threads', error);
        return new Response(JSON.stringify({ message: 'An error occurred while fetching threads' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request: Request) {
    const { title, content, user_id, locked } = await request.json();
    try {
        const now = new Date();
        const thread = await prisma.discussion_threads.create({
            data: {
                title: title,
                content: content,
                user_id: user_id,
                locked: locked,
                created_at: now, // Manually set the current timestamp
                updated_at: now, // Manually set the current timestamp
            },
        });

        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; 

        return new Response(JSON.stringify(thread, replacer), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating thread', error);
        return new Response(JSON.stringify({ message: 'An error occurred while creating thread' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

