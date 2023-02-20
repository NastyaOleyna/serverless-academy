let developersData = {}

function groupVacationsByUser() {
    return fetch('https://jsonbase.com/sls-team/vacations')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach(developer => {
                const userId = developer.user._id;
                const userName = developer.user.name;
                const { startDate, endDate } = developer;
                const vacation = { startDate, endDate };

                if (!developersData[userId]) {
                    developersData[userId] = {
                        userId,
                        userName,
                        vacations: [vacation]
                    }
                } else {
                    developersData[userId].vacations.push(vacation)
                }
            })
            return Object.values(developersData)
        })
}

(async function () {
    const data = await groupVacationsByUser();
    console.log(JSON.stringify(data, null, 4));
})()


