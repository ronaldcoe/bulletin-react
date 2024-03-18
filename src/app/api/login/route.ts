import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Validate the user input
    if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Look up the user by email
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Compare the provided password with the stored hashed password
        let isPasswordValid
        if (user && user.password_digest) {
            isPasswordValid = bcrypt.compareSync(password, user.password_digest);
            // Proceed with authentication...
          } else {
            // Handle case where user is not found or password_digest is null
          }
          
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; // Convert BigInt to string

        // At this point, the user is authenticated
        // Here, you would typically generate a session or token, and send it back to the client
        return new Response(JSON.stringify({ user }, replacer), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // 'Set-Cookie': 'session
            },
        });

    } catch (error) {
        console.error('Login error', error);
        return new Response(JSON.stringify({ message: 'An error occurred while logging in' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
       
    }
}
