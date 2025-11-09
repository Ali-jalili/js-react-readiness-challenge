const fetchDataAndLogTime = async function () {

    const url = 'https://jsonplaceholder.typicode.com/posسسts/1';

    try {



        const res = await fetch(url);

        if (!res.ok) throw new Error('خطای شبکه')

        const data = await res.json();
        console.log(data);


    }
    catch (err) {

        console.error(err.massage)

    }




}

fetchDataAndLogTime()