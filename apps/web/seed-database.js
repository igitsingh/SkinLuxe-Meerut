const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');

    try {
        // 1. Create Admin User
        console.log('👤 Creating admin user...');
        const adminPasswordHash = await bcrypt.hash('adminpassword', 10);

        const admin = await prisma.adminUser.upsert({
            where: { email: 'admin@skinluxe-meerut.com' },
            update: {},
            create: {
                email: 'admin@skinluxe-meerut.com',
                password_hash: adminPasswordHash,
                full_name: 'Dr. Alka Yadav',
                role: 'admin',
                is_active: true,
            },
        });
        console.log('✅ Admin user created:', admin.email, '\n');

        // 2. Create Treatments
        console.log('💊 Creating treatments...');
        const treatments = [
            {
                name: 'Laser Hair Reduction',
                slug: 'laser-hair-reduction',
                category: 'Laser Treatments',
                description: 'Advanced laser technology for permanent hair reduction with minimal discomfort.',
                benefits: [
                    'Permanent hair reduction',
                    'Smooth, hair-free skin',
                    'No more ingrown hairs',
                    'Saves time and money',
                    'Suitable for all skin types',
                ],
                duration: 45,
                price: 5000,
                discount_price: 4500,
                image_url: '/treatments/laser-hair-reduction.jpg',
                is_active: true,
                is_featured: true,
            },
            {
                name: 'HydraFacial',
                slug: 'hydrafacial',
                category: 'Facial Treatments',
                description: 'Deep cleansing, exfoliation, and hydration treatment for glowing skin.',
                benefits: [
                    'Deep cleansing',
                    'Instant glow',
                    'Hydrated skin',
                    'Reduces fine lines',
                    'No downtime',
                ],
                duration: 60,
                price: 4000,
                discount_price: 3500,
                image_url: '/treatments/hydrafacial.jpg',
                is_active: true,
                is_featured: true,
            },
            {
                name: 'Acne Treatment',
                slug: 'acne-treatment',
                category: 'Skin Treatments',
                description: 'Comprehensive acne treatment to clear skin and prevent future breakouts.',
                benefits: [
                    'Clears active acne',
                    'Prevents breakouts',
                    'Reduces scarring',
                    'Improves skin texture',
                    'Boosts confidence',
                ],
                duration: 30,
                price: 3000,
                discount_price: null,
                image_url: '/treatments/acne-treatment.jpg',
                is_active: true,
                is_featured: false,
            },
            {
                name: 'Anti-Aging Treatment',
                slug: 'anti-aging',
                category: 'Anti-Aging',
                description: 'Advanced anti-aging treatments to reduce wrinkles and restore youthful skin.',
                benefits: [
                    'Reduces wrinkles',
                    'Firms skin',
                    'Improves elasticity',
                    'Natural-looking results',
                    'Long-lasting effects',
                ],
                duration: 90,
                price: 8000,
                discount_price: 7000,
                image_url: '/treatments/anti-aging.jpg',
                is_active: true,
                is_featured: true,
            },
            {
                name: 'Skin Brightening',
                slug: 'skin-brightening',
                category: 'Skin Treatments',
                description: 'Professional skin brightening treatment for even-toned, radiant skin.',
                benefits: [
                    'Brightens complexion',
                    'Evens skin tone',
                    'Reduces pigmentation',
                    'Glowing skin',
                    'Safe and effective',
                ],
                duration: 45,
                price: 4500,
                discount_price: null,
                image_url: '/treatments/skin-brightening.jpg',
                is_active: true,
                is_featured: false,
            },
            {
                name: 'Hair PRP Treatment',
                slug: 'hair-prp',
                category: 'Hair Treatments',
                description: 'Platelet-Rich Plasma therapy for hair regrowth and scalp health.',
                benefits: [
                    'Stimulates hair growth',
                    'Strengthens hair',
                    'Reduces hair fall',
                    'Natural treatment',
                    'No side effects',
                ],
                duration: 60,
                price: 6000,
                discount_price: 5500,
                image_url: '/treatments/hair-prp.jpg',
                is_active: true,
                is_featured: false,
            },
        ];

        for (const treatment of treatments) {
            const created = await prisma.treatment.upsert({
                where: { slug: treatment.slug },
                update: {},
                create: treatment,
            });
            console.log(`✅ Created treatment: ${created.name}`);
        }
        console.log('\n');

        // 3. Create Sample Patients
        console.log('👥 Creating sample patients...');
        const patients = [
            {
                email: 'priya.sharma@email.com',
                password: 'password123',
                full_name: 'Priya Sharma',
                phone: '+91 98765 43210',
                date_of_birth: new Date('1995-06-15'),
                gender: 'Female',
                address: 'Shastri Nagar, Meerut',
            },
            {
                email: 'rahul.verma@email.com',
                password: 'password123',
                full_name: 'Rahul Verma',
                phone: '+91 98765 43211',
                date_of_birth: new Date('1990-03-22'),
                gender: 'Male',
                address: 'Civil Lines, Meerut',
            },
            {
                email: 'anjali.singh@email.com',
                password: 'password123',
                full_name: 'Anjali Singh',
                phone: '+91 98765 43212',
                date_of_birth: new Date('1998-11-08'),
                gender: 'Female',
                address: 'Kanker Khera, Meerut',
            },
        ];

        const createdPatients = [];
        for (const patient of patients) {
            const passwordHash = await bcrypt.hash(patient.password, 10);
            const created = await prisma.patient.upsert({
                where: { email: patient.email },
                update: {},
                create: {
                    email: patient.email,
                    password_hash: passwordHash,
                    full_name: patient.full_name,
                    phone: patient.phone,
                    date_of_birth: patient.date_of_birth,
                    gender: patient.gender,
                    address: patient.address,
                },
            });
            createdPatients.push(created);
            console.log(`✅ Created patient: ${created.full_name}`);
        }
        console.log('\n');

        // 4. Create Sample Appointments
        console.log('📅 Creating sample appointments...');
        const allTreatments = await prisma.treatment.findMany();

        const appointments = [
            {
                patient_id: createdPatients[0].id,
                treatment_id: allTreatments[1].id, // HydraFacial
                appointment_date: new Date('2024-12-15'),
                appointment_time: '2:00 PM',
                status: 'confirmed',
                duration: 60,
                patient_notes: 'First time trying HydraFacial',
            },
            {
                patient_id: createdPatients[0].id,
                treatment_id: allTreatments[0].id, // Laser Hair Reduction
                appointment_date: new Date('2024-12-22'),
                appointment_time: '11:00 AM',
                status: 'confirmed',
                duration: 45,
                patient_notes: 'Session 3 of laser treatment',
            },
            {
                patient_id: createdPatients[1].id,
                treatment_id: allTreatments[5].id, // Hair PRP
                appointment_date: new Date('2024-12-18'),
                appointment_time: '3:00 PM',
                status: 'pending',
                duration: 60,
            },
            {
                patient_id: createdPatients[2].id,
                treatment_id: allTreatments[2].id, // Acne Treatment
                appointment_date: new Date('2024-12-20'),
                appointment_time: '10:00 AM',
                status: 'confirmed',
                duration: 30,
            },
        ];

        for (const appointment of appointments) {
            const created = await prisma.appointment.create({
                data: appointment,
                include: {
                    patient: true,
                    treatment: true,
                },
            });
            console.log(`✅ Created appointment: ${created.patient.full_name} - ${created.treatment.name}`);
        }
        console.log('\n');

        // 5. Create Settings
        console.log('⚙️  Creating site settings...');
        const settings = [
            { key: 'site_name', value: 'SkinLuxe Aesthetics & Academy' },
            { key: 'site_tagline', value: 'Your Journey to Radiant Skin' },
            { key: 'contact_email', value: 'info@skinluxe-meerut.com' },
            { key: 'contact_phone', value: '+91 121 XXX XXXX' },
            { key: 'address', value: 'Meerut, Uttar Pradesh, India' },
            { key: 'working_hours', value: 'Mon-Sat: 10:00 AM - 7:00 PM' },
            { key: 'booking_enabled', value: 'true' },
        ];

        for (const setting of settings) {
            await prisma.settings.upsert({
                where: { key: setting.key },
                update: { value: setting.value },
                create: setting,
            });
            console.log(`✅ Created setting: ${setting.key}`);
        }
        console.log('\n');

        console.log('🎉 Database seeding completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   - 1 Admin user`);
        console.log(`   - ${treatments.length} Treatments`);
        console.log(`   - ${patients.length} Patients`);
        console.log(`   - ${appointments.length} Appointments`);
        console.log(`   - ${settings.length} Settings\n`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
