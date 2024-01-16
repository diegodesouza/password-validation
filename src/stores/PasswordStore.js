import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

class PasswordStore {
    password = {
        value: '',
        valid: false,
        visible: false
    }

    passwordConfirmation = {
        value: '',
        valid: false,
        visible: false
    }

    showValidations = false;

    validations = [
        {
            type: 'MATCH',
            message: 'Password and Confirm Password must match',
            valid: false
        },
        {
            type: 'MIN_LENGTH',
            message: 'Password has a min length of 6 characters',
            valid: false
        },
        {
            type: 'UPPER_CASE',
            message: 'Password has at least 1 uppercase character',
            valid: false
        },
        {
            type: 'LOWER_CASE',
            message: 'Password has at least 1 lowercase character',
            valid: false
        },
        {
            type: 'NUMBER',
            message: 'Password has at least 1 number',
            valid: false
        },
        {
            type: 'SPECIAL_CHAR',
            message: `Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)`,
            valid: false
        }]

    constructor() {
        makeAutoObservable(this)
    }

    hasMinLength = pw => pw.length >= 6;

    hasUpperCase = pw => /[A-Z]/.test(pw);

    hasLowerCase = pw => /[a-z]/.test(pw);

    hasNumber = pw => /\d/.test(pw);

    hasSpecialChars = pw => /[!@#$%^&*()_+\-=[{\]};':"|,.<>]+/.test(pw)

    get passwordsMatch() {
        return this.password.value === this.passwordConfirmation.value
    }

    handleValidation = (pw, type, bool) => {
        if (!pw) {
            this.validations = this.validations.map(val => ({...val, valid: false}))
        }
        this.validations = this.validations.map(val => {
            if (val.type === type) {
                return {...val, valid: bool}
            } else {
                return val;
            }
        })
    }

    handleMatch = pw => {
        this.handleValidation(pw, 'MATCH', this.passwordsMatch)
    }

    handleMinLength = pw => {
        this.handleValidation(pw, 'MIN_LENGTH', this.hasMinLength(pw))
    }

    handleUpperCase = pw => {
        this.handleValidation(pw, 'UPPER_CASE', this.hasUpperCase(pw))
    }

    handleLowerCase = pw => {
        this.handleValidation(pw, 'LOWER_CASE', this.hasLowerCase(pw))
    }

    handleNumber = pw => {
        this.handleValidation(pw, 'NUMBER', this.hasNumber(pw))
    }

    handleSpecialChars = pw => {
        this.handleValidation(pw, 'SPECIAL_CHAR', this.hasSpecialChars(pw))
    }
    handleSubmit = () => {
        this.handleMatch(this.password.value)
        this.handleMinLength(this.password.value)
        this.handleUpperCase(this.password.value)
        this.handleLowerCase(this.password.value)
        this.handleNumber(this.password.value)
        this.handleSpecialChars(this.password.value)
        if(this.validations.every(val => val.valid)) {
            this.validations = this.validations.map(val => ({...val, valid: true}))
            this.handleChangePasswordStore('showValidations', false)
            alert('submited')
        }
    }

    handlePasswordConfirmationChange = (obj) => {
        this.passwordConfirmation.value = obj.value
    }

    setPassword = (key, value) => {
        this[key].value = value
    }

    toggleVisibility = (key, value) => {
        this[key].visible = value
    }

    handleChangePasswordStore = (key, value) => {
        if (!key && !value) {
            return;
        }
        this[key] = value;
    };
}

export const passwordStore = new PasswordStore();
// Create a React Context with the counter store instance.
export const PasswordStoreContext = createContext(passwordStore);
export const usePasswordStore = () =>
    useContext(PasswordStoreContext);
