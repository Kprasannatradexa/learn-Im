import { AbstractControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";


export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_PATTERN = /^[1-9]{1}[0-9]{9}$/;
export const OTP_PATTERN = /^\d{6}$/;
export const PASSWORD_RANGE_PATTERN = /^\S{8,20}$/;
export const MIN_ONE_LOWER = /(?=.*[a-z])/;
export const MIN_ONE_UPPER = /(?=.*[A-Z])/;
export const MIN_ONE_DIGIT = /(?=.*\d)/;
export const MIN_ONE_SPECIAL = /[-+_!@#$%^&*.,?]/;
export const NUMBER = /^[-+]?[0-9]*\.?[0-9]+$/;

export class CustomValidators {

    static phone = Validators.pattern('\\d{10}');

    static required = Validators.compose([
        Validators.required,
        CustomValidators.noWhiteSpaceValidator
    ])

    static email(c: AbstractControl): { [key: string]: any } | null {
        if (c?.value === '') {
            return null;
        }
        if (!EMAIL_PATTERN.test((c?.value + '').toLowerCase())) {
            return { email: true };
        } else {
            return null;
        }
    }

    static otp(c: AbstractControl): { [key: string]: any } | null {
        const value = c?.value + '' || '';
        const isValid = OTP_PATTERN.test(value);

        if (!isValid) {
            return { opt: true };
        } else {
            return null;
        }
    }

    static loginCredential(c: AbstractControl): { [key: string]: any } | null {
        const value = c?.value + '' || '';
        const validPhone = PHONE_PATTERN.test(value);
        const validEmail = EMAIL_PATTERN.test(value.toLowerCase());

        if (!(validPhone || validEmail)) {
            return { credential: true }
        } else {
            return null;
        }
    }

    static password(c: AbstractControl): { [key: string]: any } | null {
        const password = c?.value + '';

        if (!(PASSWORD_RANGE_PATTERN.test(password) && MIN_ONE_LOWER.test(password) && MIN_ONE_UPPER.test(password) && MIN_ONE_DIGIT.test(password) && MIN_ONE_SPECIAL.test(password))) {
            return { password: true }
        } else {
            return null;
        }
    }

    static noWhiteSpaceValidator(c: AbstractControl): { [key: string]: any } | null {
        const isWhiteSpace = (c?.value + '').trim().length === 0;
        const isValid = !isWhiteSpace;
        return isValid ? null : { required: true };
    }

    static comparePassword(password1: string, password2: string) {
        return (formGroup: FormGroup) => {
            const password = formGroup.controls[password1];
            const cnfPassword = formGroup.controls[password2];
            if (cnfPassword.errors && !cnfPassword.errors?.['differentPassword']) {
                return;
            }
            if (password.value !== cnfPassword.value) {
                cnfPassword.setErrors({ differentPassword: true });
            } else {
                cnfPassword.setErrors(null);
            }
        }
    }


}