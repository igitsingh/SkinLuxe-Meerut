const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const treatments = [
    { name: "Laser Hair Reduction", slug: "laser-hair-reduction", category: "Laser", price: 2999 },
    { name: "HydraFacial MD", slug: "hydrafacial-md", category: "Face", price: 3999 },
    { name: "Acne Treatment", slug: "acne-treatment", category: "Face", price: 1999 },
    { name: "Acne Scars & Spots", slug: "scars-acne-spots", category: "Laser", price: 5999 },
    { name: "Pigmentation & Melasma", slug: "pigmentation-melasma", category: "Laser", price: 3499 },
    { name: "Skin Lightening & Glutathione", slug: "skin-lightening", category: "Drips", price: 2999 },
    { name: "Glutathione IV Drip", slug: "glutathione-iv-drip", category: "Drips", price: 3500 },
    { name: "Anti-Aging Therapies", slug: "anti-aging", category: "Injectables", price: 15000 },
    { name: "MicroNeedling", slug: "microneedling", category: "Face", price: 3999 },
    { name: "Hair Loss Treatment", slug: "hair-loss", category: "Hair", price: 3000 },
    { name: "Party & Bridal Makeup", slug: "party-bride-makeup", category: "Makeup", price: 3500 },
    { name: "Permanent Makeup (PMU)", slug: "pmu-permanent-makeup", category: "Makeup", price: 8999 },
];

async function main() {
    console.log('Seeding Treatments...');
    for (const t of treatments) {
        await prisma.treatment.upsert({
            where: { slug: t.slug },
            update: {
                name: t.name,
                category: t.category,
                price: `Starting @ ₹${t.price}`
            },
            create: {
                name: t.name,
                slug: t.slug,
                description: `Premium ${t.name} treatment at SkinLuxe Meerut. Safe and effective protocols designed for your needs.`,
                shortDescription: `Best ${t.name} in Meerut.`,
                duration: "60 mins",
                downtime: "None",
                painLevel: "None",
                price: `Starting @ ₹${t.price}`,
                category: t.category,
                image: ""
            },
        });
        console.log(`Upserted: ${t.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
