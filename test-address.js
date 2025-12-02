async function test() {
    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@thepizzabox.com',
                password: 'adminpassword'
            })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Logged in. Token obtained.');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // 2. Test Short Street
        console.log('\nTesting Short Street (1, A)...');
        const shortRes = await fetch('http://localhost:5001/api/users/addresses', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                street: '1, A',
                city: 'Meerut',
                zip: '250001'
            })
        });

        if (shortRes.ok) {
            console.log('SUCCESS (Unexpected)');
        } else {
            const err = await shortRes.json();
            console.log('FAILED (Expected):', JSON.stringify(err));
        }

        // 3. Test Valid Street
        console.log('\nTesting Valid Street (101, MyBuilding)...');
        const validRes = await fetch('http://localhost:5001/api/users/addresses', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                street: '101, MyBuilding',
                city: 'Meerut',
                zip: '250001'
            })
        });

        if (validRes.ok) {
            const data = await validRes.json();
            console.log('SUCCESS:', JSON.stringify(data));
        } else {
            const err = await validRes.json();
            console.log('FAILED (Unexpected):', JSON.stringify(err));
        }

    } catch (e) {
        console.error('Test failed:', e.message);
    }
}

test();
