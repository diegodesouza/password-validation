import {cleanup} from '@testing-library/react';
import {passwordStore} from "./PasswordStore";

describe('PasswordStore Unit Testing', () => {
    let PasswordStore;

    beforeEach(() => {
        PasswordStore = passwordStore;
    });

    afterEach(cleanup)

    test('should initialize with default values', () => {
        expect(PasswordStore.password).toEqual({
            value: '',
            valid: false,
            visible: false
        })
        expect(PasswordStore.passwordConfirmation).toEqual({
            value: '',
            valid: false,
            visible: false
        })
        expect(PasswordStore.showValidations).toBeFalsy();
        expect(PasswordStore.validations).toBeDefined()
    });

    test('should update password value', () => {
        PasswordStore.setPassword('password', 'newPassword');
        expect(PasswordStore.password.value).toBe('newPassword');
    });

    test('should toggle password visibility', () => {
        PasswordStore.toggleVisibility('password', true);
        expect(PasswordStore.password.visible).toBe(true);
    });

    test('Validator: validates password and password confirmation matches', () => {
        PasswordStore.setPassword('password', 'Hello@World1');
        PasswordStore.setPassword('passwordConfirmation', 'Hello@World1');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'MATCH')

        expect(validation.valid).toBeTruthy();
    })

    test('Validator: validates password and password confirmation does not match', () => {
        PasswordStore.setPassword('password', 'Hello@World1');
        PasswordStore.setPassword('passwordConfirmation', 'Hello@World');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'MATCH')
        expect(validation.valid).toBeFalsy();
    })

    test('Validator: validates password has a number', () => {
        PasswordStore.setPassword('password', 'Hello@World1');
        PasswordStore.setPassword('passwordConfirmation', 'Hello@World1');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'NUMBER')
        expect(validation.valid).toBeTruthy();
    })

    test('Validator: validates password does not have number', () => {
        PasswordStore.setPassword('password', 'Hello@World');
        PasswordStore.setPassword('passwordConfirmation', 'Hello@World');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'NUMBER')
        expect(validation.valid).toBeFalsy();
    })

    test('Validator: validates password has min length', () => {
        PasswordStore.setPassword('password', '123456');
        PasswordStore.setPassword('passwordConfirmation', '123456');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'MIN_LENGTH')
        expect(validation.valid).toBeTruthy();
    })

    test('Validator: validates password does not have min length', () => {
        PasswordStore.setPassword('password', '12345');
        PasswordStore.setPassword('passwordConfirmation', '12345');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'MIN_LENGTH')
        expect(validation.valid).toBeFalsy();
    })

    test('Validator: validates password has lower case', () => {
        PasswordStore.setPassword('password', 'helloworld');
        PasswordStore.setPassword('passwordConfirmation', 'helloworld');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'LOWER_CASE')
        expect(validation.valid).toBeTruthy();
    })

    test('Validator: validates password does not have lower case', () => {
        PasswordStore.setPassword('password', 'HELLOWORLD');
        PasswordStore.setPassword('passwordConfirmation', 'HELLOWORLD');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'LOWER_CASE')
        expect(validation.valid).toBeFalsy();
    })

    test('Validator: validates password has upper case', () => {
        PasswordStore.setPassword('password', 'HELLOWORLD');
        PasswordStore.setPassword('passwordConfirmation', 'HELLOWORLD');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'UPPER_CASE')
        expect(validation.valid).toBeTruthy();
    })

    test('Validator: validates password does not have upper case', () => {
        PasswordStore.setPassword('password', 'helloworld');
        PasswordStore.setPassword('passwordConfirmation', 'helloworld');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'UPPER_CASE')
        expect(validation.valid).toBeFalsy();
    })

    test('Validator: validates password has special character', () => {
        PasswordStore.setPassword('password', 'Hello@World');
        PasswordStore.setPassword('passwordConfirmation', 'HELLOWORLD');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'SPECIAL_CHAR')
        expect(validation.valid).toBeTruthy();
    })

    test('Validator: validates password does not have special character', () => {
        PasswordStore.setPassword('password', 'HelloWorld');
        PasswordStore.setPassword('passwordConfirmation', 'HelloWorld');

        PasswordStore.validator(PasswordStore.password.value, PasswordStore.passwordConfirmation.value)
        const validation = findValidation(PasswordStore.validations, 'SPECIAL_CHAR')
        expect(validation.valid).toBeFalsy();
    })

    test('should handle form submission', () => {
        // Mock alert function
        const originalAlert = global.alert;
        global.alert = jest.fn();

        PasswordStore.setPassword('password', 'Hello@World1');
        PasswordStore.setPassword('passwordConfirmation', 'Hello@World1');
        const submission = PasswordStore.handleSubmit();

        expect(submission).toBe(true);

        // Restore the original alert function
        global.alert = originalAlert;
    });
})

function findValidation(validations, type) {
    return validations.find((val) => val.type === type)
}
