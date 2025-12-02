import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding orders...');

    // Get all items
    const items = await prisma.item.findMany();
    if (items.length === 0) {
        console.log('No items found. Run seed.ts first.');
        return;
    }

    // Get admin user (or any user)
    const user = await prisma.user.findFirst();
    if (!user) {
        console.log('No user found. Run seed.ts first.');
        return;
    }

    // Get or create address
    let address = await prisma.address.findFirst({ where: { userId: user.id } });
    if (!address) {
        address = await prisma.address.create({
            data: {
                userId: user.id,
                street: '123 Main St',
                city: 'Meerut',
                zip: '250001',
                // state: 'UP', // Check schema if state is required. Schema says: street, city, zip. No state?
                // Schema: street, city, zip.
            }
        });
        console.log('Created dummy address for user');
    }

    // Create 50 orders
    for (let i = 0; i < 50; i++) {
        // Pick 1-5 random items
        const numItems = Math.floor(Math.random() * 5) + 1;
        const orderItems = [];
        let total = 0;

        for (let j = 0; j < numItems; j++) {
            const item = items[Math.floor(Math.random() * items.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            orderItems.push({
                itemId: item.id,
                quantity,
                price: item.price,
                name: item.name
            });
            total += item.price * quantity;
        }

        // Create order
        await prisma.order.create({
            data: {
                userId: user.id,
                total,
                status: OrderStatus.DELIVERED,
                items: {
                    create: orderItems.map(oi => ({
                        itemId: oi.itemId,
                        quantity: oi.quantity,
                        price: oi.price,
                        name: oi.name
                    }))
                },
                addressId: address.id,
            }
        });
    }

    console.log('Orders seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
