//شبیه‌سازی API

export const MockProfileData = {
    name: "آرش سلیمانی",
    username: "@arash.s",
    bio: "توسعه‌دهنده جاوااسکریپت و عاشق معماری تمیز (Clean Architecture).",
    location: "تهران، ایران",
    registration_date: "2023-01-15"
};

const MockPostsData = [
    { id: 1, title: "شروع ماژولار", body: "یادگیری تفکیک مسئولیت‌ها در JS..." },
    { id: 2, title: " پایان ماژول", body: "اتمام مراحل یادگیری js.... " },
];


export const fetchProfileData = () => {

    return new Promise((resolve, reject) => {


        setTimeout(() => {

            resolve(MockProfileData)

        }, 1000)


    })


}



export const fetchPostsData = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve(MockPostsData)

        }, 1000)
    })

}