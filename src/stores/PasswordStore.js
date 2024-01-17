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
            valid: false,
            matches: function(pw, pwc) {
                return pw === pwc
            }
        },
        {
            type: 'MIN_LENGTH',
            message: 'Password has a min length of 6 characters',
            valid: false,
            hasMinLength: function(pw) {
                return pw.length >= 6
            }
        },
        {
            type: 'UPPER_CASE',
            message: 'Password has at least 1 uppercase character',
            valid: false,
            hasUpperCase: function(pw) {
                return /[A-Z]/.test(pw)
            }
        },
        {
            type: 'LOWER_CASE',
            message: 'Password has at least 1 lowercase character',
            valid: false,
            hasLowerCase: function(pw) {
              return /[a-z]/.test(pw)
            }
        },
        {
            type: 'NUMBER',
            message: 'Password has at least 1 number',
            valid: false,
            hasNumber: function(pw) {
                return /\d/.test(pw)
            }
        },
        {
            type: 'SPECIAL_CHAR',
            message: `Password has at least 1 special character (!@#$%^&*()_-+={[}]|:;"'<,>.)`,
            valid: false,
            hasSpecialChars: function(pw){
                return /[!@#$%^&*()_+\-=[{\]};':"|,.<>]+/.test(pw)
            }
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }

    setAllValidProp = (bool) => {
        this.validations = this.validations.map(val => ({...val, valid: bool}))
    }

    validator = (pw, pwc) => {
        if (!pw && !pwc) {
            this.setAllValidProp(false)
            return;
        }
        this.validations = this.validations.map(val => {
            if (val.type === 'MATCH') {
                return {...val, valid: val.matches(pw, pwc)}
            } else if (val.type === 'NUMBER') {
                return {...val, valid: val.hasNumber(pw)}
            } else if(val.type === 'MIN_LENGTH') {
                return {...val, valid: val.hasMinLength(pw)}
            } else if(val.type === 'LOWER_CASE') {
                return {...val, valid: val.hasLowerCase(pw)}
            } else if(val.type === 'UPPER_CASE') {
                return {...val, valid: val.hasUpperCase(pw)}
            } else if(val.type === 'SPECIAL_CHAR') {
                return {...val, valid: val.hasSpecialChars(pw)}
            } else {
                return val;
            }
        })
    }
    handleSubmit = () => {
        this.validator(this.password.value, this.passwordConfirmation.value)

        // submit if every criterion is valid
        if(this.validations.every(val => val.valid)) {
            // reset state
            this.setAllValidProp(false)
            this.setPassword('password', '')
            this.setPassword('passwordConfirmation', '')
            this.handleChangePasswordStore('showValidations', false)
            alert('submitted')
            return true;
        }
        return false;
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
