import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Update HydraFacial Price
    await prisma.treatment.update({
        where: { slug: 'hydrafacial' },
        data: { price: 'Starts at ₹3,999' }
    });
    console.log("Updated HydraFacial Price to ₹3,999");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
