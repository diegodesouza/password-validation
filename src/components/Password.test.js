import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Password from './Password';
import {usePasswordStore} from "../stores/PasswordStore";
describe('Password component', () => {
    test('renders the Password component correctly', () => {
        render(<Password />);

        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('handles input change', async () => {
        render(<Password />);

        const input = await screen.findByTestId('password')
        await waitFor(() => expect(input).toHaveValue(''))

        fireEvent.change(input, {target: {value: 'newPassword'}})
        await waitFor(() => expect(input).toHaveValue('newPassword'))
    });

    test('displays validation messages when showValidations is true', () => {
        jest.spyOn(require('../stores/PasswordStore'), 'usePasswordStore').mockImplementation(() => ({
            validations: [
                { type: 'MIN_LENGTH', message: 'Password is too short', valid: false },
            ],
            handleChangePasswordStore: jest.fn(),
            showValidations: true,
            password: { value: 'short', visible: false },
            passwordConfirmation: { value: '', visible: false },
            setPassword: jest.fn(),
            handleSubmit: jest.fn(),
            toggleVisibility: jest.fn(),
        }));

        render(<Password />);

        expect(screen.getByText(/password is too short/i)).toBeInTheDocument();
    });
});
