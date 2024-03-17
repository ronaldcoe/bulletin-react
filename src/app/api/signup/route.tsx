import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// create new account 


export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    // Validate the user input

    if (!name || !email || !password) {
        return new Response(JSON.stringify({ error: "All fields are required" }), {
            status: 400,
            statusText: "All fields are required",
            headers: { 'Content-Type': 'application/json' },
        });
    }

    

    try {
        // Look up the user by email
        const user = await prisma.users.findUnique({ where: { email } });
        console.log(user)
        if (user) {
            return new Response(JSON.stringify({ error: 'User already exists' }), {
                status: 409,
                statusText: "User already exists",
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password_digest: bcrypt.hashSync(password, 10),
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
        const replacer = (key: any, value: any) =>
        typeof value === 'bigint' ? value.toString() : value; // Convert BigInt to string

        return new Response(JSON.stringify({ user: newUser }, replacer), {
            status: 200,
            statusText: "Account created successfully",
            headers: { 'Content-Type': 'application/json' },
        });
        
    } catch (error) {
        console.error('Signup failed', error);
        return new Response(JSON.stringify({ message: 'An error occurred while signing up' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}