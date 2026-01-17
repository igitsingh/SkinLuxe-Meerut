
import axios from 'axios';

// Defaults to the production URL if not provided
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://skinluxe-meerut-api.onrender.com/api';

async function verify() {
    console.log(`🔍 POST-DEPLOY VERIFICATION: Checking ${API_URL}...`);

    try {
        // 1. Check Public Treatments Endpoint
        const tStart = Date.now();
        const res = await axios.get(`${API_URL}/treatments`);
        const duration = Date.now() - tStart;

        if (res.status !== 200) {
            throw new Error(`Endpoint returned status ${res.status}`);
        }

        const data = res.data;
        if (!Array.isArray(data)) {
            throw new Error("Response was not an array");
        }

        console.log(`✅ GET /treatments: OK (${duration}ms)`);
        console.log(`📊 Items Returned: ${data.length}`);

        // 2. Business Logic Verification
        if (data.length === 0) {
            console.error("❌ CRITICAL FAILURE: API is running but returned 0 treatments.");
            console.error("   The site will look empty to customers.");
            process.exit(1);
        }

        const featured = data.filter((t: any) => t.isFeatured);
        console.log(`✨ Featured Items: ${featured.length}`);

        if (featured.length === 0) {
            console.warn("⚠️  WARNING: No featured items found. Homepage 'Featured' section will be empty.");
        }

        console.log("✅ DEPLOYMENT VERIFIED: System is serving real data.");
        process.exit(0);

    } catch (error: any) {
        console.error(`❌ VERIFICATION FAILED: ${error.message}`);
        if (error.code === 'ECONNREFUSED') {
            console.error("   Could not connect to API. Is it running?");
        }
        process.exit(1);
    }
}

verify();
