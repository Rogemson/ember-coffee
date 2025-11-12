import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    expiresAt?: string;
    cartId?: string | null; // Add this
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      accessToken?: string;
      expiresAt?: string;
      cartId?: string | null; // Add this
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken?: string;
    expiresAt?: string;
    cartId?: string | null; // Add this
  }
}