
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './src/utils/auth';

const prisma = new PrismaClient();

async function main() {
    const email = 'ay@skinluxe.com';
    const name = 'Miss. Alka Yadav';
    const password = await hashPassword('alkayadav');

    console.log('Seeding admin user...');

    // Debug: List existing users
    const users = await prisma.user.findMany({ select: { email: true, role: true } });
    console.log('Existing users:', users);

    // Upsert user
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password,
            name,
            role: 'ADMIN',
        },
        create: {
            email,
            name,
            password,
            role: 'ADMIN',
        },
    });

    console.log(`User seeded successfully: ${user.email} (${user.name})`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
