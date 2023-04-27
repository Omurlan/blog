import { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';

interface Payload {
  id: string | null | undefined;
  email: string | null | undefined;
  username: string | null | undefined;
  avatar: string | null | undefined;
}

declare module 'next-auth' {
  interface Session {
    user: Payload;
  }
  interface User extends Payload {}
}

declare module 'next-auth/jwt' {
  interface JWT extends Payload {}
}
