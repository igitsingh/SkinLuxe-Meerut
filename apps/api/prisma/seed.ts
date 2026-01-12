import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const treatments = [
    // SIGNATURE THERAPIES
    {
        name: 'Laser Hair Reduction',
        slug: 'laser-hair-reduction',
        description: 'Experience freedom from shaving and waxing. Our triple-wavelength diode laser offers painless, permanent reduction safe for all Indian skin types.',
        category: 'Signature',
        price: 'Starts at ₹2000',
        duration: '30-45 mins',
        isFeatured: true,
        icon: 'Zap'
    },
    {
        name: 'HydraFacial MD®',
        slug: 'hydrafacial',
        description: 'The original 3-step treatment: Cleanse, Extract, and Hydrate. Get glass-like skin with zero downtime. Perfect for events or monthly maintenance.',
        category: 'Signature',
        price: 'Starts at ₹5000',
        duration: '45 mins',
        isFeatured: true,
        icon: 'Droplets'
    },
    {
        name: 'Acne & Scar Defense',
        slug: 'acne-treatment',
        description: 'A medical protocol to control active acne and remodel deep scars using Chemical Peels, MNRF, and CO2 Laser technology.',
        category: 'Signature',
        price: 'Consultation Required',
        duration: '60 mins',
        isFeatured: true,
        icon: 'Shield'
    },
    // ANTI-AGING
    {
        name: 'Botox & Fillers',
        slug: 'botox-fillers',
        description: 'Wrinkle relaxation and volume restoration using US-FDA approved injectables.',
        category: 'Anti-Aging',
        price: 'Per Unit/Ml',
        duration: '30 mins',
        isFeatured: false
    },
    {
        name: 'HIFU Skin Tightening',
        slug: 'hifu-treatment',
        description: 'Non-surgical facelift using ultrasound energy to lift and tighten sagging skin.',
        category: 'Anti-Aging',
        price: 'Starts at ₹15000',
        duration: '60-90 mins',
        isFeatured: false
    },
    {
        name: 'Vampire Facial (PRP)',
        slug: 'prp-vampire-facial',
        description: 'Natural rejuvenation using your own growth factors to stimulate collagen and hair growth.',
        category: 'Anti-Aging',
        price: 'Starts at ₹4000',
        duration: '60 mins',
        isFeatured: false
    },
    {
        name: 'Skin Boosters',
        slug: 'skin-boosters',
        description: 'Deep hydration micro-injections for long-lasting glow and texture improvement.',
        category: 'Anti-Aging',
        price: 'Starts at ₹12000',
        duration: '45 mins',
        isFeatured: false
    },
    // GLOW & PIGMENTATION
    {
        name: 'Carbon Laser Peel',
        slug: 'carbon-laser-peel',
        description: 'Hollywood peel for instant brightening and pore reduction. Great before parties.',
        category: 'Glow',
        price: 'Starts at ₹3500',
        duration: '45 mins',
        isFeatured: false
    },
    {
        name: 'Q-Switch Laser Toning',
        slug: 'q-switch-laser',
        description: 'Targets melanin to treat pigmentation, uneven tone, and tattoo removal.',
        category: 'Glow',
        price: 'Starts at ₹3000',
        duration: '30 mins',
        isFeatured: false
    },
    {
        name: 'Chemical Peels',
        slug: 'chemical-peels',
        description: 'Exfoliation for acne, spots, and dullness using medical-grade acids (Glycolic, Salicylic).',
        category: 'Glow',
        price: 'Starts at ₹1500',
        duration: '30 mins',
        isFeatured: false
    },
    {
        name: 'Medi-Facials',
        slug: 'medi-facials',
        description: 'Customized clinical facials for deep hydration, brightening, and relaxation.',
        category: 'Glow',
        price: 'Starts at ₹2500',
        duration: '60 mins',
        isFeatured: false
    }
];

async function main() {
    console.log('Start seeding...');

    // Seed Treatments
    for (const t of treatments) {
        const treatment = await prisma.treatment.upsert({
            where: { slug: t.slug },
            update: t,
            create: t,
        });
        console.log(`Created treatment with id: ${treatment.id}`);
    }

    // Seed Admin User (if needed)
    // ...

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
