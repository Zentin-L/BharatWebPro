import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  
  providers: [
    CredentialsProvider({
      name: 'Phone/Email',
      credentials: {
        identifier: { label: 'Phone/Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier) {
          throw new Error('Phone or email is required');
        }

        // Check if identifier is phone or email
        const isPhone = /^\d{10}$/.test(credentials.identifier);
        
        const user = await prisma.user.findFirst({
          where: isPhone 
            ? { phone: credentials.identifier }
            : { email: credentials.identifier },
        });

        if (!user) {
          throw new Error('User not found');
        }

        // OTP-based authentication (for production, implement OTP verification)
        if (credentials.otp) {
          // TODO: Verify OTP from Redis/Database
          // For now, accept any 6-digit OTP
          if (credentials.otp.length === 6) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
            } as any;
          }
        }

        // Password-based authentication
        if (credentials.password && user.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          } as any;
        }

        throw new Error('Invalid credentials');
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
