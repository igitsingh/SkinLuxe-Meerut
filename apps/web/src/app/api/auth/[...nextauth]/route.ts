import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

// This will be replaced with actual Prisma client once schema is migrated
// For now, using a mock user for development
const mockUser = {
    id: '1',
    email: 'admin@zevaraz.com',
    password: '$2a$10$YourHashedPasswordHere', // bcrypt hash of 'admin123'
    name: 'Admin User',
    role: 'SUPER_ADMIN',
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required');
                }

                // TODO: Replace with actual Prisma query
                // const user = await prisma.user.findUnique({
                //   where: { email: credentials.email }
                // });

                // For development, using mock user
                const user = credentials.email === mockUser.email ? mockUser : null;

                if (!user) {
                    throw new Error('Invalid credentials');
                }

                // TODO: Uncomment when using real database
                // const isPasswordValid = await compare(credentials.password, user.password);
                // if (!isPasswordValid) {
                //   throw new Error('Invalid credentials');
                // }

                // For development, accept any password
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/admin/login',
        error: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || 'your-development-secret-key',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
