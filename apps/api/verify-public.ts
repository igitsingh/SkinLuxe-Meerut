
import axios from 'axios';

const API_URL = 'https://skinluxe-meerut-api.onrender.com/api';

async function verifyPublicData() {
    console.log('🔍 Verifying Public Data on Render...');

    try {
        // 1. Check Public Treatments (No Auth Required usually)
        console.log('\n1️⃣  Checking Public /treatments...');
        // Note: Assuming /api/treatments is a public endpoint for the website
        try {
            const res = await axios.get(`${API_URL}/treatments`);
            console.log(`Status: ${res.status}`);
            console.log(`Count: ${Array.isArray(res.data) ? res.data.length : 'Not an array'}`);
        } catch (e: any) {
            console.log(`❌ Public Treatment fetch failed: ${e.message} (Might require auth or wrong endpoint)`);
        }

    } catch (error: any) {
        console.error('❌ General Error:', error.message);
    }
}

verifyPublicData();
