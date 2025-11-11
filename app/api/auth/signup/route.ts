import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

// In-memory user store (same as auth route)
// In production, use a real database
const users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  cartId?: string;
}> = [];

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      cartId: undefined,
    };

    users.push(user);

    return NextResponse.json(
      { 
        success: true,
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name 
        } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}