import { validateStepSync, validateStepAsync } from "./validation.js";

// -----------------------------------------------------------
// ۱. المان‌های اصلی فرم و مراحل
// -----------------------------------------------------------
const form = document.getElementById('multi-step-form');
const formSteps = document.querySelectorAll('.form-step'); // همه Divهای مرحله
const stepIndicators = document.querySelectorAll('.step-indicator .step'); // نشانگرهای مرحله بالا

// -----------------------------------------------------------
// ۲. دکمه‌های ناوبری
// -----------------------------------------------------------
const prevBtn = document.getElementById('prev-btn'); // دکمه "قبلی"
const nextBtn = document.getElementById('next-btn'); // دکمه "بعدی"
const submitBtn = document.getElementById('submit-btn'); // دکمه "ارسال نهایی"

// -----------------------------------------------------------
// ۳. فیلدهای ورودی (Inputs) برای State و Validation
// -----------------------------------------------------------
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// -----------------------------------------------------------
// ۴. المان‌های نمایش خطا و خلاصه
// -----------------------------------------------------------
// یک NodeList از تمام تگ‌های <small class="error-message"> را می‌گیریم
const errorMessages = document.querySelectorAll('.error-message');
const summaryDiv = document.getElementById('summary');




//قلب تپنده پروژه
//تعریف State مرکزی است  

const appState = {

    // نگه داری داده های خام

    formData: {

        name: '',
        phone: '',
        email: '',
        password: '',
    },


    //برای مدیریت وضعیت فرم

    formStatus: {

        currentStep: 1, // 👈 تعریف مقدار پیش‌فرض
        errors: {},     // 👈 تعریف آبجکت خطاها
    }

};


//بروز رسانی State

const updateUIForStep = function (newStep) {

    // ۱. پاکسازی: همه دکمه‌ها را مخفی کن
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    submitBtn.style.display = 'none'

    // ۲. به‌روزرسانی State
    appState.formStatus.currentStep = newStep


    // ۳. به‌روزرسانی UI: کلاس active را از همه مراحل و نشانگرها حذف کن
    formSteps.forEach(elem => elem.classList.remove('active'));

    stepIndicators.forEach(elem => elem.classList.remove('active'));

    // ۴. به‌روزرسانی UI: اضافه کردن کلاس active به مرحله و نشانگر جدید
    const selector = `[data-step="${newStep}"]`;

    // استفاده از querySelectorAll برای پیدا کردن تمام المان‌های مرتبط
    const stepElements = document.querySelectorAll(selector);

    // پیمایش روی NodeList و اضافه کردن کلاس 'active'
    stepElements.forEach(element => {
        element.classList.add('active');
    });


    // ۵. مدیریت نمایش دکمه‌ها
    if (newStep >= 1 && newStep <= 2) {

        nextBtn.style.display = 'block'
    }


    if (newStep > 1) {
        prevBtn.style.display = 'block'
    }

    if (newStep === 3) {

        submitBtn.style.display = 'block'

    }



}

//پاکسازی State
const clearErrors = function () {

    appState.formStatus.errors = {};
    errorMessages.forEach(elme => elme.textContent = '');


    const inputEelemnts = document.querySelectorAll('input');

    inputEelemnts.forEach(elem => elem.classList.remove('invalid'))

}

const updateUIForErrors = (errors) => {
    // ۱. پاک کردن خطاهای قبلی (احتیاطی: اگر قبلاً clearErrors فراخوانی نشده باشد)
    // بهتر است این کار را در handleNext انجام دهیم، اما اینجا هم می‌توان انجام داد.

    // ۲. ذخیره خطاها در State
    appState.formStatus.errors = errors;

    // ۳. نمایش خطاها در DOM
    for (const fieldName in errors) {

        // پیدا کردن المان نمایش پیام خطا با استفاده از data-field
        const errorMessageEl = document.querySelector(`.error-message[data-field="${fieldName}"]`);

        // پیدا کردن Input اصلی برای تغییر استایل
        const inputEl = document.getElementById(fieldName);

        if (errorMessageEl) {
            errorMessageEl.textContent = errors[fieldName];
        }

        if (inputEl) {
            inputEl.classList.add('invalid'); // قرمز کردن فیلد
        }
    }
};


const handleNext = async function () {


    clearErrors();

    const errors = validateStepSync(appState.formStatus.currentStep, appState.formData);

    if (errors) {

        return updateUIForErrors(errors)

    }

    else {
        updateUIForStep(appState.formStatus.currentStep + 1)
    }


}



const handlePrev = function () {
    // ۱. مرحله جدید را محاسبه کن: کاهش یک واحد
    const newStep = appState.formStatus.currentStep - 1;

    // ۲. خطاها را پاک کن (اطمینان از UI تمیز)
    clearErrors();

    // ۳. UI را به مرحله جدید به‌روزرسانی کن
    // نیازی به بررسی خطا نیست، زیرا بازگشت همیشه مجاز است.
    updateUIForStep(newStep);
};

// مدیریت ثبت داده‌ها(Controlled Component)
const handleInputChange = function (e) {

    let nameFilde = e.target.name;
    let valueFilde = e.target.value

    appState.formData[nameFilde] = valueFilde;
}

// اتصال تابع به دکمه "بعدی"
nextBtn.addEventListener('click', handleNext);

// اتصال تابع به دکمه "قبلی"
prevBtn.addEventListener('click', handlePrev);


form.addEventListener('input', handleInputChange)