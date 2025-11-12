import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginShopifyCustomer, getShopifyCustomer } from '@/lib/shopify/customer';

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

        try {
          // Login to Shopify and get access token
          const { accessToken, expiresAt } = await loginShopifyCustomer({
            email: credentials.email,
            password: credentials.password,
          });

          // Get customer data
          const customer = await getShopifyCustomer(accessToken);

          if (!customer) {
            throw new Error('Customer not found');
          }

          return {
            id: customer.id,
            email: customer.email,
            name: `${customer.firstName} ${customer.lastName}`.trim(),
            accessToken,
            expiresAt,
          };
        } catch (error: any) {
          console.error('Shopify auth error:', error);
          throw new Error(error.message || 'Invalid credentials');
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    error: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      // On sign in, add user data to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = (user as any).accessToken;
        token.expiresAt = (user as any).expiresAt;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).expiresAt = token.expiresAt;
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