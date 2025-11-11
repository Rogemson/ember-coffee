import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcryptjs';

// Mock user database (in production, this would be a real database)
// For now, we'll store users in memory
const users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  cartId?: string;
}> = [];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // Find user
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error('No user found with this email');
        }

        // Check password
        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          cartId: user.cartId,
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    error: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On sign in, add user data to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.cartId = (user as any).cartId;
      }

      // Update token when session is updated
      if (trigger === 'update' && session) {
        token.cartId = session.cartId;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).cartId = token.cartId;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Helper function to create user (we'll use this for signup)
export async function createUser(email: string, password: string, name: string) {
  // Check if user exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
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
  return { id: user.id, email: user.email, name: user.name };
}

// Helper to update user's cartId
export async function updateUserCart(userId: string, cartId: string) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.cartId = cartId;
  }
}