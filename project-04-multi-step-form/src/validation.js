//اعتبارسنجی همگام (Sync) داده‌های فرم بر اساس مرحله فعلی



export const validateStepSync = function (step, formData) {

    const errors = {};

    switch (step) {

        case 1:

            if (!formData.name.trim()) {

                errors.name = "نام کامل نمی‌تواند خالی باشد.";
            }

            if (formData.phone && formData.phone.length !== 11) {
                errors.phone = "شماره تلفن باید ۱۱ رقم باشد.";
            }

            break;

        case 2:

            if (!formData.email.trim()) {
                errors.email = "ایمیل نمی‌تواند خالی باشد.";
            }

            if (!formData.password.trim()) {
                errors.password = "رمز عبور نمی‌تواند خالی باشد.";
            }
            break;

        case 3:
        case 3:
            break;

    }

    if (Object.keys(errors).length > 0) {
        return errors;
    } else {
        return null;
    }

}