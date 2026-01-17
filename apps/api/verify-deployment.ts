
import axios from 'axios';

const API_URL = 'https://skinluxe-meerut-api.onrender.com/api';
const ADMIN_EMAIL = 'admin@skinluxe.com';
const ADMIN_PASSWORD = 'adminpassword';

async function verifyDeployment() {
    console.log('🔍 Verifying SkinLuxe Admin API Deployment...');

    try {
        // 1. Login
        console.log(`\n1️⃣  Attempting Login as ${ADMIN_EMAIL}...`);
        const loginRes = await axios.post(`${API_URL}/admin/auth/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });

        console.log('✅ Login Successful!');
        // Extract token from cookie or response (depending on implementation)
        // The controller sets a cookie 'admin_token', but also usually returns user info.
        // We need the cookie for subsequent requests.
        const cookies = loginRes.headers['set-cookie'];
        if (!cookies) {
            console.log('⚠️  No cookies received. Auth might be cookie-only.');
        } else {
            console.log('🍪 Cookies received:', cookies.length);
        }

        const axiosConfig = {
            headers: {
                Cookie: cookies
            },
            validateStatus: () => true // Don't throw on error status
        };

        // 2. Check Settings (Should exist now)
        console.log('\n2️⃣  Checking /admin/settings...');
        const settingsRes = await axios.get(`${API_URL}/admin/settings`, axiosConfig);
        console.log(`Status: ${settingsRes.status}`);
        if (settingsRes.status === 200) {
            console.log('✅ Settings Data:', settingsRes.data);
        } else {
            console.log('❌ Error:', settingsRes.data);
        }

        // 3. Check Treatments (Should be empty list [], not 500)
        console.log('\n3️⃣  Checking /admin/treatments...');
        const treatmentsRes = await axios.get(`${API_URL}/admin/treatments`, axiosConfig);
        console.log(`Status: ${treatmentsRes.status}`);
        if (treatmentsRes.status === 200) {
            console.log('✅ Treatments Found:', treatmentsRes.data.length);
        } else {
            console.log('❌ Error:', treatmentsRes.data);
        }

    } catch (error: any) {
        console.error('❌ FATAL ERROR:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

verifyDeployment();
