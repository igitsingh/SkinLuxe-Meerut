
import axios from 'axios';

const TARGET_URL = 'https://skinluxe-meerut-web-og.vercel.app/treatments/laser-hair-reduction';

async function checkPage() {
    try {
        console.log(`Checking ${TARGET_URL}...`);
        const res = await axios.get(TARGET_URL);
        console.log(`Status: ${res.status}`);
        if (res.data.includes('Laser Hair Reduction')) {
            console.log('✅ Content Verification: FOUND "Laser Hair Reduction" in HTML.');
        } else {
            console.log('⚠️  Content Verification: Text NOT found in HTML (might be CSR or error page).');
        }
    } catch (e: any) {
        console.error(`❌ Check Failed: ${e.message}`);
        if (e.response) console.error(`Status: ${e.response.status}`);
    }
}
checkPage();
