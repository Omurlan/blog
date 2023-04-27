import NextAuth, { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@models';
import { IUser } from '@interface/user';

const { NEXTAUTH_SECRET } = process.env;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: (IUser & { password: string }) | null = await User.findOne({ email });

        if (!user) {
          throw new Error('Профиль не найден');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error('Неверный пароль');
        }

        return {
          id: String(user._id),
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.avatar = user.avatar;
        token.username = user.username;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.avatar = token.avatar;
        session.user.id = token.id;
        session.user.email = token.email;
      }

      return session;
    },
    async redirect({ url }) {
      if (url.includes('/signin')) return '/blogs';
      if (!url.includes('/')) return '/auth/signin';
      return url;
    },
  },
};

export default NextAuth(authOptions);
