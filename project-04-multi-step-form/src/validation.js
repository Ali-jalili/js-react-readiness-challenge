

export const validateStepSync = function (step, formData) {

    const errors = {};

    //level-1

    if (!formData.name.trim()) {
        errors.name = "نام کامل نمی‌تواند خالی باشد."
    }

    if (formData.phone && formData.phone.length !== 11) {
        errors.phone = "شماره تلفن باید ۱۱ رقم باشد."
    }


    return errors;


}

