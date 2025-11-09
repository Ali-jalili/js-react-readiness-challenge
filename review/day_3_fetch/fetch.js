const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';
const outputConsole = document.getElementById('outputConsole');
const loadingStatus = document.getElementById('loadingStatus');
const startButton = document.getElementById('startButton');


const logOutput = (message, isError = false) => {
    const span = document.createElement('span');
    span.className = isError ? 'status-error' : 'status-success';
    const time = new Date().toLocaleTimeString('fa-IR');
    span.textContent = `[${time}] ${message}\n`;
    outputConsole.appendChild(span);
    outputConsole.scrollTop = outputConsole.scrollHeight;
};



const fetchDataAndLogTime = async function () {


    const startTime = performance.now();

    try {

        logOutput("شروع فراخوانی API...");
        loadingStatus.classList.remove('hidden');

        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error(`خطای HTTP: وضعیت ${res.status}`);
        }

        const data = await res.json()

        logOutput(`داده با موفقیت دریافت شد: ${data.title}`);
        logOutput(`عنوان داده: ${data.title}`);


    }
    catch (error) {

        console.error("خطای کامل: ", error);
        logOutput(`خطا در طول فرایند: ${error.message}`, true);
    }
    finally {

        const endTime = performance.now();
        const totalTime = (endTime - startTime).toFixed(2);

        logOutput(`زمان کلی اجرای عملیات: ${totalTime} میلی‌ثانیه.`);

        // 8. پنهان کردن وضعیت لودینگ
        loadingStatus.classList.add('hidden');

    }


}


startButton.addEventListener('click', () => {
    outputConsole.textContent = ''; // پاک کردن خروجی قبلی
    fetchDataAndLogTime();
});

logOutput("محیط تست آماده است. دکمهٔ 'شروع فراخوانی API' را فشار دهید.");
