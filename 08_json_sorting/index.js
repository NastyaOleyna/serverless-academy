import data from './data.js';

async function assertiveRequest(url, countOfRequests = 3) {
    let counter = 0;
    let data;
    do {
        const response = await fetch(url);
        counter++;
        if (response.status === 200) {
            data = await response.json()
        };
    } while (!data && counter < 3);

    return data;
};

async function getData(links) {
    let counterTrue = 0;
    let counterFalse = 0;

   await Promise.all(links.map(async link => {
        const userData = await assertiveRequest(link);
        if (userData) {
            const match = JSON.stringify(userData).match(/\"isDone\":(\w+)/);
            const isDone = match ? match[1] : undefined;

            if (isDone === 'true') {
                counterTrue++
            }
            if (isDone === 'false') {
                counterFalse++
            }

            console.log(`[Success] ${link} isDone: ${isDone}`);
        } else {
            console.log(`[Fail] ${link} The endpoint is unavailable`);
        }
    }))
    console.log(`Found True values: ${counterTrue}`);
    console.log(`Found False values: ${counterFalse}`);
}

getData(data);


