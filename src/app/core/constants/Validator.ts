import { AbstractControl, Validators } from "@angular/forms";


export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_PATTERN = /^[1-9]{1}[0-9]{9}$/;
export const OTP_PATTERN = /^\d{6}$/;

export class CustomValidators {
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
        const value = c.value + '' || '';
        const isValid = OTP_PATTERN.test(value);

        if (!isValid) {
            return { opt: true };
        } else {
            return null;
        }
    }

    static loginCredential(c: AbstractControl): { [key: string]: any } | null {
        const value = c.value + '' || '';
        const validPhone = PHONE_PATTERN.test(value);
        const validEmail = EMAIL_PATTERN.test(value.toLocaleLowerCase());

        if (!(validPhone || validEmail)) {
            return { credential: true }
        } else {
            return null;
        }
    }

    static noWhiteSpaceValidator(c: AbstractControl): { [key: string]: any } | null {
        const isWhiteSpace = (c.value + '').trim().length === 0;
        const isValid = !isWhiteSpace;
        return isValid ? null : { required: true };
    }

}