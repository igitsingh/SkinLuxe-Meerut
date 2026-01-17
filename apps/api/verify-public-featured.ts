
import axios from 'axios';

const API_URL = 'https://skinluxe-meerut-api.onrender.com/api';

async function verifyFeatured() {
    try {
        const res = await axios.get(`${API_URL}/treatments`);
        const treatments = res.data;
        const featured = treatments.filter((t: any) => t.isFeatured);
        console.log(`Total: ${treatments.length}`);
        console.log(`Featured Count: ${featured.length}`);
        console.log(`Featured Items:`, featured.map((t: any) => ({ name: t.name, isFeatured: t.isFeatured })));
    } catch (e: any) {
        console.error(e.message);
    }
}
verifyFeatured();
